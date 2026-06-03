import React, { useState, useRef } from 'react';
import './visual.css';

const EVENT_TYPES = [
  { name: 'click', icon: '🖱️', desc: 'Fires when an element is clicked', trigger: 'Click the box below', color: '#61AFEF' },
  { name: 'mouseover', icon: '👆', desc: 'Fires when mouse enters an element', trigger: 'Hover over the box', color: '#98C379' },
  { name: 'keydown', icon: '⌨️', desc: 'Fires when a key is pressed', trigger: 'Click box then press any key', color: '#E5C07B' },
  { name: 'dblclick', icon: '🖱️🖱️', desc: 'Fires on a double click', trigger: 'Double-click the box', color: '#C678DD' },
  { name: 'contextmenu', icon: '📋', desc: 'Fires on right-click', trigger: 'Right-click the box', color: '#E06C75' },
];

const JsDomEventsVisualization = () => {
  const [activeType, setActiveType] = useState(EVENT_TYPES[0]);
  const [log, setLog] = useState([]);
  const [propMode, setPropMode] = useState('bubble');
  const [propLog, setPropLog] = useState([]);
  const boxRef = useRef(null);

  const addLog = (msg, color = '#e6edf3') => {
    setLog((prev) => [{ msg, color, id: Date.now() + Math.random() }, ...prev].slice(0, 8));
  };

  const handleBoxEvent = (e) => {
    if (activeType.name === 'contextmenu') e.preventDefault();
    if (e.type === activeType.name) {
      addLog(`${activeType.icon} ${activeType.name} fired!${e.key ? ` (key: "${e.key}")` : ''}`, activeType.color);
    }
  };

  const handlePropagation = (origin) => {
    setPropLog([]);
    const order = propMode === 'bubble'
      ? [origin, 'parent', 'grandparent']
      : ['grandparent', 'parent', origin];

    order.forEach((el, i) => {
      setTimeout(() => {
        setPropLog((prev) => [...prev, el]);
      }, i * 400);
    });
  };

  const code = `document.querySelector('.box').addEventListener(
  '${activeType.name}',
  (event) => {
    console.log('${activeType.name} fired!', event);
  }
);`;

  return (
    <div className="jsde-wrap">
      <header className="jsde-head">
        <span className="jsde-badge">JS</span>
        <h2>DOM Events</h2>
      </header>

      <div className="jsde-grid">
        {/* ─── Event Types Panel ─── */}
        <div className="jsde-panel">
          <h3>Event Types</h3>
          <div className="jsde-event-list">
            {EVENT_TYPES.map((et) => (
              <button
                key={et.name}
                className={`jsde-etype ${activeType.name === et.name ? 'jsde-etype--on' : ''}`}
                style={{ '--ec': et.color }}
                onClick={() => { setActiveType(et); setLog([]); }}
              >
                <span className="jsde-etype-icon">{et.icon}</span>
                <div>
                  <div className="jsde-etype-name">{et.name}</div>
                  <div className="jsde-etype-desc">{et.desc}</div>
                </div>
              </button>
            ))}
          </div>

          <pre className="jsde-code"><code>{code}</code></pre>
        </div>

        {/* ─── Live Playground ─── */}
        <div className="jsde-panel">
          <h3>Live Demo</h3>
          <p className="jsde-trigger">{activeType.trigger}</p>
          <div
            ref={boxRef}
            className="jsde-box"
            style={{ '--ec': activeType.color }}
            tabIndex={0}
            onClick={handleBoxEvent}
            onMouseOver={handleBoxEvent}
            onKeyDown={handleBoxEvent}
            onDoubleClick={handleBoxEvent}
            onContextMenu={handleBoxEvent}
          >
            <span className="jsde-box-icon">{activeType.icon}</span>
            <span className="jsde-box-label">Event Target</span>
            <code className="jsde-box-event">addEventListener('{activeType.name}', …)</code>
          </div>

          <div className="jsde-log">
            <div className="jsde-log-head">Event Log</div>
            {log.length === 0 && <div className="jsde-log-empty">No events yet…</div>}
            {log.map((entry) => (
              <div key={entry.id} className="jsde-log-entry" style={{ color: entry.color }}>
                {entry.msg}
              </div>
            ))}
          </div>

          {/* Propagation */}
          <div className="jsde-prop">
            <div className="jsde-prop-head">
              <h3>Event Propagation</h3>
              <div className="jsde-prop-tabs">
                <button
                  className={`jsde-ptab ${propMode === 'bubble' ? 'jsde-ptab--on' : ''}`}
                  onClick={() => { setPropMode('bubble'); setPropLog([]); }}
                >Bubbling ↑</button>
                <button
                  className={`jsde-ptab ${propMode === 'capture' ? 'jsde-ptab--on' : ''}`}
                  onClick={() => { setPropMode('capture'); setPropLog([]); }}
                >Capturing ↓</button>
              </div>
            </div>
            <div className="jsde-bubbles">
              {['grandparent', 'parent', 'child'].map((el) => (
                <div
                  key={el}
                  className={`jsde-bubble ${propLog.includes(el) ? 'jsde-bubble--lit' : ''}`}
                  onClick={() => handlePropagation(el)}
                >
                  {el}
                </div>
              ))}
            </div>
            <p className="jsde-prop-tip">
              {propMode === 'bubble'
                ? 'Bubbling: event fires on target, then travels UP the DOM tree.'
                : 'Capturing: event fires from the TOP, travels DOWN to the target.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsDomEventsVisualization;
