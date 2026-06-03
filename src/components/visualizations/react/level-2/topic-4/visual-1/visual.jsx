import React, { useState, useEffect } from 'react';
import './visual.css';

const CUSTOM_HOOKS = {
  useFetch: {
    label: 'useFetch',
    color: '#61DAFB',
    icon: '🌐',
    desc: 'Encapsulates fetch logic (loading, data, error states) into a reusable hook.',
    before: `// ❌ Repeated in every component that fetches
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch('/api/users')
    .then(r => r.json())
    .then(setData)
    .catch(setError)
    .finally(() => setLoading(false));
}, []);`,
    after: `// ✓ Custom hook — reuse anywhere
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Any component uses it in ONE line:
const { data, loading, error } = useFetch('/api/users');`,
  },
  useLocalStorage: {
    label: 'useLocalStorage',
    color: '#68A063',
    icon: '💾',
    desc: 'Syncs state with localStorage automatically — persists across page reloads.',
    before: `// ❌ Manual localStorage everywhere
const [theme, setTheme] = useState(
  localStorage.getItem('theme') || 'light'
);

useEffect(() => {
  localStorage.setItem('theme', theme);
}, [theme]);`,
    after: `// ✓ Reusable hook
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? initial;
    } catch { return initial; }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage:
const [theme, setTheme] = useLocalStorage('theme', 'light');`,
  },
  useToggle: {
    label: 'useToggle',
    color: '#E5C07B',
    icon: '🔀',
    desc: 'Simplifies boolean toggling — no need for inline toggle functions.',
    before: `// ❌ Repeated toggle pattern everywhere
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(prev => !prev);

const [isLoading, setIsLoading] = useState(false);
const toggleLoading = () => setIsLoading(p => !p);`,
    after: `// ✓ One clean reusable hook
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(
    () => setValue(v => !v),
    []
  );
  return [value, toggle];
}

// Usage anywhere:
const [isOpen, toggleOpen] = useToggle(false);
const [isVisible, toggleVisible] = useToggle(true);`,
  },
};

const RULES = [
  { rule: 'Only call hooks at the top level', detail: 'Never inside loops, conditions, or nested functions', color: '#E06C75' },
  { rule: 'Only call hooks in React functions', detail: 'Function components or other custom hooks — not regular JS functions', color: '#E5C07B' },
  { rule: 'Name must start with "use"', detail: 'React relies on this convention to enforce the rules above', color: '#61DAFB' },
  { rule: 'Can call other hooks inside', detail: 'Custom hooks can use any built-in or custom hooks', color: '#68A063' },
];

const RctCustomHooksVisualization = () => {
  const [activeHook, setActiveHook] = useState('useFetch');
  const [view, setView] = useState('after');
  const [tab, setTab] = useState('hooks');

  const hook = CUSTOM_HOOKS[activeHook];

  return (
    <div className="rctch-wrap">
      <header className="rctch-head">
        <span className="rctch-badge">React</span>
        <h2>Custom Hooks</h2>
        <p>Extract repeated logic into reusable hooks — the React way to share behaviour</p>
      </header>

      <div className="rctch-tabs">
        {[['hooks', '🪝 Custom Hooks'], ['rules', '📏 Rules of Hooks']].map(([key, label]) => (
          <button key={key} className={`rctch-tab ${tab === key ? 'rctch-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {tab === 'hooks' && (
        <div className="rctch-hooks">
          <div className="rctch-hook-selector">
            {Object.entries(CUSTOM_HOOKS).map(([key, { label, color, icon }]) => (
              <button key={key} className={`rctch-hook-btn ${activeHook === key ? 'rctch-hook-btn--on' : ''}`}
                style={{ '--hc': color }} onClick={() => setActiveHook(key)}>
                <span>{icon}</span><code>{label}</code>
              </button>
            ))}
          </div>

          <p className="rctch-hook-desc">{hook.desc}</p>

          <div className="rctch-code-toggle">
            <button className={`rctch-toggle-btn ${view === 'before' ? 'rctch-toggle-btn--on' : ''}`}
              onClick={() => setView('before')}>❌ Before (repeated)</button>
            <button className={`rctch-toggle-btn rctch-toggle-btn--after ${view === 'after' ? 'rctch-toggle-btn--on' : ''}`}
              onClick={() => setView('after')}>✓ After (custom hook)</button>
          </div>

          <pre className="rctch-code" style={{ borderColor: view === 'after' ? hook.color : '#E06C75' }}>
            <code>{view === 'before' ? hook.before : hook.after}</code>
          </pre>

          <div className="rctch-benefit">
            <span className="rctch-benefit-icon">✨</span>
            <div>
              <strong>The power of custom hooks:</strong> One hook can encapsulate complex logic with multiple useState + useEffect calls. Any component that needs it gets it in a single line.
            </div>
          </div>
        </div>
      )}

      {tab === 'rules' && (
        <div className="rctch-rules">
          <p className="rctch-desc">React's two rules of hooks — break them and you get unpredictable bugs.</p>
          <div className="rctch-rules-list">
            {RULES.map((r, i) => (
              <div key={i} className="rctch-rule-card" style={{ borderColor: r.color }}>
                <div className="rctch-rule-num" style={{ background: r.color }}>{i + 1}</div>
                <div>
                  <strong style={{ color: r.color }}>{r.rule}</strong>
                  <p>{r.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <pre className="rctch-code"><code>{`// ❌ Never inside a condition
if (someCondition) {
  const [x, setX] = useState(0); // WRONG!
}

// ❌ Never inside a loop
items.forEach(() => {
  useEffect(() => {}, []); // WRONG!
});

// ✓ Always at the top level
const [x, setX] = useState(0);
useEffect(() => {}, []);`}</code></pre>
        </div>
      )}
    </div>
  );
};

export default RctCustomHooksVisualization;
