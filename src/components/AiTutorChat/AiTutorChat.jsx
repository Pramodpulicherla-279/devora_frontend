/**
 * AiTutorChat — context-aware AI tutor popup, mounted from the lesson page's
 * "AI Chat" button. Streams answers from the FastAPI tutor service and renders
 * markdown (incl. tables). Designed to match the product chat mock.
 *
 * Each lesson gets its own independent chat thread stored under a per-lesson
 * localStorage key. Switching lessons loads that lesson's saved thread (or starts
 * fresh) and sends a fresh conversation_id so the backend memory window is scoped
 * to that lesson only.
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bot, X, Send, Code2, Lightbulb, HelpCircle, FileText, GraduationCap, RotateCcw,
} from 'lucide-react';
import Markdown from './Markdown';
import { streamChat } from './tutorClient';
import './aiTutorChat.css';

const CHIPS = [
  { icon: Code2,      label: 'Yes, show example',    mode: 'coding',  text: 'Yes, show me an example.' },
  { icon: Lightbulb,  label: 'Explain with analogy',  mode: 'tutor',   text: 'Explain that with an analogy.' },
  { icon: HelpCircle, label: 'Quiz me on this',        mode: 'quiz',    text: 'Quiz me on this topic.' },
  { icon: FileText,   label: 'Summarize this',         mode: 'summary', text: 'Summarize this lesson.' },
];

/** One localStorage key per lesson so threads never bleed across lessons. */
function storageKeyFor(lesson) {
  const id = lesson.lesson_id || lesson.lesson_slug || 'default';
  return `devel_tutor_chat_${id}`;
}

function loadSavedForKey(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || 'null');
    if (!data) return { messages: [], conversationId: null };
    return { messages: data.messages || [], conversationId: data.conversationId || null };
  } catch {
    return { messages: [], conversationId: null };
  }
}

function getLoggedInName() {
  try {
    const info = JSON.parse(localStorage.getItem('userInfo') || 'null');
    return info?.name || null;
  } catch {
    return null;
  }
}

