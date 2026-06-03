import React, { useState, useEffect } from 'react';
import './visual.css';

const ACID = [
  { id: 'atomicity', letter: 'A', label: 'Atomicity', color: '#4EA5D9', desc: 'All operations in a transaction succeed, or NONE of them do. No partial updates.', example: 'Bank transfer: debit $100 AND credit $100. If credit fails, debit is rolled back.' },
  { id: 'consistency', letter: 'C', label: 'Consistency', color: '#68A063', desc: 'A transaction brings the database from one valid state to another. Rules are never violated.', example: 'Account balance can never go below 0. Any transaction that would break this is rejected.' },
  { id: 'isolation', letter: 'I', label: 'Isolation', color: '#C678DD', desc: 'Concurrent transactions don\'t interfere with each other. Each runs as if it\'s the only one.', example: 'Two users booking the last seat: isolation prevents double-booking.' },
  { id: 'durability', letter: 'D', label: 'Durability', color: '#E5C07B', desc: 'Once committed, a transaction is permanent. Even a crash won\'t lose it.', example: 'After your payment commits, a server crash doesn\'t undo the payment.' },
];

const TX_FLOW = ['BEGIN', 'UPDATE accounts SET balance = balance - 100 WHERE id = 1;', 'UPDATE accounts SET balance = balance + 100 WHERE id = 2;', 'COMMIT  -- or ROLLBACK'];

const ISOLATION_LEVELS = [
  { level: 'READ UNCOMMITTED', color: '#E06C75', problems: ['Dirty reads', 'Non-repeatable reads', 'Phantom reads'], performance: 'Fastest' },
  { level: 'READ COMMITTED', color: '#E5C07B', problems: ['Non-repeatable reads', 'Phantom reads'], performance: 'Fast' },
  { level: 'REPEATABLE READ', color: '#68A063', problems: ['Phantom reads'], performance: 'Moderate' },
  { level: 'SERIALIZABLE', color: '#4EA5D9', problems: [], performance: 'Slowest' },
];

