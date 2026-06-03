import React, { useState } from 'react';
import './visual.css';

const INITIAL_ROWS = [
  { id: 1, name: 'Alice', email: 'alice@x.com', age: 28 },
  { id: 2, name: 'Bob', email: 'bob@x.com', age: 34 },
  { id: 3, name: 'Carol', email: 'carol@x.com', age: 22 },
];

const DATA_TYPES = [
  { type: 'INT', color: '#4EA5D9', use: 'Whole numbers', example: 'id INT PRIMARY KEY' },
  { type: 'VARCHAR(n)', color: '#68A063', use: 'Variable-length text', example: 'name VARCHAR(100)' },
  { type: 'TEXT', color: '#68A063', use: 'Unlimited text', example: 'bio TEXT' },
  { type: 'BOOLEAN', color: '#E5C07B', use: 'true / false', example: 'is_active BOOLEAN DEFAULT true' },
  { type: 'DATE', color: '#C678DD', use: 'Calendar date', example: 'created_at DATE' },
  { type: 'DECIMAL(p,s)', color: '#E06C75', use: 'Exact decimals (money)', example: 'price DECIMAL(10, 2)' },
  { type: 'TIMESTAMP', color: '#56B6C2', use: 'Date + time', example: 'updated_at TIMESTAMP' },
];

