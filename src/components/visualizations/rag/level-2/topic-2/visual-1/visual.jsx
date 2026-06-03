/* Lesson: Tool Definitions & Function Calling
 * Visual type: ANIMATION (stepped flow)
 * Reason: Function calling is a hand-off dance: LLM emits a structured call →
 * your code runs it → result returns → LLM uses it. Stepping through the JSON at
 * each hand-off makes the protocol clear. */
import React, { useState } from 'react';
import './visual.css';

const STEPS = [
  { who: 'You', label: 'Define tools', code: `tools = [{\n  name: "get_weather",\n  parameters: { city: "string" }\n}]` },
  { who: 'LLM', label: 'Requests a call', code: `{\n  "tool": "get_weather",\n  "args": { "city": "Mumbai" }\n}` },
  { who: 'Your code', label: 'Executes it', code: `const r = await getWeather("Mumbai");\n// { temp: 31, rain: false }` },
  { who: 'You', label: 'Return result', code: `{ "role": "tool",\n  "content": "{ temp: 31, rain: false }" }` },
  { who: 'LLM', label: 'Final answer', code: `"It's 31°C and clear in Mumbai today."` },
];

const RagToolVisualization = () => {
  const [step, setStep] = useState(0);
  return (
    <div className="ragtool-wrap">
      <header className="ragtool-head">
        <span className="ragtool-badge">AI Agents</span>
        <h2>Function Calling</h2>
        <p>How an LLM safely uses your code</p>
      </header>
      <div className="ragtool-track">
        {STEPS.map((s, i) => (
          <button key={i} className={`ragtool-dot ${step === i ? 'ragtool-dot--on' : ''} ${i < step ? 'ragtool-dot--done' : ''}`} onClick={() => setStep(i)}>{i + 1}</button>
        ))}
      </div>
      <div className="ragtool-card">
        <div className="ragtool-who" data-who={STEPS[step].who}>{STEPS[step].who}</div>
        <div className="ragtool-label">{STEPS[step].label}</div>
        <pre className="ragtool-code"><code>{STEPS[step].code}</code></pre>
      </div>
      <div className="ragtool-nav">
        <button className="ragtool-btn" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>← Prev</button>
        <button className="ragtool-btn ragtool-btn--next" disabled={step === STEPS.length - 1} onClick={() => setStep((s) => s + 1)}>Next →</button>
      </div>
      <div className="ragtool-note">The LLM never runs code itself — it only <strong>requests</strong> a call in structured JSON. Your code decides whether &amp; how to execute it. That boundary is what keeps tool use safe.</div>
    </div>
  );
};
export default RagToolVisualization;
