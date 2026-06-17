import { useState } from 'react';
import './visual.css';

const MODIFIERS = [
  { key: 'public', access: ['instance', 'subclass', 'outside'], desc: 'Accessible everywhere (the default).' },
  { key: 'protected', access: ['instance', 'subclass'], desc: 'Accessible in the class and its subclasses — not outside.' },
  { key: 'private', access: ['instance'], desc: 'Accessible only inside the declaring class.' },
  { key: 'readonly', access: ['instance', 'subclass', 'outside'], desc: 'Can be read anywhere but only set once (in the constructor).' },
];

const SCOPES = ['instance', 'subclass', 'outside'];

export default function TsClassesVisualization() {
  const [sel, setSel] = useState(0);
  const m = MODIFIERS[sel];

  return (
    <div className="tsclass-wrap">
      <h3 className="tsclass-title">Classes in TypeScript</h3>
      <p className="tsclass-sub">Access modifiers control who can touch each member</p>

      <pre className="tsclass-code">{`class Animal {
  public name: string;
  protected species: string;
  private id: number;
  readonly legs: number;

  constructor(name: string, legs: number) {
    this.name = name;     // shorthand: constructor(public name)
    this.legs = legs;
  }
}

class Dog extends Animal { /* sees protected, not private */ }`}</pre>

      <div className="tsclass-mods">
        {MODIFIERS.map((mod, i) => (
          <button key={i} className={`tsclass-mod ${sel === i ? 'tsclass-mod-active' : ''}`} onClick={() => setSel(i)}>{mod.key}</button>
        ))}
      </div>

      <div className="tsclass-access">
        {SCOPES.map(s => {
          const ok = m.access.includes(s);
          return (
            <div key={s} className={`tsclass-scope ${ok ? 'tsclass-scope-ok' : 'tsclass-scope-no'}`}>
              <span className="tsclass-scope-icon">{ok ? '✓' : '✗'}</span>
              <span className="tsclass-scope-label">{s === 'instance' ? 'Same class' : s === 'subclass' ? 'Subclass' : 'Outside code'}</span>
            </div>
          );
        })}
      </div>

      <div className="tsclass-desc"><strong>{m.key}:</strong> {m.desc}</div>
    </div>
  );
}
