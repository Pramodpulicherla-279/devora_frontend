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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [waking, setWaking] = useState(false);
  const abortRef = useRef(null);
  const wakingTimerRef = useRef(null);

  const errors = logs.filter(l => l.method === 'error');

  // Abort any in-flight hint request if the guide unmounts (Disable, lesson
  // switch, closing the practice panel) so it doesn't update a dead component.
  useEffect(() => () => { abortRef.current?.abort(); clearTimeout(wakingTimerRef.current); }, []);

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

  const requestHint = async (isError = false) => {
    const code = buildCodeBlock();

    // Nothing meaningful to analyse — don't call the model, just prompt them.
    if (!code.trim()) {
      abortRef.current?.abort();
      setOpen(true);
      setLoading(false);
      setHint("Write some code in the editor first, then I'll give you a hint about it. 🙂");
      return;
    }

    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setHint('');
    setOpen(true);
    setLoading(true);
    clearTimeout(wakingTimerRef.current);
    setWaking(false);
    wakingTimerRef.current = setTimeout(() => setWaking(true), 15000);

    const stringifyData = (d) =>
      (Array.isArray(d) ? d : [d])
        .map(part => (typeof part === 'string' ? part : JSON.stringify(part)))
        .join(' ');
    const errorText = isError
      ? errors.map(e => stringifyData(e.data)).filter(Boolean).join('\n').slice(0, MAX_ERR)
      : '';

    const message = isError && errorText
      ? `My editor files:\n\`\`\`\n${code}\n\`\`\`\n\nThe sandbox console shows this error:\n${errorText}\n\nUsing only the code above, explain the likely cause and the smallest next step to fix it. Don't give the full corrected file.`
      : `My editor files:\n\`\`\`\n${code}\n\`\`\`\n\nUsing only the code above for this lesson, give me one small, specific hint on what to try or improve next. Don't give the full solution.`;

    try {
      await streamChat(
        {
          course_id: lesson.course_id || lesson.course_slug || 'demo-course',
          lesson_id: lesson.lesson_id || null,
          lesson_title: lesson.lesson_title || 'this lesson',
          lesson_slug: lesson.lesson_slug || '',
          topic: lesson.topic || '',
          learner_name: getLearnerName() || undefined,
          mode: 'sandbox',
          message,
        },
        (evt) => {
          if (evt.type === 'token') setHint(h => h + (evt.delta || ''));
        },
        abortRef.current.signal,
      );
    } catch (err) {
      if (err.name !== 'AbortError') {
        setHint('_Couldn\'t reach the tutor service. Make sure the AI tutor backend is running._');
      }
    } finally {
      clearTimeout(wakingTimerRef.current);
      setWaking(false);
      setLoading(false);
    }
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
              onClick={() => requestHint(true)}
              disabled={loading}
              title="Let the AI explain the console error"
            >
              🔧 Fix Error{errors.length > 1 ? ` (${errors.length})` : ''}
            </button>
          )}
          <button
            className="sg-btn sg-btn-hint"
            onClick={() => requestHint(false)}
            disabled={loading}
          >
            {loading ? <span className="sg-spinner" /> : '💡'} Get Hint
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
