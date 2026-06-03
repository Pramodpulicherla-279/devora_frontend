import React, { useState, useEffect, useRef } from 'react';
import './visual.css';

const ROWS = 5000;
const SAMPLE_ROWS = Array.from({ length: 10 }, (_, i) => ({ id: i * 500 + 500, name: `User ${i * 500 + 500}`, email: `user${i * 500 + 500}@x.com` }));

const INDEX_TYPES = [
  { name: 'B-Tree Index', color: '#4EA5D9', use: 'Default. Equality (=) and range (<, >, BETWEEN) queries. Most common.', example: `CREATE INDEX idx_email ON users(email);` },
  { name: 'Unique Index', color: '#68A063', use: 'Enforces uniqueness + speeds up lookups. Created automatically with UNIQUE constraint.', example: `CREATE UNIQUE INDEX idx_unique_email ON users(email);` },
  { name: 'Composite Index', color: '#E5C07B', use: 'Multiple columns. Best when queries filter on several columns together. Order matters.', example: `CREATE INDEX idx_dept_salary ON employees(dept, salary);` },
  { name: 'Partial Index', color: '#C678DD', use: 'Only indexes rows matching a condition. Smaller, faster for filtered queries.', example: `CREATE INDEX idx_active_users ON users(email) WHERE is_active = true;` },
];

const SqlIndexesPerformanceVisualization = () => {
  const [hasIndex, setHasIndex] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(-1);
  const [scanDone, setScanDone] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scanRef = useRef(null);

  const startScan = () => {
    setScanStep(-1); setScanDone(false); setScanning(true);
    const total = hasIndex ? 3 : SAMPLE_ROWS.length;
    let i = 0;
    clearInterval(scanRef.current);
    scanRef.current = setInterval(() => {
      setScanStep(i);
      i++;
      if (i > total) { clearInterval(scanRef.current); setScanning(false); setScanDone(true); }
    }, hasIndex ? 250 : 120);
  };

  useEffect(() => () => clearInterval(scanRef.current), []);

  const scanTime = hasIndex ? '~0.1ms (index lookup)' : `~${SAMPLE_ROWS.length * 12}ms (full scan)`;

  return (
    <div className="sqlip-wrap">
      <header className="sqlip-head">
        <span className="sqlip-badge">SQL</span>
        <h2>Indexes &amp; Performance</h2>
        <p>Speed up queries by telling the DB where to look</p>
      </header>

      <div className="sqlip-grid">
        {/* Scan Simulator */}
        <div className="sqlip-panel">
          <h3>Sequential Scan vs Index Scan</h3>
          <div className="sqlip-toggle-row">
            <span className={!hasIndex ? 'sqlip-active-label' : ''}>No Index</span>
            <button className={`sqlip-toggle ${hasIndex ? 'sqlip-toggle--on' : ''}`}
              onClick={() => { setHasIndex(h => !h); setScanStep(-1); setScanDone(false); }}>
              <span className="sqlip-toggle-knob" />
            </button>
            <span className={hasIndex ? 'sqlip-active-label' : ''}>With Index</span>
          </div>

          <div className="sqlip-rows-grid">
            {SAMPLE_ROWS.map((row, i) => (
              <div key={row.id}
                className={`sqlip-row-chip ${!hasIndex && scanStep >= i ? 'sqlip-row-chip--scanned' : ''} ${hasIndex && i < 3 && scanStep >= i ? 'sqlip-row-chip--found' : ''} ${!hasIndex && scanStep === i ? 'sqlip-row-chip--current' : ''}`}>
                {row.id}
              </div>
            ))}
            <div className="sqlip-row-dots">…{ROWS - SAMPLE_ROWS.length} more rows</div>
          </div>

          <button className="sqlip-scan-btn" onClick={startScan} disabled={scanning}>
            {scanning ? 'Scanning…' : `▶ Run: WHERE id = 4500`}
          </button>
          {scanDone && (
            <div className={`sqlip-result ${hasIndex ? 'sqlip-result--fast' : 'sqlip-result--slow'}`}>
              {hasIndex ? '✓ Found via index' : `✗ Scanned ${SAMPLE_ROWS.length} rows`} — {scanTime}
            </div>
          )}

          <pre className="sqlip-code"><code>{`SELECT * FROM users WHERE id = 4500;\n\n${hasIndex ? '-- Uses index: sqlip-idx_id\n-- EXPLAIN: Index Scan, cost=0.29' : '-- No index\n-- EXPLAIN: Seq Scan, cost=0.00..89.00\n-- Reads every row until found'}`}</code></pre>
        </div>

        {/* Index Types */}
        <div className="sqlip-panel">
          <h3>Index Types</h3>
          <div className="sqlip-idx-tabs">
            {INDEX_TYPES.map((t, i) => (
              <button key={t.name} className={`sqlip-idx-tab ${activeIndex === i ? 'sqlip-idx-tab--on' : ''}`}
                style={{ '--ic': t.color }} onClick={() => setActiveIndex(i)}>
                {t.name}
              </button>
            ))}
          </div>
          <div className="sqlip-idx-detail" style={{ borderColor: INDEX_TYPES[activeIndex].color }}>
            <p className="sqlip-idx-use">{INDEX_TYPES[activeIndex].use}</p>
            <pre className="sqlip-code"><code>{INDEX_TYPES[activeIndex].example}</code></pre>
          </div>

          <div className="sqlip-explain">
            <h3>EXPLAIN ANALYZE</h3>
            <p className="sqlip-explain-desc">Always use EXPLAIN ANALYZE to see how the DB executes your query.</p>
            <pre className="sqlip-code"><code>{`EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'ali@x.com';

-- Output:
-- Index Scan using idx_email on users
--   (cost=0.29..8.31 rows=1 width=48)
--   (actual time=0.042..0.043 rows=1 loops=1)
-- Planning Time: 0.1 ms
-- Execution Time: 0.1 ms`}</code></pre>
          </div>

          <div className="sqlip-rules">
            <h3>Index Rules of Thumb</h3>
            {['Index columns used in WHERE, JOIN ON, ORDER BY', 'Don\'t index every column — writes slow down', 'Composite index: put most selective column first', 'Check slow query logs to find what needs indexing'].map((r, i) => (
              <div key={i} className="sqlip-rule"><span className="sqlip-rule-num">{i + 1}</span>{r}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SqlIndexesPerformanceVisualization;