const CREATE_TABLE_CODE = `CREATE TABLE users (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  age        INT CHECK (age >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const SqlWritingDataVisualization = () => {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [activeOp, setActiveOp] = useState('insert');
  const [newName, setNewName] = useState('Dan');
  const [newEmail, setNewEmail] = useState('dan@x.com');
  const [newAge, setNewAge] = useState('41');
  const [updateId, setUpdateId] = useState('1');
  const [updateAge, setUpdateAge] = useState('29');
  const [deleteId, setDeleteId] = useState('3');
  const [activeType, setActiveType] = useState(0);
  const [flash, setFlash] = useState(null);

  const doInsert = () => {
    const id = Math.max(...rows.map(r => r.id)) + 1;
    setRows(prev => [...prev, { id, name: newName, email: newEmail, age: Number(newAge) }]);
    setFlash({ type: 'insert', id });
    setTimeout(() => setFlash(null), 1500);
  };
  const doUpdate = () => {
    setRows(prev => prev.map(r => r.id === Number(updateId) ? { ...r, age: Number(updateAge) } : r));
    setFlash({ type: 'update', id: Number(updateId) });
    setTimeout(() => setFlash(null), 1500);
  };
  const doDelete = () => {
    setRows(prev => prev.filter(r => r.id !== Number(deleteId)));
    setFlash({ type: 'delete', id: Number(deleteId) });
    setTimeout(() => setFlash(null), 1500);
  };
  const reset = () => setRows(INITIAL_ROWS);

  const opColor = { insert: '#68A063', update: '#E5C07B', delete: '#E06C75', create: '#4EA5D9' };

  return (
    <div className="sqlwd-wrap">
      <header className="sqlwd-head">
        <span className="sqlwd-badge">SQL</span>
        <h2>Writing Data</h2>
        <p>INSERT · UPDATE · DELETE · CREATE TABLE · Data Types</p>
      </header>

      <div className="sqlwd-ops">
        {['insert', 'update', 'delete', 'create'].map(op => (
          <button key={op} className={`sqlwd-op-btn ${activeOp === op ? 'sqlwd-op-btn--on' : ''}`}
            style={{ '--oc': opColor[op] }} onClick={() => setActiveOp(op)}>
            {op.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="sqlwd-grid">
        {/* Left: control panel */}
        <div className="sqlwd-panel">
          {activeOp === 'insert' && (
            <div className="sqlwd-controls">
              <h3>INSERT a new row</h3>
              <label>name <input className="sqlwd-input" value={newName} onChange={e => setNewName(e.target.value)} /></label>
              <label>email <input className="sqlwd-input" value={newEmail} onChange={e => setNewEmail(e.target.value)} /></label>
              <label>age <input className="sqlwd-input" type="number" value={newAge} onChange={e => setNewAge(e.target.value)} /></label>
              <pre className="sqlwd-code"><code>{`INSERT INTO users (name, email, age)\nVALUES ('${newName}', '${newEmail}', ${newAge});`}</code></pre>
              <button className="sqlwd-run-btn" style={{ background: opColor.insert }} onClick={doInsert}>Run INSERT ▶</button>
            </div>
          )}
          {activeOp === 'update' && (
            <div className="sqlwd-controls">
              <h3>UPDATE an existing row</h3>
              <label>User ID <input className="sqlwd-input" type="number" value={updateId} onChange={e => setUpdateId(e.target.value)} /></label>
              <label>New age <input className="sqlwd-input" type="number" value={updateAge} onChange={e => setUpdateAge(e.target.value)} /></label>
              <pre className="sqlwd-code"><code>{`UPDATE users\nSET    age = ${updateAge}\nWHERE  id = ${updateId};`}</code></pre>
              <button className="sqlwd-run-btn" style={{ background: opColor.update }} onClick={doUpdate}>Run UPDATE ▶</button>
            </div>
          )}
          {activeOp === 'delete' && (
            <div className="sqlwd-controls">
              <h3>DELETE a row</h3>
              <label>User ID to delete <input className="sqlwd-input" type="number" value={deleteId} onChange={e => setDeleteId(e.target.value)} /></label>
              <pre className="sqlwd-code"><code>{`DELETE FROM users\nWHERE id = ${deleteId};\n\n-- ⚠️ Always use WHERE!\n-- DELETE without WHERE deletes ALL rows`}</code></pre>
              <button className="sqlwd-run-btn" style={{ background: opColor.delete }} onClick={doDelete}>Run DELETE ▶</button>
            </div>
          )}
          {activeOp === 'create' && (
            <div className="sqlwd-controls">
              <h3>Data Types</h3>
              <div className="sqlwd-type-list">
                {DATA_TYPES.map((t, i) => (
                  <button key={t.type} className={`sqlwd-type-btn ${activeType === i ? 'sqlwd-type-btn--on' : ''}`}
                    style={{ '--tc': t.color }} onClick={() => setActiveType(i)}>
                    <code>{t.type}</code><span>{t.use}</span>
                  </button>
                ))}
              </div>
              <div className="sqlwd-type-detail" style={{ borderColor: DATA_TYPES[activeType].color }}>
                <code className="sqlwd-type-ex">{DATA_TYPES[activeType].example}</code>
              </div>
              <pre className="sqlwd-code"><code>{CREATE_TABLE_CODE}</code></pre>
            </div>
          )}
        </div>

        {/* Right: live table */}
        <div className="sqlwd-panel">
          <div className="sqlwd-table-head">
            <h3>Live Table: users</h3>
            <button className="sqlwd-reset" onClick={reset}>↺ Reset</button>
          </div>
          <div className="sqlwd-table-wrap">
            <table className="sqlwd-table">
              <thead><tr>{['id','name','email','age'].map(c => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.id}
                    className={`${flash?.type === 'insert' && flash.id === r.id ? 'sqlwd-tr--insert' : ''} ${flash?.type === 'update' && flash.id === r.id ? 'sqlwd-tr--update' : ''} ${flash?.type === 'delete' && flash.id === r.id ? 'sqlwd-tr--delete' : ''}`}>
                    <td>{r.id}</td><td>{r.name}</td><td>{r.email}</td><td>{r.age}</td>
                  </tr>
                ))}
                {rows.length === 0 && <tr><td colSpan={4} className="sqlwd-empty">Table is empty</td></tr>}
              </tbody>
            </table>
          </div>
          <p className="sqlwd-row-count">{rows.length} row{rows.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
    </div>
  );
};

export default SqlWritingDataVisualization;
