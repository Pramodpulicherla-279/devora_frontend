/* Lesson: What Are Agents
 * Visual type: ILLUSTRATION (animated loop)
 * Reason: An agent is a Think → Act → Observe loop. A circular animated diagram
 * that steps through the loop with a worked example makes the cycle concrete. */
import React, { useState } from 'react';
import './visual.css';

const LOOP = [
  { icon: '🧠', label: 'Think', d: 'Reason about the goal: "I need today\'s weather → use the weather tool."' },
  { icon: '🔧', label: 'Act', d: 'Call a tool: getWeather(city="Mumbai")' },
  { icon: '👁️', label: 'Observe', d: 'Read the tool result: { temp: 31°C, rain: false }' },
  { icon: '🔁', label: 'Repeat / Finish', d: 'Enough info? Answer the user. Else loop again with more tools.' },
];

const RagAgentVisualization = () => {
  const [step, setStep] = useState(0);
  return (
    <div className="ragagent-wrap">
      <header className="ragagent-head">
        <span className="ragagent-badge">AI Agents</span>
        <h2>What Are Agents?</h2>
        <p>An LLM that loops: think → act → observe → repeat</p>
      </header>
      <div className="ragagent-loop">
        {LOOP.map((l, i) => (
          <button key={i} className={`ragagent-node ${step === i ? 'ragagent-node--on' : ''}`} onClick={() => setStep(i)}>
            <span className="ragagent-icon">{l.icon}</span>
            <span className="ragagent-label">{l.label}</span>
          </button>
        ))}
        <div className="ragagent-cycle">↻</div>
      </div>
      <div className="ragagent-detail"><strong>{LOOP[step].label}</strong><p>{LOOP[step].d}</p></div>
      <div className="ragagent-nav">
        <button className="ragagent-btn" onClick={() => setStep((s) => (s + 1) % LOOP.length)}>Next step ↻</button>
      </div>
      <div className="ragagent-compare">
        <div className="ragagent-c"><strong>Plain LLM</strong><p>One prompt → one answer. No actions.</p></div>
        <div className="ragagent-c ragagent-c--hl"><strong>Agent</strong><p>Plans, calls tools, reacts to results, iterates until done.</p></div>
      </div>
    </div>
  );
};
export default RagAgentVisualization;
