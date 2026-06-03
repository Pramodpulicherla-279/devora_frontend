import React, { useState } from 'react';
import './visual.css';

const MdbPopulationLeanVisualization = () => {
  const [populated, setPopulated] = useState(false);
  const [lean, setLean] = useState(false);
  const [tab, setTab] = useState('populate');

  const rawDoc = `{
  _id: ObjectId("a1"),
  product: "Laptop",
  userId: ObjectId("u1")   // ← just a reference
}`;

  const populatedDoc = `{
  _id: ObjectId("a1"),
  product: "Laptop",
  userId: {                // ← full document!
    _id: ObjectId("u1"),
    name: "Alice",
    email: "alice@x.com"
  }
}`;

  return (
    <div className="mdbpop-wrap">
      <header className="mdbpop-head">
        <span className="mdbpop-badge">Mongoose</span>
        <h2>Population &amp; Lean Queries</h2>
        <p>Join referenced documents, and speed up reads when you don't need full models</p>
      </header>

      <div className="mdbpop-tabs">
        {[['populate', '🔗 .populate()'], ['lean', '⚡ .lean()']].map(([key, label]) => (
          <button key={key} className={`mdbpop-tab ${tab === key ? 'mdbpop-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* Populate */}
      {tab === 'populate' && (
        <div className="mdbpop-populate">
          <p className="mdbpop-desc"><code>.populate()</code> replaces a referenced ObjectId with the actual document it points to — Mongoose's version of a JOIN.</p>
          <div className="mdbpop-toggle-row">
            <span className={!populated ? 'mdbpop-active' : ''}>Reference only</span>
            <button className={`mdbpop-toggle ${populated ? 'mdbpop-toggle--on' : ''}`} onClick={() => setPopulated(p => !p)}>
              <span className="mdbpop-knob" />
            </button>
            <span className={populated ? 'mdbpop-active' : ''}>.populate("userId")</span>
          </div>

          <div className="mdbpop-grid">
            <div className="mdbpop-panel">
              <h3>orders document</h3>
              <pre className="mdbpop-code" style={{ borderColor: populated ? '#00ED64' : '#30363d' }}>
                <code>{populated ? populatedDoc : rawDoc}</code>
              </pre>
            </div>
            <div className="mdbpop-panel">
              <h3>Query</h3>
              <pre className="mdbpop-code"><code>{populated
                ? `await Order\n  .findById("a1")\n  .populate("userId");\n\n// userId is now the full User doc`
                : `await Order.findById("a1");\n\n// userId is just an ObjectId\n// You'd need a 2nd query to get the user`}</code></pre>
              <div className="mdbpop-note">
                {populated
                  ? '✓ One query gives you the order AND its user.'
                  : 'Without populate, userId stays an ObjectId reference.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lean */}
      {tab === 'lean' && (
        <div className="mdbpop-lean">
          <p className="mdbpop-desc"><code>.lean()</code> returns plain JavaScript objects instead of full Mongoose documents — much faster &amp; lighter when you only need to read data.</p>
          <div className="mdbpop-toggle-row">
            <span className={!lean ? 'mdbpop-active' : ''}>Mongoose Document</span>
            <button className={`mdbpop-toggle ${lean ? 'mdbpop-toggle--on' : ''}`} onClick={() => setLean(l => !l)}>
              <span className="mdbpop-knob" />
            </button>
            <span className={lean ? 'mdbpop-active' : ''}>.lean()</span>
          </div>

          <div className="mdbpop-grid">
            <div className="mdbpop-panel">
              <h3>What you get back</h3>
              {lean ? (
                <div className="mdbpop-lean-card mdbpop-lean-card--plain">
                  <div className="mdbpop-lean-title">Plain JS Object</div>
                  <ul>
                    <li>✓ Just data — no overhead</li>
                    <li>✗ No .save() method</li>
                    <li>✗ No virtuals / getters</li>
                    <li>⚡ Up to 5× faster reads</li>
                  </ul>
                </div>
              ) : (
                <div className="mdbpop-lean-card mdbpop-lean-card--full">
                  <div className="mdbpop-lean-title">Mongoose Document</div>
                  <ul>
                    <li>✓ Has .save(), .remove()</li>
                    <li>✓ Virtuals, getters, setters</li>
                    <li>✓ Change tracking</li>
                    <li>🐢 Heavier — more memory</li>
                  </ul>
                </div>
              )}
            </div>
            <div className="mdbpop-panel">
              <h3>Query</h3>
              <pre className="mdbpop-code"><code>{lean
                ? `const users = await User\n  .find()\n  .lean();\n\n// Returns plain objects\n// Perfect for read-only API responses`
                : `const users = await User.find();\n\n// Returns full Mongoose docs\n// Use when you'll modify & .save()`}</code></pre>
              <div className="mdbpop-when">
                <strong>Rule:</strong> Use <code>.lean()</code> for read-only queries (lists, API GET). Skip it when you need to modify &amp; save the document.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MdbPopulationLeanVisualization;
