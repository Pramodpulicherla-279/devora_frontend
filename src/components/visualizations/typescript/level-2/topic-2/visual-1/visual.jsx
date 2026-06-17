import { useState } from 'react';
import './visual.css';

const BASE = ['id: number', 'name: string', 'email: string', 'password: string', 'role: string'];

const UTILS = {
  'Partial<User>': { transform: BASE.map(f => f.replace(': ', '?: ')), note: 'All properties become optional.' },
  'Required<User>': { transform: BASE, note: 'All properties become required (removes ?).' },
  'Readonly<User>': { transform: BASE.map(f => 'readonly ' + f), note: 'All properties become immutable.' },
  "Pick<User,'id'|'name'>": { transform: ['id: number', 'name: string'], note: 'Keep only the listed keys.' },
  "Omit<User,'password'>": { transform: BASE.filter(f => !f.startsWith('password')), note: 'Remove the listed keys.' },
  'Record<string,User>': { transform: ['[key: string]: User'], note: 'A map of string keys to User values.' },
};

export default function TsUtilityTypesVisualization() {
  const [util, setUtil] = useState('Partial<User>');
  const u = UTILS[util];

  return (
    <div className="tsutil-wrap">
      <h3 className="tsutil-title">Utility Types Deep Dive</h3>
      <p className="tsutil-sub">Transform existing types without rewriting them</p>

      <div className="tsutil-base">
        <div className="tsutil-base-h">Source type</div>
        <pre className="tsutil-code">{`interface User {\n${BASE.map(f => '  ' + f + ';').join('\n')}\n}`}</pre>
      </div>

      <div className="tsutil-buttons">
        {Object.keys(UTILS).map(k => (
          <button key={k} className={`tsutil-btn ${util === k ? 'tsutil-btn-active' : ''}`} onClick={() => setUtil(k)}>{k}</button>
        ))}
      </div>

      <div className="tsutil-result">
        <div className="tsutil-result-h">{util}</div>
        <pre className="tsutil-code tsutil-code-result">{`{\n${u.transform.map(f => '  ' + f + ';').join('\n')}\n}`}</pre>
      </div>

      <div className="tsutil-note">{u.note}</div>
    </div>
  );
}
