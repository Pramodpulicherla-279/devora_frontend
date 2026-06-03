/* Lesson: Multi-Step Planning
 * Visual type: ANIMATION (stepped plan execution)
 * Reason: Multi-step agents decompose a goal into a plan and execute steps,
 * sometimes re-planning. Watching a task break into sub-steps that complete one
 * by one shows the ReAct-style loop. */
import React, { useState, useEffect } from 'react';
import './visual.css';

const PLAN = [
  { step: 'Search flights NYC → Tokyo', tool: 'search_flights', done: false },
  { step: 'Find hotels near Shibuya', tool: 'search_hotels', done: false },
  { step: 'Check weather for the dates', tool: 'get_weather', done: false },
  { step: 'Compile a day-by-day itinerary', tool: 'summarize', done: false },
];

const RagPlanningVisualization = () => {
  const [done, setDone] = useState(-1);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    if (done >= PLAN.length - 1) { setRunning(false); return; }
    const t = setTimeout(() => setDone((d) => d + 1), 900);
    return () => clearTimeout(t);
  }, [running, done]);
  return (
    <div className="ragplan-wrap">
      <header className="ragplan-head">
        <span className="ragplan-badge">AI Agents</span>
        <h2>Multi-Step Planning</h2>
        <p>Break a big goal into a sequence of tool calls</p>
      </header>
      <div className="ragplan-goal">🎯 Goal: "Plan a 5-day trip to Tokyo"</div>
      <div className="ragplan-steps">
        {PLAN.map((p, i) => (
          <div key={i} className={`ragplan-step ${done >= i ? 'ragplan-step--done' : ''} ${running && done + 1 === i ? 'ragplan-step--active' : ''}`}>
            <span className="ragplan-check">{done >= i ? '✓' : i + 1}</span>
            <div className="ragplan-step-body">
              <span className="ragplan-step-text">{p.step}</span>
              <code className="ragplan-tool">{p.tool}()</code>
            </div>
          </div>
        ))}
      </div>
      <div className="ragplan-controls">
        <button className="ragplan-btn" onClick={() => { setDone(-1); setRunning(true); }} disabled={running}>▶ Execute plan</button>
        <button className="ragplan-btn ragplan-btn--reset" onClick={() => { setDone(-1); setRunning(false); }}>Reset</button>
      </div>
      {done >= PLAN.length - 1 && <div className="ragplan-done">✅ Goal achieved — all sub-tasks complete.</div>}
      <div className="ragplan-note">Patterns like <strong>ReAct</strong> (Reason + Act) and <strong>Plan-and-Execute</strong> let agents tackle tasks too complex for a single LLM call — decomposing, acting, and re-planning when a step fails.</div>
    </div>
  );
};
export default RagPlanningVisualization;
