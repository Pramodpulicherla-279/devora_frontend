import React, { useState } from 'react';
import './visual.css';

const INITIAL_DOCS = [
  { _id: 1, name: 'Alice', age: 28, role: 'admin' },
  { _id: 2, name: 'Bob', age: 34, role: 'user' },
  { _id: 3, name: 'Carol', age: 22, role: 'user' },
];

const OPS = [
  { id: 'create', label: 'Create', color: '#00ED64', method: 'insertOne()', icon: '➕' },
  { id: 'read', label: 'Read', color: '#61AFEF', method: 'find()', icon: '🔍' },
  { id: 'update', label: 'Update', color: '#E5C07B', method: 'updateOne()', icon: '✏️' },
  { id: 'delete', label: 'Delete', color: '#E06C75', method: 'deleteOne()', icon: '🗑️' },
];

const MdbCrudOpsVisualization = () => {
  const [docs, setDocs] = useState(INITIAL_DOCS);
  const [activeOp, setActiveOp] = useState('create');
  const [flash, setFlash] = useState(null);
  // form fields
  const [newName, setNewName] = useState('Dan');
  const [newAge, setNewAge] = useState('41');
  const [updateId, setUpdateId] = useState('1');
  const [updateAge, setUpdateAge] = useState('29');
  const [deleteId, setDeleteId] = useState('3');

  const op = OPS.find(o => o.id === activeOp);

  const doCreate = () => {
    const _id = Math.max(0, ...docs.map(d => d._id)) + 1;
    setDocs(prev => [...prev, { _id, name: newName, age: Number(newAge), role: 'user' }]);
    setFlash({ type: 'create', id: _id });
    setTimeout(() => setFlash(null), 1500);
  };
  const doUpdate = () => {
    setDocs(prev => prev.map(d => d._id === Number(updateId) ? { ...d, age: Number(updateAge) } : d));
    setFlash({ type: 'update', id: Number(updateId) });
    setTimeout(() => setFlash(null), 1500);
  };
  const doDelete = () => {
    setFlash({ type: 'delete', id: Number(deleteId) });
    setTimeout(() => { setDocs(prev => prev.filter(d => d._id !== Number(deleteId))); setFlash(null); }, 700);
  };
  const reset = () => { setDocs(INITIAL_DOCS); setFlash(null); };

  const codeFor = {
    create: `db.users.insertOne({\n  name: "${newName}",\n  age: ${newAge},\n  role: "user"\n});`,
    read: `// Find all\ndb.users.find();\n\n// Find with filter\ndb.users.find({ role: "user" });\n\n// Find one\ndb.users.findOne({ name: "Alice" });`,
    update: `db.users.updateOne(\n  { _id: ${updateId} },        // filter\n  { $set: { age: ${updateAge} } }   // update\n);`,
    delete: `db.users.deleteOne({ _id: ${deleteId} });\n\n// Delete many\ndb.users.deleteMany({ role: "user" });`,
  };

  return (
    <div className="mdbcrud-wrap">
      <header className="mdbcrud-head">
        <span className="mdbcrud-badge">MongoDB</span>
        <h2>CRUD — The Four Core Operations</h2>
        <p>Create · Read · Update · Delete — 90% of what every app does</p>
      </header>

      <div className="mdbcrud-ops">
        {OPS.map(o => (
          <button key={o.id} className={`mdbcrud-op-btn ${activeOp === o.id ? 'mdbcrud-op-btn--on' : ''}`}
            style={{ '--oc': o.color }} onClick={() => setActiveOp(o.id)}>
            <span className="mdbcrud-op-icon">{o.icon}</span>
            <span className="mdbcrud-op-label">{o.label}</span>
            <code className="mdbcrud-op-method">{o.method}</code>
          </button>
        ))}
      </div>

      <div className="mdbcrud-grid">
        {/* Controls */}
        <div className="mdbcrud-panel">
          <h3>{op.icon} {op.label}</h3>
          {activeOp === 'create' && (
            <div className="mdbcrud-form">
              <label>name <input className="mdbcrud-input" value={newName} onChange={e => setNewName(e.target.value)} /></label>
              <label>age <input className="mdbcrud-input" type="number" value={newAge} onChange={e => setNewAge(e.target.value)} /></label>
              <button className="mdbcrud-run" style={{ background: op.color }} onClick={doCreate}>Run insertOne() ▶</button>
            </div>
          )}
          {activeOp === 'read' && (
            <div className="mdbcrud-form">
              <p className="mdbcrud-read-note">Reading is non-destructive. The query below returns matching documents from the collection on the right.</p>
            </div>
          )}
          {activeOp === 'update' && (
            <div className="mdbcrud-form">
              <label>_id to update <input className="mdbcrud-input" type="number" value={updateId} onChange={e => setUpdateId(e.target.value)} /></label>
              <label>new age <input className="mdbcrud-input" type="number" value={updateAge} onChange={e => setUpdateAge(e.target.value)} /></label>
              <button className="mdbcrud-run" style={{ background: op.color, color: '#0d1117' }} onClick={doUpdate}>Run updateOne() ▶</button>
            </div>
          )}
          {activeOp === 'delete' && (
            <div className="mdbcrud-form">
              <label>_id to delete <input className="mdbcrud-input" type="number" value={deleteId} onChange={e => setDeleteId(e.target.value)} /></label>
              <button className="mdbcrud-run" style={{ background: op.color }} onClick={doDelete}>Run deleteOne() ▶</button>
            </div>
          )}
          <pre className="mdbcrud-code"><code>{codeFor[activeOp]}</code></pre>
        </div>

        {/* Live collection */}
        <div className="mdbcrud-panel">
          <div className="mdbcrud-coll-head">
            <h3>Collection: users</h3>
            <button className="mdbcrud-reset" onClick={reset}>↺ Reset</button>
          </div>
          <div className="mdbcrud-docs">
            {docs.map(d => (
              <pre key={d._id} className={`mdbcrud-doc
                ${flash?.type === 'create' && flash.id === d._id ? 'mdbcrud-doc--create' : ''}
                ${flash?.type === 'update' && flash.id === d._id ? 'mdbcrud-doc--update' : ''}
                ${flash?.type === 'delete' && flash.id === d._id ? 'mdbcrud-doc--delete' : ''}
              `}><code>{`{ _id: ${d._id}, name: "${d.name}", age: ${d.age}, role: "${d.role}" }`}</code></pre>
            ))}
            {docs.length === 0 && <div className="mdbcrud-empty">Collection is empty</div>}
          </div>
          <p className="mdbcrud-count">{docs.length} document{docs.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
    </div>
  );
};

export default MdbCrudOpsVisualization;
