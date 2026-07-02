/**
 * SandboxGuide — live coding hints powered by the AI tutor.
 * Must be rendered inside a SandpackProvider so useSandpack and
 * useSandpackConsole have access to the running sandbox state.
 *
 * Renders a slim toolbar above the editor (Get Hint / Fix Error / Disable).
 * The hint output appears in a floating right-side modal (via a portal) so it
 * never grows the sandbox height or forces the IDE to scroll.
 */
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSandpack, useSandpackConsole } from '@codesandbox/sandpack-react';
import Markdown from '../AiTutorChat/Markdown';
import { streamChat } from '../AiTutorChat/tutorClient';
import './sandboxGuide.css';

function getLearnerName() {
  try {
    return JSON.parse(localStorage.getItem('userInfo') || 'null')?.name || null;
  } catch { return null; }
}

export default function SandboxGuide({ lesson = {}, onDisable }) {
  const { sandpack } = useSandpack();
  const { logs } = useSandpackConsole({ resetOnPreviewRestart: true, showSyntaxError: true });
  const [hint, setHint] = useState('');
  const [score, setScore] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [waking, setWaking] = useState(false);
  const abortRef = useRef(null);
  const wakingTimerRef = useRef(null);

  const errors = logs.filter(l => l.method === 'error');

  // Abort any in-flight hint request if the guide unmounts.
  useEffect(() => () => { abortRef.current?.abort(); clearTimeout(wakingTimerRef.current); }, []);

  // Extract score from streamed review text as tokens arrive.
  useEffect(() => {
    if (!hint) return;
    const m = hint.match(/\*{0,2}Score:\s*(\d+)\/10\*{0,2}/i);
    if (m) setScore(parseInt(m[1], 10));
  }, [hint]);

  // Caps keep the payload under the backend's message limit and avoid sending a
  // huge prompt. Lesson sandbox files are small, so this rarely truncates.
  const MAX_CODE = 6000;
  const MAX_ERR = 1200;

  function buildCodeBlock() {
    const full = Object.entries(sandpack.files)
      .filter(([, v]) => v?.code && v.code.trim())
      .map(([path, { code }]) => `--- ${path} ---\n${code}`)
      .join('\n\n');
    return full.length > MAX_CODE
      ? `${full.slice(0, MAX_CODE)}\n... (truncated)`
      : full;
  }

  const scoreColor = (n) => {
    if (n >= 8) return '#10b981';
    if (n >= 6) return '#3b82f6';
    if (n >= 4) return '#f59e0b';
    return '#ef4444';
  };
  const scoreLabel = (n) => {
    if (n >= 8) return 'Great';
    if (n >= 6) return 'Good';
    if (n >= 4) return 'Fair';
    return 'Needs work';
  };

  const lessonPayload = {
    course_id: lesson.course_id || lesson.course_slug || 'demo-course',
    lesson_id: lesson.lesson_id || null,
    lesson_title: lesson.lesson_title || 'this lesson',
    lesson_slug: lesson.lesson_slug || '',
    topic: lesson.topic || '',
    learner_name: getLearnerName() || undefined,
  };

  const startRequest = () => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setHint('');
    setScore(null);
    setOpen(true);
    setLoading(true);
    clearTimeout(wakingTimerRef.current);
    setWaking(false);
    wakingTimerRef.current = setTimeout(() => setWaking(true), 15000);
  };

  const finishRequest = () => {
    clearTimeout(wakingTimerRef.current);
    setWaking(false);
    setLoading(false);
  };

  const requestReview = async () => {
    const code = buildCodeBlock();
    if (!code.trim()) {
      abortRef.current?.abort();
      setScore(null);
      setOpen(true);
      setLoading(false);
      setHint("Write some code in the editor first, then I can review it. 🙂");
      return;
    }
    startRequest();
    const message = `My editor files:\n\`\`\`\n${code}\n\`\`\`\n\nPlease review this code and score it out of 10.`;
    try {
      await streamChat(
        { ...lessonPayload, mode: 'code_review', message },
        (evt) => { if (evt.type === 'token') setHint(h => h + (evt.delta || '')); },
        abortRef.current.signal,
      );
    } catch (err) {
      if (err.name !== 'AbortError')
        setHint('_Couldn\'t reach the tutor service. Make sure the AI tutor backend is running._');
    } finally { finishRequest(); }
  };

  const fixError = async () => {
    const code = buildCodeBlock();
    if (!code.trim()) {
      abortRef.current?.abort();
      setScore(null);
      setOpen(true);
      setLoading(false);
      setHint("Write some code in the editor first. 🙂");
      return;
    }
    startRequest();
    const stringifyData = (d) =>
      (Array.isArray(d) ? d : [d]).map(p => (typeof p === 'string' ? p : JSON.stringify(p))).join(' ');
    const errorText = errors.map(e => stringifyData(e.data)).filter(Boolean).join('\n').slice(0, MAX_ERR);
    const message = `My editor files:\n\`\`\`\n${code}\n\`\`\`\n\nThe sandbox console shows this error:\n${errorText}\n\nUsing only the code above, explain the likely cause and the smallest next step to fix it. Don't give the full corrected file.`;
    try {
      await streamChat(
        { ...lessonPayload, mode: 'sandbox', message },
        (evt) => { if (evt.type === 'token') setHint(h => h + (evt.delta || '')); },
        abortRef.current.signal,
      );
    } catch (err) {
      if (err.name !== 'AbortError')
        setHint('_Couldn\'t reach the tutor service. Make sure the AI tutor backend is running._');
    } finally { finishRequest(); }
  };

  const closeModal = () => {
    abortRef.current?.abort();
    clearTimeout(wakingTimerRef.current);
    setWaking(false);
    setOpen(false);
  };

  return (
    <>
      <div className="sg-bar">
        <span className="sg-bar-icon">🤖</span>
        <div className="sg-bar-text">
          <strong>Code Guide</strong>
          <span>On — ask for a hint or an error fix anytime while you code</span>
        </div>
        <div className="sg-bar-actions">
          {errors.length > 0 && (
            <button
              className="sg-btn sg-btn-error"
              onClick={fixError}
              disabled={loading}
              title="Let the AI explain the console error"
            >
              🔧 Fix Error{errors.length > 1 ? ` (${errors.length})` : ''}
            </button>
          )}
          <button
            className="sg-btn sg-btn-hint"
            onClick={requestReview}
            disabled={loading}
          >
            {loading ? <span className="sg-spinner" /> : '📋'} Code Review
          </button>
          {onDisable && (
            <button className="sg-bar-disable" onClick={onDisable} title="Turn off Code Guide">
              Disable
            </button>
          )}
        </div>
      </div>

      {open && createPortal(
        <div className="sg-modal" role="dialog" aria-label="Code Guide hint">
          <div className="sg-modal-header">
            <span className="sg-modal-title">🤖 Code Guide</span>
            {score !== null && (
              <div className="sg-score-badge" style={{ background: scoreColor(score) }}>
                <span className="sg-score-num">{score}</span>
                <span className="sg-score-denom">/10</span>
                <span className="sg-score-label">{scoreLabel(score)}</span>
              </div>
            )}
            <button className="sg-modal-close" onClick={closeModal} aria-label="Close hint">✕</button>
          </div>
          <div className="sg-modal-body">
            {hint && <Markdown text={hint} />}
            {loading && !hint && (
              waking
                ? <p className="sg-waking-notice">⏳ The AI server is waking up from sleep (Render free tier cold start). This usually takes 30–60 s — hang tight…</p>
                : <p className="sg-modal-loading">Thinking through your code…</p>
            )}
            {loading && hint && <span className="sg-caret" />}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
