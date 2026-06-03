/* Lesson: OpenAI API Basics
 * Visual type: ILLUSTRATION
 * Reason: The request/response shape (messages, roles, model, the returned
 * choices) is structural — an annotated anatomy of the call & reply teaches it. */
import React, { useState } from 'react';
import './visual.css';

const PARTS = {
  model: { label: 'model', d: 'Which model to use, e.g. "gpt-4o-mini".' },
  messages: { label: 'messages[]', d: 'The conversation: system + user + assistant turns, each with a role.' },
  role: { label: 'role', d: 'system (instructions), user (input), assistant (model replies).' },
  temperature: { label: 'temperature', d: 'Randomness 0–2. Lower = focused, higher = creative.' },
  choices: { label: 'choices[]', d: 'The reply lives in response.choices[0].message.content.' },
  usage: { label: 'usage', d: 'Token counts — what you get billed on.' },
};

const AiAppApiBasicsVisualization = () => {
  const [hl, setHl] = useState('messages');
  return (
    <div className="aiapi-wrap">
      <header className="aiapi-head">
        <span className="aiapi-badge">AI Apps</span>
        <h2>OpenAI API Basics</h2>
        <p>Anatomy of a chat completion call</p>
      </header>
      <div className="aiapi-grid">
        <div className="aiapi-col">
          <div className="aiapi-col-label">→ Request</div>
          <pre className="aiapi-code"><code>{`POST /v1/chat/completions
{
  "`}<span className={`aiapi-k ${hl==='model'?'aiapi-k--on':''}`} onClick={()=>setHl('model')}>model</span>{`": "gpt-4o-mini",
  "`}<span className={`aiapi-k ${hl==='messages'?'aiapi-k--on':''}`} onClick={()=>setHl('messages')}>messages</span>{`": [
    { "`}<span className={`aiapi-k ${hl==='role'?'aiapi-k--on':''}`} onClick={()=>setHl('role')}>role</span>{`": "system", "content": "..." },
    { "role": "user", "content": "Hi!" }
  ],
  "`}<span className={`aiapi-k ${hl==='temperature'?'aiapi-k--on':''}`} onClick={()=>setHl('temperature')}>temperature</span>{`": 0.7
}`}</code></pre>
        </div>
        <div className="aiapi-col">
          <div className="aiapi-col-label">← Response</div>
          <pre className="aiapi-code"><code>{`{
  "`}<span className={`aiapi-k ${hl==='choices'?'aiapi-k--on':''}`} onClick={()=>setHl('choices')}>choices</span>{`": [{
    "message": {
      "role": "assistant",
      "content": "Hello! 👋"
    }
  }],
  "`}<span className={`aiapi-k ${hl==='usage'?'aiapi-k--on':''}`} onClick={()=>setHl('usage')}>usage</span>{`": { "total_tokens": 24 }
}`}</code></pre>
        </div>
      </div>
      <div className="aiapi-detail"><strong>{PARTS[hl].label}</strong> — {PARTS[hl].d}</div>
      <div className="aiapi-note">Tap any highlighted key. Every provider (OpenAI, Anthropic, etc.) follows this same messages-in → message-out shape, with small differences.</div>
    </div>
  );
};
export default AiAppApiBasicsVisualization;
