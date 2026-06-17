import { useState } from 'react';
import './visual.css';

const PROPS = [
  { name: 'id', type: 'number', valid: '42', invalid: '"42" ❌ string' },
  { name: 'name', type: 'string', valid: '"Ada"', invalid: '99 ❌ number' },
  { name: 'active', type: 'boolean', valid: 'true', invalid: '"yes" ❌ string' },
  { name: 'roles', type: 'string[]', valid: '["admin"]', invalid: '"admin" ❌ not array' },
];

export default function TsTypesInterfacesVisualization() {
  const [kind, setKind] = useState('interface');
  const [sel, setSel] = useState(0);
  const p = PROPS[sel];

  const code = kind === 'interface'
    ? `interface User {
  id: number;
  name: string;
  active: boolean;
  roles: string[];
}

// interfaces can be extended & merged
interface User { lastLogin?: Date; }`
    : `type User = {
  id: number;
  name: string;
  active: boolean;
  roles: string[];
};

// types can use unions & intersections
type Result = User | null;`;

  return (
    <div className="tstype-wrap">
      <h3 className="tstype-title">Types & Interfaces</h3>
      <p className="tstype-sub">Two ways to describe the shape of an object</p>

      <div className="tstype-toggle">
        <button className={`tstype-tog ${kind === 'interface' ? 'tstype-tog-active' : ''}`} onClick={() => setKind('interface')}>interface</button>
        <button className={`tstype-tog ${kind === 'type' ? 'tstype-tog-active' : ''}`} onClick={() => setKind('type')}>type</button>
      </div>

      <pre className="tstype-code">{code}</pre>

      <div className="tstype-props">
        {PROPS.map((prop, i) => (
          <button key={i} className={`tstype-prop ${sel === i ? 'tstype-prop-active' : ''}`} onClick={() => setSel(i)}>
            <span className="tstype-prop-name">{prop.name}</span>
            <span className="tstype-prop-type">{prop.type}</span>
          </button>
        ))}
      </div>

      <div className="tstype-detail">
        <div className="tstype-detail-row tstype-ok"><span>✓ valid</span> {p.valid}</div>
        <div className="tstype-detail-row tstype-no"><span>✗ invalid</span> {p.invalid}</div>
      </div>

      <div className="tstype-diff">
        <strong>Key difference:</strong> {kind === 'interface'
          ? 'interfaces can be re-opened and merged — great for public APIs.'
          : 'types can express unions, intersections & primitives — more flexible.'}
      </div>
    </div>
  );
}
