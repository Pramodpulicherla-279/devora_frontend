import React, { useState } from 'react';
import './visual.css';

const FLOW = [
  { id: 'schema', label: 'Schema', icon: '📐', color: '#00ED64', desc: 'Defines the SHAPE of documents — fields, types, defaults, rules.', code: `const userSchema = new mongoose.Schema({\n  name:  { type: String, required: true },\n  email: { type: String, unique: true },\n  age:   { type: Number, min: 0 },\n  role:  { type: String, default: "user" },\n  createdAt: { type: Date, default: Date.now }\n});` },
  { id: 'model', label: 'Model', icon: '🏭', color: '#61AFEF', desc: 'Compiled from a schema. The interface you use to query the collection.', code: `// Creates the "users" collection\nconst User = mongoose.model("User", userSchema);\n\n// Model = your gateway to the DB` },
  { id: 'document', label: 'Document', icon: '📄', color: '#E5C07B', desc: 'An instance of a model — one actual record you can save.', code: `const alice = new User({\n  name: "Alice",\n  email: "alice@x.com",\n  age: 28\n});\n\nawait alice.save();  // → inserted into MongoDB` },
];

const SCHEMA_TYPES = [
  { type: 'String', opts: 'required, unique, lowercase, trim, enum, match', color: '#98C379' },
  { type: 'Number', opts: 'required, min, max, default', color: '#E5C07B' },
  { type: 'Boolean', opts: 'required, default', color: '#56B6C2' },
  { type: 'Date', opts: 'default: Date.now', color: '#E06C75' },
  { type: 'ObjectId', opts: 'ref (for population)', color: '#00ED64' },
  { type: 'Array', opts: '[String], [subSchema]', color: '#C678DD' },
];

const MdbSchemasModelsVisualization = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [tab, setTab] = useState('flow');

  return (
    <div className="mdbsm-wrap">
      <header className="mdbsm-head">
        <span className="mdbsm-badge">Mongoose</span>
        <h2>Schemas &amp; Models</h2>
        <p>Mongoose adds structure to MongoDB — Schema → Model → Document</p>
      </header>

      <div className="mdbsm-tabs">
        {[['flow', '🔄 Schema → Model → Doc'], ['types', '🧬 Schema Types']].map(([key, label]) => (
          <button key={key} className={`mdbsm-tab ${tab === key ? 'mdbsm-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {tab === 'flow' && (
        <div className="mdbsm-flow-panel">
          <div className="mdbsm-flow-steps">
            {FLOW.map((f, i) => (
              <React.Fragment key={f.id}>
                {i > 0 && <div className="mdbsm-flow-arrow">→</div>}
                <button className={`mdbsm-flow-node ${activeStep === i ? 'mdbsm-flow-node--on' : ''}`}
                  style={{ '--fc': f.color }} onClick={() => setActiveStep(i)}>
                  <span className="mdbsm-flow-icon">{f.icon}</span>
                  <span className="mdbsm-flow-label">{f.label}</span>
                </button>
              </React.Fragment>
            ))}
          </div>
          <div className="mdbsm-flow-detail" style={{ borderColor: FLOW[activeStep].color }}>
            <p className="mdbsm-flow-desc">{FLOW[activeStep].desc}</p>
            <pre className="mdbsm-code"><code>{FLOW[activeStep].code}</code></pre>
          </div>
        </div>
      )}

      {tab === 'types' && (
        <div className="mdbsm-types-panel">
          <p className="mdbsm-desc">Each schema field has a type and optional validators / options.</p>
          <div className="mdbsm-types-grid">
            {SCHEMA_TYPES.map(t => (
              <div key={t.type} className="mdbsm-type-card" style={{ borderColor: t.color }}>
                <span className="mdbsm-type-name" style={{ color: t.color }}>{t.type}</span>
                <span className="mdbsm-type-opts">{t.opts}</span>
              </div>
            ))}
          </div>
          <pre className="mdbsm-code"><code>{`const productSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  price:    { type: Number, min: 0, required: true },
  inStock:  { type: Boolean, default: true },
  tags:     [String],
  category: { type: String, enum: ["tech", "office"] },
  ownerId:  { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });  // auto createdAt + updatedAt`}</code></pre>
        </div>
      )}
    </div>
  );
};

export default MdbSchemasModelsVisualization;
