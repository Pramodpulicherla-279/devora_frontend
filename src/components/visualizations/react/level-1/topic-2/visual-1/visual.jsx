import React, { useState } from 'react';
import './visual.css';

const PROPS_VS_STATE = [
  { feature: 'Who owns it?', props: 'Parent component', state: 'The component itself' },
  { feature: 'Who can change it?', props: 'Only the parent', state: 'Only that component (via setter)' },
  { feature: 'Direction', props: 'Flows DOWN (parent → child)', state: 'Lives INSIDE the component' },
  { feature: 'Triggers re-render?', props: 'Yes, when parent re-renders', state: 'Yes, when updated via setter' },
  { feature: 'Mutable?', props: '❌ Read-only in the child', state: '✓ Via setState / useState setter' },
  { feature: 'Use for', props: 'Configuration, data display', state: 'User interactions, toggling, counters' },
];

const PARENT_CHILD_FLOW = [
  { id: 'parent', label: 'Parent', code: `const Parent = () => {\n  const color = "blue";\n  return <Child color={color} />;\n};`, color: '#61DAFB' },
  { id: 'child', label: 'Child', code: `const Child = ({ color }) => {\n  return <p style={{ color }}>\n    My color is {color}\n  </p>;\n};`, color: '#68A063' },
];

const RctPropsStateVisualization = () => {
  const [tab, setTab] = useState('compare');
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState('Ali');
  const [theme, setTheme] = useState('light');
  const [activeFlow, setActiveFlow] = useState(0);
  const [liftedVal, setLiftedVal] = useState('');

  return (
    <div className="rctps-wrap">
      <header className="rctps-head">
        <span className="rctps-badge">React</span>
        <h2>Props &amp; State</h2>
        <p>React's two ways of handling data — each with a distinct purpose</p>
      </header>

      <div className="rctps-tabs">
        {[['compare', '⚖️ Props vs State'], ['props', '📨 Props Flow'], ['state', '🔄 State Demo'], ['lifting', '⬆️ Lifting State']].map(([key, label]) => (
          <button key={key} className={`rctps-tab ${tab === key ? 'rctps-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* Compare */}
      {tab === 'compare' && (
        <div className="rctps-compare">
          <table className="rctps-table">
            <thead>
              <tr><th>Feature</th><th style={{ color: '#61DAFB' }}>Props</th><th style={{ color: '#68A063' }}>State</th></tr>
            </thead>
            <tbody>
              {PROPS_VS_STATE.map(row => (
                <tr key={row.feature}>
                  <td className="rctps-td-label">{row.feature}</td>
                  <td className="rctps-td-props">{row.props}</td>
                  <td className="rctps-td-state">{row.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="rctps-summary">
            <div className="rctps-summary-card rctps-summary-card--props">
              <span className="rctps-summary-icon">📨</span>
              <div><strong>Props</strong><p>Like function parameters — passed from outside, read-only inside.</p></div>
            </div>
            <div className="rctps-summary-card rctps-summary-card--state">
              <span className="rctps-summary-icon">🔄</span>
              <div><strong>State</strong><p>Like local variables that trigger a re-render when changed.</p></div>
            </div>
          </div>
        </div>
      )}

      {/* Props Flow */}
      {tab === 'props' && (
        <div className="rctps-props">
          <p className="rctps-desc">Props flow <strong>one way</strong> — from parent DOWN to child. The child can never change them.</p>
          <div className="rctps-flow-steps">
            {PARENT_CHILD_FLOW.map((item, i) => (
              <button key={item.id} className={`rctps-flow-step ${activeFlow === i ? 'rctps-flow-step--on' : ''}`}
                style={{ '--fc': item.color }} onClick={() => setActiveFlow(i)}>
                {item.label}
              </button>
            ))}
          </div>
          <pre className="rctps-code"><code>{PARENT_CHILD_FLOW[activeFlow].code}</code></pre>
          <div className="rctps-prop-types">
            <h3>Props can be any JS value</h3>
            <div className="rctps-prop-grid">
              {[
                ['String', `<Card title="Hello" />`, '#98C379'],
                ['Number', `<Card price={99} />`, '#E5C07B'],
                ['Boolean', `<Card featured={true} />`, '#56B6C2'],
                ['Array', `<List items={[1,2,3]} />`, '#C678DD'],
                ['Object', `<User info={{ name:'Ali' }} />`, '#61DAFB'],
                ['Function', `<Btn onClick={handleClick} />`, '#E06C75'],
              ].map(([type, example, color]) => (
                <div key={type} className="rctps-prop-row" style={{ borderColor: color }}>
                  <span style={{ color }} className="rctps-prop-type">{type}</span>
                  <code className="rctps-prop-ex">{example}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* State Demo */}
      {tab === 'state' && (
        <div className="rctps-state">
          <p className="rctps-desc">State is declared with <code>useState</code>. When the setter is called, React re-renders the component.</p>
          <div className="rctps-state-demos">
            <div className="rctps-state-card">
              <h3>Counter</h3>
              <pre className="rctps-code"><code>{`const [count, setCount] = useState(0);`}</code></pre>
              <div className="rctps-counter">
                <button className="rctps-counter-btn" onClick={() => setCount(c => c - 1)}>−</button>
                <span className="rctps-counter-val">{count}</span>
                <button className="rctps-counter-btn rctps-counter-btn--add" onClick={() => setCount(c => c + 1)}>+</button>
              </div>
              <div className="rctps-state-val">count = <code>{count}</code></div>
            </div>

            <div className="rctps-state-card">
              <h3>Text Input</h3>
              <pre className="rctps-code"><code>{`const [username, setUsername] = useState('Ali');`}</code></pre>
              <input className="rctps-input" value={username} onChange={e => setUsername(e.target.value)} placeholder="Type a name…" />
              <div className="rctps-state-val">username = <code>"{username}"</code></div>
            </div>

            <div className="rctps-state-card">
              <h3>Toggle</h3>
              <pre className="rctps-code"><code>{`const [theme, setTheme] = useState('light');`}</code></pre>
              <button className={`rctps-theme-btn ${theme === 'dark' ? 'rctps-theme-btn--dark' : ''}`}
                onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
                {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
              </button>
              <div className="rctps-state-val">theme = <code>"{theme}"</code></div>
            </div>
          </div>
        </div>
      )}

      {/* Lifting State */}
      {tab === 'lifting' && (
        <div className="rctps-lifting">
          <p className="rctps-desc">When two sibling components need to share state, lift it up to their common parent.</p>
          <div className="rctps-lift-diagram">
            <div className="rctps-lift-parent">
              <div className="rctps-lift-label">Parent (owns state)</div>
              <pre className="rctps-code"><code>{`const [value, setValue] = useState('');\n\nreturn (\n  <>\n    <Input  onChange={setValue} />\n    <Display value={value} />\n  </>\n);`}</code></pre>
            </div>
            <div className="rctps-lift-children">
              <div className="rctps-lift-child">
                <div className="rctps-lift-label">Input child</div>
                <input className="rctps-input" value={liftedVal} onChange={e => setLiftedVal(e.target.value)} placeholder="Type here…" />
              </div>
              <div className="rctps-lift-child">
                <div className="rctps-lift-label">Display child</div>
                <div className="rctps-lift-display">{liftedVal || <span style={{ color: '#7d8590' }}>…waiting for input</span>}</div>
              </div>
            </div>
          </div>
          <div className="rctps-lift-rule">State flows <strong>down</strong> via props · Events bubble <strong>up</strong> via callbacks</div>
        </div>
      )}
    </div>
  );
};

export default RctPropsStateVisualization;
