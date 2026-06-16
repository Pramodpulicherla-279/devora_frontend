import { useState } from 'react';
import './visual.css';

const branches = [
  {
    id: 'if', label: 'if (score >= 90)', color: '#56d364', x: 160, y: 80,
    code: 'if score >= 90:\n    grade = "A"',
    result: 'grade = "A"',
  },
  {
    id: 'elif1', label: 'elif (score >= 75)', color: '#58a6ff', x: 310, y: 160,
    code: 'elif score >= 75:\n    grade = "B"',
    result: 'grade = "B"',
  },
  {
    id: 'elif2', label: 'elif (score >= 60)', color: '#f97316', x: 310, y: 230,
    code: 'elif score >= 60:\n    grade = "C"',
    result: 'grade = "C"',
  },
  {
    id: 'else', label: 'else', color: '#6b7785', x: 310, y: 300,
    code: 'else:\n    grade = "F"',
    result: 'grade = "F"',
  },
];

export default function PyMathConditionalsVisualization() {
  const [active, setActive] = useState(null);
  const sel = branches.find(b => b.id === active);

  return (
    <div className="pymcond-root">
      <h3 className="pymcond-title">if / elif / else Flow</h3>
      <p className="pymcond-sub">Click a branch to see the code</p>
      <div className="pymcond-body">
        <svg className="pymcond-svg" viewBox="0 0 480 380">
          {/* condition box */}
          <rect x="30" y="20" width="160" height="50" rx="8" fill="#161b22" stroke="#30363d" strokeWidth="1.5"/>
          <text x="110" y="48" textAnchor="middle" fill="#e6edf3" fontSize="13">score = ?</text>
          {/* connector line down */}
          <line x1="110" y1="70" x2="110" y2="95" stroke="#30363d" strokeWidth="1.5"/>
          {/* if diamond */}
          <polygon points="110,95 160,130 110,165 60,130" fill="#0d1117" stroke="#56d364" strokeWidth="1.5"
            style={{ cursor: 'pointer', opacity: active === 'if' ? 1 : 0.7 }}
            onClick={() => setActive(active === 'if' ? null : 'if')}/>
          <text x="110" y="134" textAnchor="middle" fill="#56d364" fontSize="11">≥ 90?</text>
          {/* True arrow right */}
          <line x1="160" y1="130" x2="230" y2="130" stroke="#56d364" strokeWidth="1.5" markerEnd="url(#arr-g)"/>
          <rect x="230" y="113" width="80" height="34" rx="6" fill="#0d1117" stroke="#56d364" strokeWidth="1"
            style={{ cursor: 'pointer' }} onClick={() => setActive(active === 'if' ? null : 'if')}/>
          <text x="270" y="134" textAnchor="middle" fill="#56d364" fontSize="11">grade="A"</text>
          <text x="185" y="123" fill="#56d364" fontSize="10">True</text>
          {/* False arrow down */}
          <line x1="110" y1="165" x2="110" y2="195" stroke="#30363d" strokeWidth="1.5"/>
          <text x="118" y="183" fill="#6b7785" fontSize="10">False</text>
          {/* elif1 diamond */}
          <polygon points="110,195 160,230 110,265 60,230" fill="#0d1117" stroke="#58a6ff" strokeWidth="1.5"
            style={{ cursor: 'pointer', opacity: active === 'elif1' ? 1 : 0.7 }}
            onClick={() => setActive(active === 'elif1' ? null : 'elif1')}/>
          <text x="110" y="234" textAnchor="middle" fill="#58a6ff" fontSize="11">≥ 75?</text>
          <line x1="160" y1="230" x2="230" y2="230" stroke="#58a6ff" strokeWidth="1.5"/>
          <rect x="230" y="213" width="80" height="34" rx="6" fill="#0d1117" stroke="#58a6ff" strokeWidth="1"
            style={{ cursor: 'pointer' }} onClick={() => setActive(active === 'elif1' ? null : 'elif1')}/>
          <text x="270" y="234" textAnchor="middle" fill="#58a6ff" fontSize="11">grade="B"</text>
          <line x1="110" y1="265" x2="110" y2="290" stroke="#30363d" strokeWidth="1.5"/>
          {/* elif2 diamond */}
          <polygon points="110,290 160,320 110,350 60,320" fill="#0d1117" stroke="#f97316" strokeWidth="1.5"
            style={{ cursor: 'pointer', opacity: active === 'elif2' ? 1 : 0.7 }}
            onClick={() => setActive(active === 'elif2' ? null : 'elif2')}/>
          <text x="110" y="324" textAnchor="middle" fill="#f97316" fontSize="11">≥ 60?</text>
          <line x1="160" y1="320" x2="230" y2="320" stroke="#f97316" strokeWidth="1.5"/>
          <rect x="230" y="303" width="80" height="34" rx="6" fill="#0d1117" stroke="#f97316" strokeWidth="1"
            style={{ cursor: 'pointer' }} onClick={() => setActive(active === 'elif2' ? null : 'elif2')}/>
          <text x="270" y="324" textAnchor="middle" fill="#f97316" fontSize="11">grade="C"</text>
          {/* else */}
          <line x1="60" y1="350" x2="60" y2="365" stroke="#30363d" strokeWidth="1.5"/>
          <line x1="60" y1="365" x2="230" y2="365" stroke="#6b7785" strokeWidth="1.5"/>
          <rect x="230" y="352" width="80" height="28" rx="6" fill="#0d1117" stroke="#6b7785" strokeWidth="1"
            style={{ cursor: 'pointer' }} onClick={() => setActive(active === 'else' ? null : 'else')}/>
          <text x="270" y="370" textAnchor="middle" fill="#6b7785" fontSize="11">grade="F"</text>
          <defs>
            <marker id="arr-g" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#56d364"/>
            </marker>
          </defs>
        </svg>
        <div className="pymcond-info">
          {sel ? (
            <>
              <pre className="pymcond-code" style={{ borderColor: sel.color }}>{sel.code}</pre>
              <div className="pymcond-result" style={{ color: sel.color }}>→ {sel.result}</div>
            </>
          ) : (
            <p className="pymcond-hint">← Click a diamond or result box</p>
          )}
        </div>
      </div>
    </div>
  );
}