export default function AiTutorChat({ lesson = {}, onClose }) {
  const learnerName = getLoggedInName();
  const storageKey = storageKeyFor(lesson);
  const prevKeyRef = useRef(storageKey);

  // Load the current lesson's saved thread once on mount.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initial = useMemo(() => loadSavedForKey(storageKey), []);
  const [messages, setMessages] = useState(initial.messages);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const convIdRef = useRef(initial.conversationId);
  const bodyRef = useRef(null);
  const abortRef = useRef(null);

  // When the user switches to a different lesson, swap in that lesson's thread.
  useEffect(() => {
    if (prevKeyRef.current === storageKey) return;
    prevKeyRef.current = storageKey;

    abortRef.current?.abort();
    setStreaming(false);
    setInput('');

    const saved = loadSavedForKey(storageKey);
    setMessages(saved.messages);
    convIdRef.current = saved.conversationId;
  }, [storageKey]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages]);

  // Persist each lesson's thread independently under its own key.
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        conversationId: convIdRef.current,
        messages: messages.slice(-40),
      }));
    } catch { /* storage unavailable */ }
  }, [messages, storageKey]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const send = async (text, mode = 'tutor') => {
    const msg = (text || '').trim();
    if (!msg || streaming) return;
    setInput('');
    setMessages((m) => [
      ...m,
      { role: 'user', content: msg },
      { role: 'assistant', content: '', citations: [] },
    ]);
    setStreaming(true);
    abortRef.current = new AbortController();

    try {
      await streamChat(
        {
          conversation_id: convIdRef.current,
          course_id: lesson.course_id || lesson.course_slug || 'demo-course',
          module_id: lesson.module_id || null,
          lesson_id: lesson.lesson_id || null,
          lesson_title: lesson.lesson_title || 'this lesson',
          lesson_slug: lesson.lesson_slug || '',
          topic: lesson.topic || '',
          learner_name: learnerName || undefined,
          mode,
          message: msg,
        },
        (evt) => {
          setMessages((m) => {
            // Immutable update — StrictMode double-invokes updaters, so mutating
            // the existing message object would double every streamed chunk.
            const next = m.slice();
            const last = { ...next[next.length - 1] };
            if (evt.type === 'token') last.content += evt.delta || '';
            else if (evt.type === 'citations') last.citations = evt.citations || [];
            else if (evt.type === 'done') {
              last.id = evt.message_id;
              if (evt.conversation_id) convIdRef.current = evt.conversation_id;
            }
            next[next.length - 1] = last;
            return next;
          });
        },
        abortRef.current.signal,
      );
    } catch (err) {
      setMessages((m) => {
        const next = m.slice();
        const last = { ...next[next.length - 1] };
        last.content += `\n\n_Couldn't reach the tutor service (${err.message}). Is it running on the tutor API URL?_`;
        next[next.length - 1] = last;
        return next;
      });
    } finally {
      setStreaming(false);
    }
  };

  const newChat = () => {
    abortRef.current?.abort();
    convIdRef.current = null;
    setMessages([]);
    setInput('');
    try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const lastIsAssistant = messages.length > 0 && messages[messages.length - 1].role === 'assistant';

  return (
    <div className="att-popup" role="dialog" aria-label="AI tutor chat">
      <header className="att-header">
        <span className="att-avatar"><Bot size={18} /></span>
        <div className="att-title">
          <strong>AI Tutor</strong>
          <small>{lesson.lesson_title || 'Your personal teacher'}</small>
        </div>
        <button className="att-icon-btn" onClick={newChat} title="Start a new chat" aria-label="New chat"><RotateCcw size={16} /></button>
        <button className="att-close" onClick={onClose} aria-label="Close chat"><X size={18} /></button>
      </header>

      <div className="att-body" ref={bodyRef}>
        {messages.length === 0 && (
          <div className="att-greeting">
            <span className="att-avatar att-avatar-lg"><Bot size={20} /></span>
            <div className="att-bubble att-bubble-assistant">
              <p>Hi{learnerName ? ` ${learnerName}` : ''}! 👋 I'm your AI Tutor. Ask me anything about <b>{lesson.lesson_title || 'this lesson'}</b> — concepts, code, quizzes, or a quick summary.</p>
            </div>
          </div>
        )}

        {messages.map((m, idx) => (
          <div key={idx} className={`att-row att-row-${m.role}`}>
            {m.role === 'assistant' && <span className="att-avatar"><Bot size={16} /></span>}
            <div className={`att-bubble att-bubble-${m.role}`}>
              {m.role === 'assistant'
                ? <>
                    <Markdown text={m.content} />
                    {streaming && idx === messages.length - 1 && !m.content && <span className="att-caret" />}
                    {m.citations?.length > 0 && (
                      <div className="att-cite">From: {m.citations.map((c) => c.lesson_slug || c.lesson_id).filter(Boolean).join(', ')}</div>
                    )}
                  </>
                : m.content}
            </div>
            {m.role === 'user' && <span className="att-avatar att-avatar-user"><GraduationCap size={16} /></span>}
          </div>
        ))}
      </div>

      {(messages.length === 0 || (lastIsAssistant && !streaming)) && (
        <div className="att-chip-row">
          {CHIPS.map((c) => {
            const Icon = c.icon;
            return (
              <button key={c.label} className="att-chip" disabled={streaming} onClick={() => send(c.text, c.mode)}>
                <Icon size={14} /> {c.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="att-composer">
        <input
          value={input}
          disabled={streaming}
          placeholder="Ask anything about your course..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button className="att-send" disabled={streaming || !input.trim()} onClick={() => send(input)} aria-label="Send">
          <Send size={16} />
        </button>
      </div>

      <footer className="att-footer">AI Tutor may make mistakes. Please verify important information.</footer>
    </div>
  );
}
