/* Lesson: Tokenisation & Context Windows
 * Visual type: INTERACTIVE
 * Reason: "Tokens aren't words" and "context windows are finite" click instantly
 * when you type text, watch it split into colored tokens, and see a context-
 * window meter fill up. */
import React, { useState } from 'react';
import './visual.css';

// crude tokenizer: splits on spaces & punctuation, ~chunks long words
function tokenize(text) {
  if (!text) return [];
  const raw = text.match(/\s+|[\w']+|[^\s\w]/g) || [];
  const toks = [];
  raw.forEach((r) => {
    if (/^\s+$/.test(r)) return;
    if (r.length > 6) { for (let i = 0; i < r.length; i += 4) toks.push(r.slice(i, i + 4)); }
    else toks.push(r);
  });
  return toks;
}

const LlmTokenisationVisualization = () => {
  const [text, setText] = useState('Tokenization splits text into pieces!');
  const tokens = tokenize(text);
  const windowSize = 32; // pretend tiny window for demo
  const used = tokens.length;
  const pct = Math.min(100, (used / windowSize) * 100);
  const colors = ['#34d399', '#60a5fa', '#f59e0b', '#c084fc', '#f472b6'];

  return (
    <div className="llmtok-wrap">
      <header className="llmtok-head">
        <span className="llmtok-badge">LLM</span>
        <h2>Tokenisation &amp; Context Windows</h2>
        <p>Models read tokens, not characters — and only so many at once</p>
      </header>
      <textarea className="llmtok-input" value={text} onChange={(e) => setText(e.target.value)} rows={2} placeholder="Type something…" />
      <div className="llmtok-tokens">
        {tokens.map((t, i) => (
          <span key={i} className="llmtok-token" style={{ background: colors[i % colors.length] + '33', borderColor: colors[i % colors.length], color: colors[i % colors.length] }}>{t}</span>
        ))}
      </div>
      <div className="llmtok-stats">
        <div className="llmtok-stat"><span>Characters</span><strong>{text.length}</strong></div>
        <div className="llmtok-stat"><span>Tokens</span><strong>{used}</strong></div>
        <div className="llmtok-stat"><span>~ ratio</span><strong>{text.length ? (text.length / Math.max(1, used)).toFixed(1) : 0}</strong></div>
      </div>
      <div className="llmtok-window">
        <div className="llmtok-window-label">Context window ({used}/{windowSize} tokens)</div>
        <div className="llmtok-meter"><div className={`llmtok-meter-fill ${pct > 85 ? 'llmtok-meter-fill--full' : ''}`} style={{ width: `${pct}%` }} /></div>
        {pct > 85 && <div className="llmtok-warn">⚠️ Near the limit — older tokens get dropped (the model "forgets" the start).</div>}
      </div>
      <div className="llmtok-note">Rule of thumb: ~1 token ≈ 4 characters ≈ ¾ of a word. Real windows range from a few thousand to millions of tokens. You pay per token.</div>
    </div>
  );
};
export default LlmTokenisationVisualization;
