import { useState } from 'react';
import './visual.css';

const CLASS_DEF = {
  name: 'Dog',
  attrs: [
    { name: 'name', type: 'str' },
    { name: 'breed', type: 'str' },
    { name: 'age', type: 'int' },
  ],
  methods: ['__init__(name, breed, age)', 'bark() → str', 'is_puppy() → bool'],
};

const PRESETS = [
  { name: 'Rex', breed: 'Labrador', age: 3 },
  { name: 'Milo', breed: 'Poodle', age: 1 },
  { name: 'Max', breed: 'Bulldog', age: 7 },
];

let instanceCounter = 0;

export default function PyMathOopVisualization() {
  const [instances, setInstances] = useState([]);
  const [preset, setPreset] = useState(0);

  const createInstance = () => {
    const p = PRESETS[preset % PRESETS.length];
    instanceCounter++;
    setInstances(prev => [...prev, { ...p, id: instanceCounter }]);
    setPreset(p => p + 1);
  };

  const remove = (id) => setInstances(prev => prev.filter(i => i.id !== id));

  return (
    <div className="pymoop-root">
      <h3 className="pymoop-title">OOP: Class &amp; Instances</h3>
      <div className="pymoop-body">
        <div className="pymoop-blueprint">
          <div className="pymoop-bp-head">
            <span className="pymoop-kw">class</span>
            <span className="pymoop-classname"> {CLASS_DEF.name}</span>
            <span className="pymoop-kw">:</span>
          </div>
          <div className="pymoop-section">
            <div className="pymoop-section-label">Attributes</div>
            {CLASS_DEF.attrs.map(a => (
              <div key={a.name} className="pymoop-attr">
                <span className="pymoop-attr-name">self.{a.name}</span>
                <span className="pymoop-attr-type">: {a.type}</span>
              </div>
            ))}
          </div>
          <div className="pymoop-section">
            <div className="pymoop-section-label">Methods</div>
            {CLASS_DEF.methods.map(m => (
              <div key={m} className="pymoop-method"><span className="pymoop-kw">def</span> {m}</div>
            ))}
          </div>
          <button className="pymoop-create-btn" onClick={createInstance}>
            + Create instance
          </button>
        </div>
        <div className="pymoop-instances">
          <div className="pymoop-inst-label">Instances in memory</div>
          {instances.length === 0 && <p className="pymoop-hint">No instances yet — click Create</p>}
          {instances.map(inst => (
            <div key={inst.id} className="pymoop-instance">
              <div className="pymoop-inst-head">
                <span className="pymoop-inst-type">{CLASS_DEF.name}</span>
                <span className="pymoop-inst-id">#{inst.id}</span>
                <button className="pymoop-del-btn" onClick={() => remove(inst.id)}>✕</button>
              </div>
              <div className="pymoop-inst-attrs">
                {CLASS_DEF.attrs.map(a => (
                  <div key={a.name} className="pymoop-inst-attr">
                    <span className="pymoop-inst-key">{a.name}</span>
                    <span className="pymoop-inst-val">{a.type === 'str' ? `"${inst[a.name]}"` : inst[a.name]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
