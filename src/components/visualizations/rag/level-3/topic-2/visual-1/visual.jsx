/* Lesson: Preparing Your Dataset
 * Visual type: ILLUSTRATION
 * Reason: Fine-tuning datasets have a specific JSONL chat format. Showing the
 * exact structure + good/bad example contrast is the most useful aid. */
import React, { useState } from 'react';
import './visual.css';

const RagDatasetVisualization = () => {
  const [view, setView] = useState('format');
  return (
    <div className="ragdata-wrap">
      <header className="ragdata-head">
        <span className="ragdata-badge">Fine-Tuning</span>
        <h2>Preparing Your Dataset</h2>
        <p>Garbage in, garbage out — format &amp; quality are everything</p>
      </header>
      <div className="ragdata-tabs">
        <button className={`ragdata-tab ${view === 'format' ? 'ragdata-tab--on' : ''}`} onClick={() => setView('format')}>JSONL Format</button>
        <button className={`ragdata-tab ${view === 'quality' ? 'ragdata-tab--on' : ''}`} onClick={() => setView('quality')}>Quality Rules</button>
      </div>
      {view === 'format' ? (
        <>
          <pre className="ragdata-code"><code>{`{"messages": [
  {"role": "system", "content": "You are a support bot."},
  {"role": "user", "content": "How do I reset my password?"},
  {"role": "assistant", "content": "Go to Settings → Security → Reset."}
]}
{"messages": [ ...next example... ]}
{"messages": [ ...one JSON object per line... ]}`}</code></pre>
          <div className="ragdata-note">Each line is one independent training example (a full conversation). This is <strong>JSONL</strong> — JSON Lines. Most providers want 50–1000s of these.</div>
        </>
      ) : (
        <div className="ragdata-rules">
          {[['✓', 'Consistent format', 'Every example follows the same structure & style', true],
            ['✓', 'Diverse examples', 'Cover the real range of inputs you expect', true],
            ['✓', 'High-quality outputs', 'The assistant answers are exactly what you want copied', true],
            ['✗', 'Too few examples', 'Under ~50 rarely moves the needle', false],
            ['✗', 'Contradictory labels', 'Same input → different answers confuses training', false],
            ['✗', 'Leaking test data', 'Keep an eval set the model never trains on', false]].map(([icon, t, d, ok], i) => (
            <div key={i} className={`ragdata-rule ${ok ? 'ragdata-rule--ok' : 'ragdata-rule--bad'}`}>
              <span className="ragdata-rule-icon">{icon}</span>
              <div><strong>{t}</strong><p>{d}</p></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default RagDatasetVisualization;
