import React, { useState } from 'react';
import './visual.css';

const INITIAL_DOM = [
  { id: 1, tag: 'div#app', level: 0, text: '' },
  { id: 2, tag: 'h1', level: 1, text: 'Hello World' },
  { id: 3, tag: 'p', level: 1, text: 'Welcome to JS DOM!' },
  { id: 4, tag: 'button#btn', level: 1, text: 'Click Me' },
];

const ACTIONS = [
  {
    label: 'Change text',
    icon: '✏️',
    color: '#61AFEF',
    code: `document.querySelector('h1').textContent = 'JS is Awesome!';`,
    apply: (nodes) => nodes.map((n) => n.id === 2 ? { ...n, text: 'JS is Awesome!' } : n),
  },
  {
    label: 'Add element',
    icon: '➕',
    color: '#98C379',
    code: `const span = document.createElement('span');\nspan.textContent = 'New!';\ndocument.querySelector('#app').appendChild(span);`,
    apply: (nodes) => [...nodes, { id: Date.now(), tag: 'span', level: 1, text: 'New!' }],
  },
  {
    label: 'Change style',
    icon: '🎨',
    color: '#C678DD',
    code: `document.querySelector('p').style.color = '#a78bfa';\ndocument.querySelector('p').style.fontWeight = 'bold';`,
    apply: (nodes) => nodes.map((n) => n.id === 3 ? { ...n, styled: true } : n),
  },
  {
    label: 'Remove element',
    icon: '🗑️',
    color: '#E06C75',
    code: `const btn = document.querySelector('#btn');\nbtn.parentNode.removeChild(btn);`,
    apply: (nodes) => nodes.filter((n) => n.id !== 4),
  },
];

const JsDomManipulationVisualization = () => {
  const [nodes, setNodes] = useState(INITIAL_DOM);
  const [lastAction, setLastAction] = useState(null);

  const apply = (action) => {
    setNodes(action.apply(nodes));
    setLastAction(action);
  };

  const reset = () => { setNodes(INITIAL_DOM); setLastAction(null); };

  return (
    <div className="jsdm-wrap">
      <header className="jsdm-head">
        <span className="jsdm-badge">JS</span>
        <h2>DOM Manipulation</h2>
        <p>Click actions to modify the DOM tree in real time</p>
      </header>

      <div className="jsdm-grid">
        {/* ─── DOM Tree ─── */}
        <div className="jsdm-panel">
          <div className="jsdm-panel-head">
            <h3>DOM Tree</h3>
            <button className="jsdm-reset" onClick={reset}>Reset</button>
          </div>
          <div className="jsdm-tree">
            <div className="jsdm-root">
              <span className="jsdm-tag">{'<html>'}</span>
              <div className="jsdm-child-wrap">
                <span className="jsdm-tag">{'<body>'}</span>
                <div className="jsdm-child-wrap">
                  {nodes.map((n) => (
                    <div key={n.id} className="jsdm-node" style={{ marginLeft: `${n.level * 14}px` }}>
                      <span className="jsdm-node-tag">{'<'}{n.tag}{'>'}</span>
                      {n.text && (
                        <span className={`jsdm-node-text ${n.styled ? 'jsdm-node-text--styled' : ''}`}>
                          {n.text}
                        </span>
                      )}
                      <span className="jsdm-node-close">{'</'}{n.tag.split('#')[0]}{'>'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Action Panel ─── */}
        <div className="jsdm-panel">
          <h3>Actions</h3>
          <div className="jsdm-actions">
            {ACTIONS.map((action, i) => (
              <button
                key={i}
                className={`jsdm-action ${lastAction?.label === action.label ? 'jsdm-action--done' : ''}`}
                style={{ '--ac': action.color }}
                onClick={() => apply(action)}
              >
                <span className="jsdm-action-icon">{action.icon}</span>
                <span className="jsdm-action-label">{action.label}</span>
              </button>
            ))}
          </div>

          {lastAction && (
            <>
              <h3 style={{ marginTop: '16px' }}>Code executed</h3>
              <pre className="jsdm-code"><code>{lastAction.code}</code></pre>
            </>
          )}

          <div className="jsdm-selectors">
            <h3>Common Selectors</h3>
            <div className="jsdm-sel-list">
              {[
                ['getElementById', `document.getElementById('btn')`],
                ['querySelector', `document.querySelector('.class')`],
                ['querySelectorAll', `document.querySelectorAll('li')`],
              ].map(([name, ex]) => (
                <div key={name} className="jsdm-sel">
                  <code className="jsdm-sel-name">{name}</code>
                  <code className="jsdm-sel-ex">{ex}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsDomManipulationVisualization;
