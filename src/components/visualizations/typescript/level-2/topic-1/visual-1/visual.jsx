import { useState } from 'react';
import './visual.css';

const TYPES = ['string', 'number', 'boolean', 'User'];
const SAMPLE = { string: '"hello"', number: '42', boolean: 'true', User: '{ id: 1 }' };

export default function TsGenericsVisualization() {
  const [t, setT] = useState('string');

  return (
    <div className="tsgen-wrap">
      <h3 className="tsgen-title">Generics</h3>
      <p className="tsgen-sub">Write once, work with any type — without losing type safety</p>

      <pre className="tsgen-code">{`function identity<T>(arg: T): T {
  return arg;
}`}</pre>

      <div className="tsgen-picker">
        <span className="tsgen-picker-label">Call with T =</span>
        {TYPES.map(ty => (
          <button key={ty} className={`tsgen-type ${t === ty ? 'tsgen-type-active' : ''}`} onClick={() => setT(ty)}>{ty}</button>
        ))}
      </div>

      <div className="tsgen-flow">
        <div className="tsgen-node tsgen-in">
          <div className="tsgen-node-label">input</div>
          <code>{SAMPLE[t]}</code>
          <div className="tsgen-node-type">{t}</div>
        </div>
        <div className="tsgen-fn">
          identity&lt;<span className="tsgen-t">{t}</span>&gt;
        </div>
        <div className="tsgen-node tsgen-out">
          <div className="tsgen-node-label">output</div>
          <code>{SAMPLE[t]}</code>
          <div className="tsgen-node-type">{t}</div>
        </div>
      </div>

      <div className="tsgen-second">
        <div className="tsgen-second-h">Real-world: a typed API wrapper</div>
        <pre className="tsgen-code">{`interface ApiResponse<T> {
  data: T;
  status: number;
}

const res: ApiResponse<${t}> = await getJson('/api');
res.data;  // typed as ${t}`}</pre>
      </div>
    </div>
  );
}
