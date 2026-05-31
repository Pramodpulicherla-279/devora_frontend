import { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight, all } from 'lowlight';
import Link from '@tiptap/extension-link';
import CharacterCount from '@tiptap/extension-character-count';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import TextAlign from '@tiptap/extension-text-align';
import EditorMenuBar from './EditorMenuBar';
import VisualizationEmbed from './extensions/VisualizationEmbed';
import { API_BASE_URL } from '../../config';
import { parseLessonContent } from '../components/visualizations/utils/lessonParser';
import './MdImport.css';

const lowlight = createLowlight(all);

const EMPTY_QUIZ = () => ({
  question: '',
  options: ['', '', '', ''],
  correctIndex: 0,
  explanation: ''
});

const EMPTY_IQ = (level) => ({ level, question: '', answer: '' });

/* ── Markdown → TipTap-compatible HTML converter ── */
function convertMdToHtml(md) {
  if (!md || !md.trim()) return '';

  const lines = md.split('\n');
  const out = [];
  let i = 0;

  const escHtml = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Inline: bold, italic, inline-code, links
  const parseInline = (s) => {
    return s
      // inline code first (greedy-safe)
      .replace(/`([^`]+)`/g, (_, c) => `<code>${escHtml(c)}</code>`)
      // bold+italic
      .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
      // bold
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.+?)__/g, '<strong>$1</strong>')
      // italic
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/_(.+?)_/g, '<em>$1</em>')
      // links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  };

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trimEnd();

    // ── Fenced code block ──────────────────────────────────────────
    if (/^```/.test(line)) {
      const langMatch = line.match(/^```(\w*)/);
      const lang = langMatch?.[1] || '';
      const codeLines = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) {
        codeLines.push(escHtml(lines[i]));
        i++;
      }
      const langAttr = lang ? ` class="language-${lang}"` : '';
      out.push(`<pre><code${langAttr}>${codeLines.join('\n')}</code></pre>`);
      i++;
      continue;
    }

    // ── Headings ───────────────────────────────────────────────────
    const h = line.match(/^(#{1,6})\s+(.*)/);
    if (h) {
      const level = h[1].length;
      out.push(`<h${level}>${parseInline(h[2])}</h${level}>`);
      i++;
      continue;
    }

    // ── Horizontal rule ────────────────────────────────────────────
    if (/^[-*_]{3,}$/.test(line.trim())) {
      out.push('<hr/>');
      i++;
      continue;
    }

    // ── Blockquote ─────────────────────────────────────────────────
    if (/^>/.test(line)) {
      const bqLines = [];
      while (i < lines.length && /^>/.test(lines[i])) {
        bqLines.push(parseInline(lines[i].replace(/^>\s?/, '')));
        i++;
      }
      out.push(`<blockquote><p>${bqLines.join('<br/>')}</p></blockquote>`);
      continue;
    }

    // ── GFM Table ─────────────────────────────────────────────────
    if (/^\|/.test(line) && i + 1 < lines.length && /^\|[-| :]+\|/.test(lines[i + 1])) {
      const headerCells = line.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      i += 2; // skip header + separator
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        rows.push(lines[i].split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1));
        i++;
      }
      const thead = headerCells.map(c => `<th>${parseInline(c.trim())}</th>`).join('');
      const tbody = rows.map(row =>
        `<tr>${row.map(c => `<td>${parseInline(c.trim())}</td>`).join('')}</tr>`
      ).join('');
      out.push(`<table><thead><tr>${thead}</tr></thead><tbody>${tbody}</tbody></table>`);
      continue;
    }

    // ── Unordered list ────────────────────────────────────────────
    if (/^[-*+]\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
        items.push(`<li>${parseInline(lines[i].replace(/^[-*+]\s+/, ''))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    // ── Ordered list ──────────────────────────────────────────────
    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(`<li>${parseInline(lines[i].replace(/^\d+\.\s+/, ''))}</li>`);
        i++;
      }
      out.push(`<ol>${items.join('')}</ol>`);
      continue;
    }

    // ── Empty line ────────────────────────────────────────────────
    if (line.trim() === '') {
      i++;
      continue;
    }

    // ── Paragraph (collect multi-line) ────────────────────────────
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^#{1,6}\s/.test(lines[i]) &&
      !/^```/.test(lines[i]) &&
      !/^[-*+]\s/.test(lines[i]) &&
      !/^\d+\.\s/.test(lines[i]) &&
      !/^\|/.test(lines[i]) &&
      !/^>/.test(lines[i]) &&
      !/^[-*_]{3,}$/.test(lines[i].trim())
    ) {
      paraLines.push(parseInline(lines[i].trim()));
      i++;
    }
    if (paraLines.length) out.push(`<p>${paraLines.join(' ')}</p>`);
  }

  return out.join('\n');
}

function LessonEditor({ lessonId, partId, courseTitle, partTitle, onBack, onSaved }) {
  const [courses, setCourses] = useState([]);
  const [parts, setParts] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedPartId, setSelectedPartId] = useState(partId || '');
  const [selectedLessonId, setSelectedLessonId] = useState(lessonId || '');
  const [activeTab, setActiveTab] = useState('theory');

  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('draft');
  const [difficulty, setDifficulty] = useState('beginner');
  const [estimatedTime, setEstimatedTime] = useState(15);
  const [audience, setAudience] = useState('Beginner Developers');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [quiz, setQuiz] = useState([]);
  const [interviewQuestions, setInterviewQuestions] = useState([]);

  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [previewHtml, setPreviewHtml] = useState('');
  const [aiLoading, setAiLoading] = useState({});

  // MD Import modal state
  const [showMdModal, setShowMdModal] = useState(false);
  const [mdInput, setMdInput] = useState('');
  const [mdImportMode, setMdImportMode] = useState('replace'); // 'replace' | 'append'

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Table.configure({ resizable: true }),
      TableRow, TableHeader, TableCell,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CodeBlockLowlight.configure({ lowlight, defaultLanguage: 'javascript' }),
      Link.configure({ openOnClick: false, autolink: true }),
      CharacterCount.configure(),
      VisualizationEmbed,
    ],
    content: '<p>Write your lesson here...</p>',
    onUpdate: ({ editor }) => {
      setPreviewHtml(editor.getHTML());
    },
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/courses`)
      .then(r => r.json())
      .then(d => { if (d.success) setCourses(d.data); });
  }, []);

  useEffect(() => {
    if (!selectedCourseId) { setParts([]); return; }
    fetch(`${API_BASE_URL}/api/parts/${selectedCourseId}/parts`)
      .then(r => r.json())
      .then(d => { if (d.success) setParts(d.data); else setParts([]); });
  }, [selectedCourseId]);

  useEffect(() => {
    if (!selectedPartId) { setLessons([]); return; }
    fetch(`${API_BASE_URL}/api/lessons/${selectedPartId}/lessons`)
      .then(r => r.json())
      .then(d => { if (d.success) setLessons(d.data); else setLessons([]); });
  }, [selectedPartId]);

  useEffect(() => {
    if (!selectedLessonId || !editor) return;
    const lesson = lessons.find(l => l._id === selectedLessonId);
    if (lesson) loadLesson(lesson);
  }, [selectedLessonId, lessons, editor]);

  const loadLesson = (lesson) => {
    setTitle(lesson.title || '');
    setStatus(lesson.status || 'draft');
    setDifficulty(lesson.difficulty || 'beginner');
    setEstimatedTime(lesson.estimatedTime || 15);
    setAudience(lesson.audience || 'Beginner Developers');
    setTags(lesson.tags || []);
    setQuiz(lesson.quiz || []);
    setInterviewQuestions(lesson.interviewQuestions || []);
    if (editor) {
      editor.commands.setContent(lesson.content || '<p></p>');
      setPreviewHtml(lesson.content || '');
    }
  };

  const clearLesson = () => {
    setTitle('');
    setStatus('draft');
    setDifficulty('beginner');
    setEstimatedTime(15);
    setAudience('Beginner Developers');
    setTags([]);
    setQuiz([]);
    setInterviewQuestions([]);
    if (editor) {
      editor.commands.setContent('<p>Write your lesson here...</p>');
      setPreviewHtml('');
    }
  };

  useEffect(() => {
    if (!selectedLessonId) clearLesson();
  }, [selectedLessonId]);

  const handleSave = async (saveStatus) => {
    const content = editor?.getHTML() || '';
    const partToUse = selectedPartId || partId;
    if (!title.trim()) return alert('Please enter a lesson title.');
    if (!partToUse) return alert('Please select a part.');
    setSaving(true);
    try {
      const body = {
        title: title.trim(),
        content,
        status: saveStatus || status,
        difficulty,
        estimatedTime: Number(estimatedTime),
        audience,
        tags,
        quiz,
        interviewQuestions,
      };
      let res, data;
      if (selectedLessonId) {
        res = await fetch(`${API_BASE_URL}/api/lessons/${selectedLessonId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch(`${API_BASE_URL}/api/lessons/${partToUse}/lessons`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      }
      data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      setSelectedLessonId(data.data._id);
      setStatus(data.data.status);
      setLastSaved(new Date());
      if (onSaved) onSaved(data.data);
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  /* ── AI helpers ── */
  const callAI = async (endpoint, body, onSuccess, key) => {
    setAiLoading(prev => ({ ...prev, [key]: true }));
    try {
      const res = await fetch(`${API_BASE_URL}/api/ai/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'AI generation failed');
      onSuccess(data.data);
    } catch (e) {
      alert(`AI Error: ${e.message}`);
    } finally {
      setAiLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  const handleGenerateTheory = () => {
    if (!title.trim()) return alert('Please enter a lesson title first.');
    callAI('generate-theory', { title, difficulty, audience }, (html) => {
      editor?.commands.setContent(html);
      setPreviewHtml(html);
    }, 'theory');
  };

  const handleGenerateQuiz = () => {
    const content = editor?.getHTML() || '';
    if (!content || content === '<p></p>' || content === '<p>Write your lesson here...</p>')
      return alert('Please add lesson content before generating quiz.');
    callAI('generate-quiz', { content, title }, (data) => {
      setQuiz(data);
      setActiveTab('quiz');
    }, 'quiz');
  };

  const handleGenerateInterviewQs = () => {
    const content = editor?.getHTML() || '';
    if (!content || content === '<p></p>' || content === '<p>Write your lesson here...</p>')
      return alert('Please add lesson content before generating interview questions.');
    callAI('generate-interview-questions', { content, title }, (data) => {
      setInterviewQuestions(data);
      setActiveTab('interview');
    }, 'interview');
  };

  const handleGenerateTags = () => {
    const content = editor?.getHTML() || '';
    callAI('generate-tags', { content, title }, (data) => {
      setTags(data);
    }, 'tags');
  };

  const handleGenerateAll = async () => {
    const content = editor?.getHTML() || '';
    if (!content || content === '<p>Write your lesson here...</p>')
      return alert('Please add lesson content before generating.');
    setAiLoading({ quiz: true, interview: true, tags: true });
    try {
      const [quizRes, iqRes, tagsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/ai/generate-quiz`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, title }),
        }).then(r => r.json()),
        fetch(`${API_BASE_URL}/api/ai/generate-interview-questions`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, title }),
        }).then(r => r.json()),
        fetch(`${API_BASE_URL}/api/ai/generate-tags`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, title }),
        }).then(r => r.json()),
      ]);
      if (quizRes.success) setQuiz(quizRes.data);
      if (iqRes.success) setInterviewQuestions(iqRes.data);
      if (tagsRes.success) setTags(tagsRes.data);
    } catch (e) {
      alert(`AI Error: ${e.message}`);
    } finally {
      setAiLoading({});
    }
  };

  /* ── MD Import ── */
  const handleMdImport = () => {
    if (!mdInput.trim()) return;
    const html = convertMdToHtml(mdInput);
    if (!html) return;
    if (mdImportMode === 'replace') {
      editor?.commands.setContent(html);
    } else {
      // append: insert after existing content
      const current = editor?.getHTML() || '';
      const cleaned = current === '<p>Write your lesson here...</p>' ? '' : current;
      editor?.commands.setContent(cleaned + html);
    }
    setPreviewHtml(editor?.getHTML() || html);
    setMdInput('');
    setShowMdModal(false);
  };

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput('');
  };

  const removeTag = (t) => setTags(tags.filter(x => x !== t));

  const addQuizQuestion = () => setQuiz([...quiz, EMPTY_QUIZ()]);
  const removeQuizQuestion = (i) => setQuiz(quiz.filter((_, idx) => idx !== i));
  const updateQuizField = (i, field, value) => {
    const updated = [...quiz];
    updated[i] = { ...updated[i], [field]: value };
    setQuiz(updated);
  };
  const updateQuizOption = (qi, oi, value) => {
    const updated = [...quiz];
    const options = [...updated[qi].options];
    options[oi] = value;
    updated[qi] = { ...updated[qi], options };
    setQuiz(updated);
  };

  const addIQ = (level) => setInterviewQuestions([...interviewQuestions, EMPTY_IQ(level)]);
  const removeIQ = (i) => setInterviewQuestions(interviewQuestions.filter((_, idx) => idx !== i));
  const updateIQ = (i, field, value) => {
    const updated = [...interviewQuestions];
    updated[i] = { ...updated[i], [field]: value };
    setInterviewQuestions(updated);
  };

  const extractVizEmbeds = useCallback(() => {
    if (!editor) return [];
    const html = editor.getHTML();
    const matches = [];
    const re = /data-type="([^"]+)"/g;
    let m;
    while ((m = re.exec(html)) !== null) matches.push(m[1]);
    return matches;
  }, [editor]);

  const calcHealth = () => {
    let score = 0;
    const content = editor?.getText() || '';
    if (content.length > 800) score += 25;
    if (quiz.length >= 5) score += 25;
    if (interviewQuestions.length >= 6) score += 25;
    if (tags.length > 0) score += 15;
    if (audience) score += 10;
    return score;
  };

  /* SEO / AdSense readiness */
  const getSeoChecks = () => {
    const html = editor?.getHTML() || '';
    const text = editor?.getText() || '';
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    return [
      { label: 'Word count ≥ 800', ok: wordCount >= 800, detail: `${wordCount} words` },
      { label: 'Has subheadings (H2/H3)', ok: /<h[23]/.test(html) },
      { label: 'Has code example', ok: /<code|<pre/.test(html) },
      { label: 'Quiz added (5+)', ok: quiz.length >= 5, detail: `${quiz.length}/5` },
      { label: 'Interview Qs (6+)', ok: interviewQuestions.length >= 6, detail: `${interviewQuestions.length}/6` },
      { label: 'SEO tags added', ok: tags.length >= 3, detail: `${tags.length} tags` },
      { label: 'Audience defined', ok: !!audience.trim() },
    ];
  };

  const health = calcHealth();
  const vizEmbeds = extractVizEmbeds();
  const iqByLevel = (level) => interviewQuestions.filter(q => q.level === level);

  const selectedLesson = lessons.find(l => l._id === selectedLessonId);
  const lessonSlug = selectedLesson?.slug || (title ? title.toLowerCase().replace(/\s+/g, '-') : '—');

  const crumbCourse = courses.find(c => c._id === selectedCourseId)?.title || courseTitle || 'Select Course';
  const crumbPart = parts.find(p => p._id === selectedPartId)?.title || partTitle || 'Select Part';
  const crumbLesson = title || 'New Lesson';

  const isAnyLoading = Object.values(aiLoading).some(Boolean);

  /* Render safe preview using parseLessonContent */
  const renderPreview = () => {
    if (!previewHtml) return <p style={{ color: 'var(--text-muted)', padding: '16px' }}>Start typing to see preview…</p>;
    try {
      return parseLessonContent(previewHtml);
    } catch {
      return <div dangerouslySetInnerHTML={{ __html: previewHtml }} />;
    }
  };

  return (
    <div className="le-page">
      {/* Header */}
      <div className="le-header">
        {onBack && (
          <button className="le-back-btn" onClick={onBack}>← Back</button>
        )}
        <div className="le-breadcrumb">
          <span>{crumbCourse}</span>
          <span className="sep">›</span>
          <span>{crumbPart}</span>
          <span className="sep">›</span>
          <span className="active-crumb">{crumbLesson}</span>
        </div>
        <div className="le-header-actions">
          <button className="le-btn draft" onClick={() => handleSave('draft')} disabled={saving}>
            {saving ? 'Saving…' : 'Save as Draft'}
          </button>
          <button
            className={`le-btn publish ${status === 'published' ? 'published' : ''}`}
            onClick={() => handleSave('published')}
            disabled={saving}
          >
            {status === 'published' ? '✓ Published' : 'Save & Publish'}
          </button>
        </div>
      </div>

      {/* Lesson Title */}
      <div style={{ padding: '12px 20px 10px', borderBottom: '1px solid var(--border)', background: 'var(--bg-main)' }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Lesson Title"
          style={{
            width: '100%', background: 'none', border: 'none', outline: 'none',
            fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)'
          }}
        />
        {lastSaved && (
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Last saved {lastSaved.toLocaleTimeString()}
          </div>
        )}

        {/* Inline Course / Part selectors — only in standalone Add New Lesson mode */}
        {!partId && <div className="le-inline-selectors">
          <div className="le-inline-field">
            <label className="le-inline-label">Course</label>
            <select
              className="le-inline-select"
              value={selectedCourseId}
              onChange={e => { setSelectedCourseId(e.target.value); setSelectedPartId(''); setSelectedLessonId(''); }}
            >
              <option value="">— Select Course —</option>
              {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
            </select>
          </div>

          <span className="le-inline-sep">›</span>

          <div className="le-inline-field">
            <label className="le-inline-label">Part</label>
            <select
              className="le-inline-select"
              value={selectedPartId}
              onChange={e => { setSelectedPartId(e.target.value); setSelectedLessonId(''); }}
              disabled={!selectedCourseId}
            >
              <option value="">— Select Part —</option>
              {parts.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
            </select>
          </div>

          {selectedPartId && lessons.length > 0 && (
            <>
              <span className="le-inline-sep">›</span>
              <div className="le-inline-field">
                <label className="le-inline-label">Lesson</label>
                <select
                  className="le-inline-select"
                  value={selectedLessonId}
                  onChange={e => setSelectedLessonId(e.target.value)}
                >
                  <option value="">New Lesson</option>
                  {lessons.map(l => <option key={l._id} value={l._id}>{l.title}</option>)}
                </select>
              </div>
            </>
          )}
        </div>}
      </div>

      {/* AI row */}
      <div className="le-ai-row">
        <button
          className="le-ai-btn primary-ai"
          onClick={handleGenerateAll}
          disabled={isAnyLoading}
          title="Generate Quiz + Interview Qs + Tags in parallel using Gemini AI"
        >
          {isAnyLoading ? '⏳ Generating…' : '✦ Generate All (Parallel)'}
        </button>
        <button
          className="le-ai-btn"
          onClick={handleGenerateTheory}
          disabled={!!aiLoading.theory}
          title="Generate lesson theory content using AI"
        >
          {aiLoading.theory ? '⏳' : '✦'} Generate Theory
        </button>
        <button
          className="le-ai-btn"
          onClick={handleGenerateQuiz}
          disabled={!!aiLoading.quiz}
          title="Generate 5 MCQ quiz questions from lesson content"
        >
          {aiLoading.quiz ? '⏳' : '✦'} Generate Quiz
        </button>
        <button
          className="le-ai-btn"
          onClick={handleGenerateInterviewQs}
          disabled={!!aiLoading.interview}
          title="Generate 6 interview questions from lesson content"
        >
          {aiLoading.interview ? '⏳' : '✦'} Generate Interview Qs
        </button>
        <button
          className="le-ai-btn md-import-btn"
          onClick={() => setShowMdModal(true)}
          title="Paste Markdown and convert it to rich content"
        >
          ⇩ Import Markdown
        </button>
        <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#22c55e' }}>●</span> Gemini AI Active
        </span>
      </div>

      {/* Tabs */}
      <div className="le-tabs">
        <div className={`le-tab ${activeTab === 'theory' ? 'active' : ''}`} onClick={() => setActiveTab('theory')}>Theory</div>
        <div className={`le-tab ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>
          Quiz {quiz.length > 0 && <span className="le-tab-count">{quiz.length}</span>}
        </div>
        <div className={`le-tab ${activeTab === 'interview' ? 'active' : ''}`} onClick={() => setActiveTab('interview')}>
          Interview Questions {interviewQuestions.length > 0 && <span className="le-tab-count">{interviewQuestions.length}</span>}
        </div>
        <div className={`le-tab ${activeTab === 'seo' ? 'active' : ''}`} onClick={() => setActiveTab('seo')}>SEO & Settings</div>
        <div className={`le-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Lesson Overview</div>
      </div>

      {/* Body */}
      <div className="le-body">
        <div className="le-editor-area">
          {/* Theory Tab */}
          {activeTab === 'theory' && (
            <div className="le-theory-split">
              <div className="le-editor-pane">
                {editor && <EditorMenuBar editor={editor} />}
                <div className="le-editor-scroll">
                  <EditorContent editor={editor} />
                </div>
              </div>
              <div className="le-preview-pane">
                <div className="le-preview-header">
                  <span className="le-preview-dot" />
                  Live Preview (with Visualizations)
                </div>
                <div className="le-preview-content">
                  {renderPreview()}
                </div>
              </div>
            </div>
          )}

          {/* Quiz Tab */}
          {activeTab === 'quiz' && (
            <div className="quiz-area">
              <div className="quiz-toolbar">
                <div className="quiz-toolbar-title">Quiz Questions ({quiz.length}/5 minimum)</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="quiz-add-btn"
                    onClick={handleGenerateQuiz}
                    disabled={!!aiLoading.quiz}
                    style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', border: 'none' }}
                  >
                    {aiLoading.quiz ? '⏳ Generating…' : '✦ AI Generate 5 Qs'}
                  </button>
                  <button className="quiz-add-btn" onClick={addQuizQuestion}>+ Add Manually</button>
                </div>
              </div>
              {quiz.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">🧠</div>
                  <div className="empty-state-title">No quiz questions yet</div>
                  <div className="empty-state-desc">Click "AI Generate 5 Qs" to auto-generate from lesson content, or add manually.</div>
                </div>
              ) : (
                quiz.map((q, qi) => (
                  <div key={qi} className="quiz-card">
                    <div className="quiz-card-header">
                      <span className="quiz-card-num">Q{qi + 1}</span>
                      <button className="quiz-card-remove" onClick={() => removeQuizQuestion(qi)}>✕</button>
                    </div>
                    <input
                      className="quiz-question-input"
                      placeholder="Enter question..."
                      value={q.question}
                      onChange={e => updateQuizField(qi, 'question', e.target.value)}
                    />
                    <div className="quiz-options">
                      {q.options.map((opt, oi) => (
                        <div key={oi} className={`quiz-option ${q.correctIndex === oi ? 'correct' : ''}`}>
                          <div
                            className="quiz-option-letter"
                            onClick={() => updateQuizField(qi, 'correctIndex', oi)}
                            title="Click to mark as correct"
                          >
                            {String.fromCharCode(65 + oi)}
                          </div>
                          <input
                            className="quiz-option-input"
                            placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                            value={opt}
                            onChange={e => updateQuizOption(qi, oi, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="quiz-explanation-label">Explanation</div>
                    <textarea
                      className="quiz-explanation"
                      placeholder="Explain why the correct answer is correct..."
                      value={q.explanation}
                      onChange={e => updateQuizField(qi, 'explanation', e.target.value)}
                    />
                  </div>
                ))
              )}
            </div>
          )}

          {/* Interview Questions Tab */}
          {activeTab === 'interview' && (
            <div className="iq-area">
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                <button
                  className="quiz-add-btn"
                  onClick={handleGenerateInterviewQs}
                  disabled={!!aiLoading.interview}
                  style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', border: 'none' }}
                >
                  {aiLoading.interview ? '⏳ Generating…' : '✦ AI Generate 6 Questions'}
                </button>
              </div>
              {['beginner', 'intermediate', 'advanced'].map(level => (
                <div key={level} className="iq-level-section">
                  <div className="iq-level-header">
                    <div className={`iq-level-badge ${level}`}>
                      <div className={`level-dot ${level}`} />
                      {level.charAt(0).toUpperCase() + level.slice(1)} ({iqByLevel(level).length})
                    </div>
                    <button className="iq-add-btn" onClick={() => addIQ(level)}>+ Add</button>
                  </div>
                  {iqByLevel(level).length === 0 ? (
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', padding: '8px 0' }}>
                      No {level} questions yet. Add at least 2.
                    </div>
                  ) : (
                    interviewQuestions.map((q, i) => q.level !== level ? null : (
                      <div key={i} className="iq-card">
                        <button className="iq-card-remove" onClick={() => removeIQ(i)}>✕</button>
                        <div className="iq-field-label">Question</div>
                        <textarea
                          className="iq-input"
                          placeholder="Enter interview question..."
                          value={q.question}
                          onChange={e => updateIQ(i, 'question', e.target.value)}
                          rows={2}
                        />
                        <div className="iq-field-label">Answer</div>
                        <textarea
                          className="iq-input"
                          placeholder="Detailed answer..."
                          value={q.answer}
                          onChange={e => updateIQ(i, 'answer', e.target.value)}
                          rows={4}
                        />
                      </div>
                    ))
                  )}
                </div>
              ))}
            </div>
          )}

          {/* SEO & Settings Tab */}
          {activeTab === 'seo' && (
            <div className="seo-area">
              {/* Google Snippet Preview */}
              <div className="seo-section">
                <div className="seo-section-title">Google Search Preview</div>
                <div style={{
                  background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px',
                  padding: '16px 20px', fontFamily: 'Arial, sans-serif'
                }}>
                  <div style={{ fontSize: '20px', color: '#1a0dab', marginBottom: '4px', cursor: 'pointer' }}>
                    {title || 'Lesson Title'} | Dev.EL
                  </div>
                  <div style={{ fontSize: '13px', color: '#006621', marginBottom: '4px' }}>
                    https://www.dev-el.co/course/…/{lessonSlug}
                  </div>
                  <div style={{ fontSize: '14px', color: '#545454' }}>
                    {(editor?.getText() || '').substring(0, 155) || 'Your lesson description will appear here…'}
                  </div>
                </div>
              </div>

              {/* AdSense Readiness */}
              <div className="seo-section">
                <div className="seo-section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>AdSense Content Readiness</span>
                  <span style={{
                    fontSize: '12px', padding: '2px 10px', borderRadius: '20px',
                    background: getSeoChecks().filter(c => c.ok).length >= 5 ? '#d1fae5' : '#fef3c7',
                    color: getSeoChecks().filter(c => c.ok).length >= 5 ? '#065f46' : '#92400e'
                  }}>
                    {getSeoChecks().filter(c => c.ok).length}/{getSeoChecks().length} checks passing
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {getSeoChecks().map((check, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'var(--bg-card)', borderRadius: '6px' }}>
                      <span style={{ fontSize: '16px' }}>{check.ok ? '✅' : '⚠️'}</span>
                      <span style={{ flex: 1, fontSize: '13px', color: 'var(--text-primary)' }}>{check.label}</span>
                      {check.detail && <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{check.detail}</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="seo-section">
                <div className="seo-section-title">Lesson Settings</div>
                <div className="seo-field">
                  <label className="seo-label">Lesson Slug (auto-generated)</label>
                  <input className="seo-input" value={lessonSlug} readOnly />
                </div>
                <div className="seo-field">
                  <label className="seo-label">Audience</label>
                  <input className="seo-input" value={audience} onChange={e => setAudience(e.target.value)} placeholder="e.g. Beginner Developers" />
                </div>
                <div className="seo-field">
                  <label className="seo-label">Status</label>
                  <select className="seo-select" value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div className="seo-field">
                  <label className="seo-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Tags</span>
                    <button
                      onClick={handleGenerateTags}
                      disabled={!!aiLoading.tags}
                      style={{
                        fontSize: '12px', padding: '2px 10px', borderRadius: '12px', cursor: 'pointer',
                        background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', border: 'none'
                      }}
                    >
                      {aiLoading.tags ? '⏳ Generating…' : '✦ AI Generate Tags'}
                    </button>
                  </label>
                  <div className="tags-input-row">
                    <input
                      className="seo-input"
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      placeholder="Add a tag..."
                      onKeyDown={e => e.key === 'Enter' && addTag()}
                    />
                    <button className="tag-add-btn" onClick={addTag}>Add</button>
                  </div>
                  <div className="tags-list">
                    {tags.map(t => (
                      <span key={t} className="tag-chip">
                        {t}
                        <button className="tag-remove" onClick={() => removeTag(t)}>×</button>
                      </span>
                    ))}
                    {tags.length === 0 && (
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No tags yet. Use AI Generate or type manually.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Lesson Overview Tab */}
          {activeTab === 'overview' && (
            <div className="seo-area overview-area">
              {/* Left column: metadata + checklist */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 }}>
                <div className="seo-section">
                  <div className="seo-section-title">Lesson Metadata</div>

                  <div className="seo-field">
                    <label className="seo-label">Course</label>
                    <select className="seo-select" value={selectedCourseId} onChange={e => { setSelectedCourseId(e.target.value); setSelectedPartId(''); setSelectedLessonId(''); }}>
                      <option value="">Select Course</option>
                      {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                    </select>
                  </div>

                  <div className="seo-field">
                    <label className="seo-label">Part / Module</label>
                    <select className="seo-select" value={selectedPartId} onChange={e => { setSelectedPartId(e.target.value); setSelectedLessonId(''); }}>
                      <option value="">Select Part</option>
                      {parts.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
                    </select>
                  </div>

                  {selectedPartId && (
                    <div className="seo-field">
                      <label className="seo-label">Lesson</label>
                      <select className="seo-select" value={selectedLessonId} onChange={e => setSelectedLessonId(e.target.value)}>
                        <option value="">New Lesson</option>
                        {lessons.map(l => <option key={l._id} value={l._id}>{l.title}</option>)}
                      </select>
                    </div>
                  )}

                  <div className="seo-field">
                    <label className="seo-label">Difficulty</label>
                    <select className="seo-select" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="seo-field">
                    <label className="seo-label">Estimated Time (min)</label>
                    <input className="seo-input" type="number" min="1" value={estimatedTime} onChange={e => setEstimatedTime(e.target.value)} style={{ width: '120px' }} />
                  </div>

                  <div className="seo-field">
                    <label className="seo-label">Audience</label>
                    <input className="seo-input" value={audience} onChange={e => setAudience(e.target.value)} placeholder="e.g. Beginner Developers" />
                  </div>

                  <div className="seo-field">
                    <label className="seo-label">Status</label>
                    <select className="seo-select" value={status} onChange={e => setStatus(e.target.value)}>
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>

                  <div className="seo-field">
                    <label className="seo-label">Lesson Slug (auto-generated)</label>
                    <input className="seo-input" value={lessonSlug} readOnly />
                  </div>

                  <div className="seo-field">
                    <label className="seo-label">Word Count</label>
                    <input className="seo-input" value={`${editor?.storage?.characterCount?.words() ?? 0} words`} readOnly />
                  </div>
                </div>

                <div className="seo-section">
                  <div className="seo-section-title">Content Checklist</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { label: 'Theory Content (800+ chars)', ok: (editor?.getText()?.length || 0) > 800 },
                      { label: `Quiz Questions (min. 5)`, ok: quiz.length >= 5, value: `${quiz.length}/5` },
                      { label: `Interview Questions (min. 6)`, ok: interviewQuestions.length >= 6, value: `${interviewQuestions.length}/6` },
                      { label: 'SEO Tags Added', ok: tags.length >= 3, value: `${tags.length} tags` },
                      { label: 'Audience Defined', ok: !!audience.trim() },
                      { label: 'Visualization Embedded', ok: vizEmbeds.length > 0, value: `${vizEmbeds.length} viz` },
                    ].map(item => (
                      <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'var(--bg-card)', borderRadius: '6px' }}>
                        <span style={{ fontSize: '16px' }}>{item.ok ? '✅' : '⚠️'}</span>
                        <span style={{ flex: 1, fontSize: '13px', color: 'var(--text-primary)' }}>{item.label}</span>
                        {item.value && <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.value}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column: health ring + quick AI */}
              <div style={{ width: '280px', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="seo-section">
                  <div className="seo-section-title">Content Health</div>
                  <div className="health-score-ring" style={{ '--score-pct': `${health * 3.6}deg` }}>
                    <div className="health-score-circle">
                      <div className="health-score-inner">{health}</div>
                    </div>
                    <div className="health-checks">
                      <div className="health-check-item">
                        <span className={`hci-icon ${(editor?.getText()?.length || 0) > 800 ? 'ok' : 'warn'}`}>
                          {(editor?.getText()?.length || 0) > 800 ? '✓' : '!'}
                        </span>
                        Theory Content
                      </div>
                      <div className="health-check-item">
                        <span className={`hci-icon ${vizEmbeds.length > 0 ? 'ok' : 'warn'}`}>
                          {vizEmbeds.length > 0 ? '✓' : '!'}
                        </span>
                        Visualization
                      </div>
                      <div className="health-check-item">
                        <span className={`hci-icon ${quiz.length >= 5 ? 'ok' : 'warn'}`}>
                          {quiz.length >= 5 ? '✓' : '!'}
                        </span>
                        Quiz ({quiz.length}/5)
                      </div>
                      <div className="health-check-item">
                        <span className={`hci-icon ${interviewQuestions.length >= 6 ? 'ok' : 'warn'}`}>
                          {interviewQuestions.length >= 6 ? '✓' : '!'}
                        </span>
                        Interview Qs ({interviewQuestions.length}/6)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="seo-section">
                  <div className="seo-section-title">Quick AI Actions</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button
                      className="le-ai-btn primary-ai"
                      onClick={handleGenerateAll}
                      disabled={isAnyLoading}
                    >
                      {isAnyLoading ? '⏳ Generating…' : '✦ Generate All (Parallel)'}
                    </button>
                    <button className="le-ai-btn" onClick={handleGenerateQuiz} disabled={!!aiLoading.quiz}>
                      {aiLoading.quiz ? '⏳ Generating quiz…' : '✦ Generate Quiz'}
                    </button>
                    <button className="le-ai-btn" onClick={handleGenerateInterviewQs} disabled={!!aiLoading.interview}>
                      {aiLoading.interview ? '⏳ Generating…' : '✦ Generate Interview Qs'}
                    </button>
                    <button className="le-ai-btn" onClick={handleGenerateTags} disabled={!!aiLoading.tags}>
                      {aiLoading.tags ? '⏳ Generating tags…' : '✦ Generate SEO Tags'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ── Markdown Import Modal ── */}
      {showMdModal && (
        <div
          className="md-modal-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setShowMdModal(false); }}
        >
          <div className="md-modal">
            <div className="md-modal-header">
              <div className="md-modal-title">
                <span className="md-modal-icon">⇩</span>
                Import Markdown
              </div>
              <button className="md-modal-close" onClick={() => setShowMdModal(false)}>✕</button>
            </div>

            <div className="md-modal-body">
              <div className="md-modal-hint">
                Paste your Markdown below. Headings, code blocks (with language), tables, lists, bold, italic, and inline code are all supported.
              </div>

              <div className="md-mode-toggle">
                <label className="md-mode-label">Import mode:</label>
                <div className="md-mode-options">
                  <button
                    className={`md-mode-btn ${mdImportMode === 'replace' ? 'active' : ''}`}
                    onClick={() => setMdImportMode('replace')}
                  >
                    Replace content
                  </button>
                  <button
                    className={`md-mode-btn ${mdImportMode === 'append' ? 'active' : ''}`}
                    onClick={() => setMdImportMode('append')}
                  >
                    Append to existing
                  </button>
                </div>
              </div>

              <textarea
                className="md-textarea"
                value={mdInput}
                onChange={e => setMdInput(e.target.value)}
                placeholder={`# My Lesson Heading\n\nPaste your markdown here...\n\n\`\`\`javascript\nconst x = 1;\n\`\`\`\n\n| Col A | Col B |\n|-------|-------|\n| val 1 | val 2 |`}
                spellCheck={false}
                autoFocus
              />

              {mdInput.trim() && (
                <div className="md-preview-section">
                  <div className="md-preview-label">Preview</div>
                  <div
                    className="md-preview-box"
                    dangerouslySetInnerHTML={{ __html: convertMdToHtml(mdInput) }}
                  />
                </div>
              )}
            </div>

            <div className="md-modal-footer">
              <div className="md-char-count">
                {mdInput.length} characters
              </div>
              <div className="md-footer-actions">
                <button className="md-btn-cancel" onClick={() => { setShowMdModal(false); setMdInput(''); }}>
                  Cancel
                </button>
                <button
                  className="md-btn-import"
                  onClick={handleMdImport}
                  disabled={!mdInput.trim()}
                >
                  ⇩ Import into Editor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default LessonEditor;