const SqlTransactionsVisualization = () => {
  const [activeAcid, setActiveAcid] = useState('atomicity');
  const [txStep, setTxStep] = useState(-1);
  const [committed, setCommitted] = useState(null);
  const [isolationIdx, setIsolationIdx] = useState(1);
  const [tab, setTab] = useState('acid');

  const acid = ACID.find(a => a.id === activeAcid);

  const runTx = (outcome) => {
    setTxStep(0); setCommitted(null);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTxStep(i);
      if (i >= TX_FLOW.length - 1) {
        clearInterval(id);
        setCommitted(outcome);
      }
    }, 600);
  };

  return (
    <div className="sqltx-wrap">
      <header className="sqltx-head">
        <span className="sqltx-badge">SQL</span>
        <h2>Transactions</h2>
        <p>ACID · BEGIN · COMMIT · ROLLBACK · Isolation Levels</p>
      </header>

      <div className="sqltx-tabs">
        {[['acid', '🔬 ACID Properties'], ['flow', '🔄 TX Flow'], ['isolation', '🔒 Isolation Levels']].map(([key, label]) => (
          <button key={key} className={`sqltx-tab ${tab === key ? 'sqltx-tab--on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {/* ACID */}
      {tab === 'acid' && (
        <div className="sqltx-acid">
          <div className="sqltx-acid-pills">
            {ACID.map(a => (
              <button key={a.id} className={`sqltx-acid-pill ${activeAcid === a.id ? 'sqltx-acid-pill--on' : ''}`}
                style={{ '--ac': a.color }} onClick={() => setActiveAcid(a.id)}>
                <span className="sqltx-letter" style={{ background: a.color }}>{a.letter}</span>
                <span>{a.label}</span>
              </button>
            ))}
          </div>
          <div className="sqltx-acid-detail" style={{ borderColor: acid.color }}>
            <p className="sqltx-acid-desc">{acid.desc}</p>
            <div className="sqltx-acid-example">
              <span className="sqltx-example-label">Example</span>
              <p>{acid.example}</p>
            </div>
          </div>
          <pre className="sqltx-code"><code>{`-- All 4 operations are ONE atomic transaction
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;  -- both succeed, or neither does`}</code></pre>
        </div>
      )}

      {/* TX Flow */}
      {tab === 'flow' && (
        <div className="sqltx-flow">
          <p className="sqltx-flow-desc">A transaction wraps multiple SQL statements into a single unit of work.</p>
          <div className="sqltx-flow-steps">
            {TX_FLOW.map((s, i) => (
              <div key={i} className={`sqltx-flow-step ${txStep >= i ? 'sqltx-flow-step--on' : ''} ${i === TX_FLOW.length - 1 && committed ? (committed === 'commit' ? 'sqltx-flow-step--commit' : 'sqltx-flow-step--rollback') : ''}`}>
                <div className="sqltx-flow-dot" />
                <code className="sqltx-flow-sql">{s}</code>
              </div>
            ))}
          </div>
          {committed && (
            <div className={`sqltx-outcome ${committed === 'commit' ? 'sqltx-outcome--commit' : 'sqltx-outcome--rollback'}`}>
              {committed === 'commit' ? '✓ COMMIT — all changes saved permanently' : '✗ ROLLBACK — all changes undone'}
            </div>
          )}
          <div className="sqltx-flow-btns">
            <button className="sqltx-btn sqltx-btn--commit" onClick={() => runTx('commit')} disabled={txStep >= 0 && !committed}>Run → COMMIT</button>
            <button className="sqltx-btn sqltx-btn--rollback" onClick={() => runTx('rollback')} disabled={txStep >= 0 && !committed}>Run → ROLLBACK</button>
            <button className="sqltx-btn sqltx-btn--reset" onClick={() => { setTxStep(-1); setCommitted(null); }}>Reset</button>
          </div>
          <pre className="sqltx-code"><code>{`-- SAVEPOINT for partial rollback
BEGIN;
  INSERT INTO orders VALUES (...);
  SAVEPOINT after_insert;
  UPDATE inventory SET qty = qty - 1;
  -- If inventory fails:
  ROLLBACK TO SAVEPOINT after_insert;
COMMIT;`}</code></pre>
        </div>
      )}

      {/* Isolation Levels */}
      {tab === 'isolation' && (
        <div className="sqltx-isolation">
          <p className="sqltx-flow-desc">Isolation levels control how transactions see each other's changes. Higher isolation = fewer anomalies, but slower.</p>
          <div className="sqltx-iso-tabs">
            {ISOLATION_LEVELS.map((l, i) => (
              <button key={l.level} className={`sqltx-iso-tab ${isolationIdx === i ? 'sqltx-iso-tab--on' : ''}`}
                style={{ '--ic': l.color }} onClick={() => setIsolationIdx(i)}>{l.level}</button>
            ))}
          </div>
          <div className="sqltx-iso-detail" style={{ borderColor: ISOLATION_LEVELS[isolationIdx].color }}>
            <div className="sqltx-iso-row">
              <span>Performance</span>
              <span style={{ color: ISOLATION_LEVELS[isolationIdx].color }}>{ISOLATION_LEVELS[isolationIdx].performance}</span>
            </div>
            <div className="sqltx-iso-row">
              <span>Remaining problems</span>
              <span>{ISOLATION_LEVELS[isolationIdx].problems.length === 0 ? <span style={{ color: '#68A063' }}>None ✓</span> : ISOLATION_LEVELS[isolationIdx].problems.join(', ')}</span>
            </div>
          </div>
          <pre className="sqltx-code"><code>{`SET TRANSACTION ISOLATION LEVEL ${ISOLATION_LEVELS[isolationIdx].level};\nBEGIN;\n  -- your queries here\nCOMMIT;`}</code></pre>
          <div className="sqltx-anomalies">
            <h3>Common Anomalies Explained</h3>
            {[['Dirty Read', 'Reading uncommitted data from another transaction that might roll back'],
              ['Non-Repeatable Read', 'Re-reading a row gets different data because another TX committed a change'],
              ['Phantom Read', 'Re-running a query returns different rows because another TX inserted/deleted']
            ].map(([name, desc]) => (
              <div key={name} className="sqltx-anomaly"><code>{name}</code><span>{desc}</span></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SqlTransactionsVisualization;
