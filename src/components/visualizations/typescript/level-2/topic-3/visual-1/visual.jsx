import { useState } from 'react';
import './visual.css';

const DECORATORS = [
  { key: 'class', label: '@Entity (class)', sig: '(target: Function)', receives: 'The constructor function', use: 'Register or modify the whole class.' },
  { key: 'method', label: '@Log (method)', sig: '(target, key, descriptor)', receives: 'The method descriptor', use: 'Wrap a method — logging, timing, caching.' },
  { key: 'property', label: '@Column (property)', sig: '(target, key)', receives: 'The property name', use: 'Add metadata to a field (ORM columns).' },
];

export default function TsDecoratorsVisualization() {
  const [sel, setSel] = useState('method');
  const d = DECORATORS.find(x => x.key === sel);
  const [wrapped, setWrapped] = useState(false);

  return (
    <div className="tsdec-wrap">
      <h3 className="tsdec-title">Decorators</h3>
      <p className="tsdec-sub">Functions that annotate and modify classes and their members</p>

      <pre className="tsdec-code">{`@Entity
class User {
  @Column
  name: string;

  @Log
  save() { /* ... */ }
}`}</pre>

      <div className="tsdec-types">
        {DECORATORS.map(dec => (
          <button key={dec.key} className={`tsdec-type ${sel === dec.key ? 'tsdec-type-active' : ''}`}
            onClick={() => { setSel(dec.key); setWrapped(false); }}>{dec.label}</button>
        ))}
      </div>

      <div className="tsdec-detail">
        <div className="tsdec-row"><span className="tsdec-k">Signature</span><code className="tsdec-v">{d.sig}</code></div>
        <div className="tsdec-row"><span className="tsdec-k">Receives</span><span className="tsdec-v">{d.receives}</span></div>
        <div className="tsdec-row"><span className="tsdec-k">Use for</span><span className="tsdec-v">{d.use}</span></div>
      </div>

      <div className="tsdec-wrapviz">
        <div className="tsdec-wrap-h">
          <span>The "wrap" concept</span>
          <button className="tsdec-wrap-btn" onClick={() => setWrapped(w => !w)}>{wrapped ? 'Unwrap' : 'Apply decorator'}</button>
        </div>
        <div className="tsdec-onion">
          {wrapped && <div className="tsdec-layer tsdec-layer-outer">@Log wrapper (runs before/after)</div>}
          <div className="tsdec-layer tsdec-layer-inner">original save() method</div>
        </div>
      </div>
    </div>
  );
}
