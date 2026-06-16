import { useState } from 'react';
import './visual.css';

const LIST_ITEMS = [10, 20, 30, 40, 50];
const TUPLE_ITEMS = ['x', 'y', 'z'];

const listOps = [
  { label: '.append(60)', fn: items => [...items, 60] },
  { label: '.pop()', fn: items => items.slice(0, -1) },
  { label: 'del [1]', fn: items => items.filter((_, i) => i !== 1) },
  { label: 'reset', fn: () => LIST_ITEMS },
];

export default function PyMathListsVisualization() {
  const [listItems, setListItems] = useState(LIST_ITEMS);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [tupleIdx, setTupleIdx] = useState(null);
  const [mutMsg, setMutMsg] = useState(null);

  const handleOp = (op) => {
    setListItems(op.fn(listItems));
    setSelectedIdx(null);
  };

  const handleTupleClick = (i) => {
    setTupleIdx(i);
    setMutMsg('TypeError: tuple does not support item assignment');
    setTimeout(() => setMutMsg(null), 2000);
  };

  return (
    <div className="pymlists-root">
      <h3 className="pymlists-title">Lists vs Tuples</h3>
      <div className="pymlists-cols">
        <div className="pymlists-panel">
          <div className="pymlists-panel-head" style={{ color: '#56d364' }}>list — mutable</div>
          <div className="pymlists-items">
            {listItems.map((v, i) => (
              <div key={i} className={`pymlists-cell pymlists-cell--list ${selectedIdx === i ? 'pymlists-cell--sel' : ''}`}
                onClick={() => setSelectedIdx(selectedIdx === i ? null : i)}>
                <span className="pymlists-idx">[{i}]</span>
                <span className="pymlists-val">{v}</span>
              </div>
            ))}
          </div>
          {selectedIdx !== null && (
            <div className="pymlists-info">Index {selectedIdx} → value <code>{listItems[selectedIdx]}</code></div>
          )}
          <div className="pymlists-ops">
            {listOps.map(op => (
              <button key={op.label} className="pymlists-op-btn" onClick={() => handleOp(op)}>{op.label}</button>
            ))}
          </div>
        </div>
        <div className="pymlists-panel">
          <div className="pymlists-panel-head" style={{ color: '#f97316' }}>tuple — immutable</div>
          <div className="pymlists-items">
            {TUPLE_ITEMS.map((v, i) => (
              <div key={i} className={`pymlists-cell pymlists-cell--tuple ${tupleIdx === i ? 'pymlists-cell--sel' : ''}`}
                onClick={() => handleTupleClick(i)}>
                <span className="pymlists-idx">[{i}]</span>
                <span className="pymlists-val">'{v}'</span>
              </div>
            ))}
          </div>
          {mutMsg && <div className="pymlists-error">{mutMsg}</div>}
          <div className="pymlists-hint">Click any cell to attempt mutation →</div>
          <div className="pymlists-ops">
            <div className="pymlists-op-note">len(): {TUPLE_ITEMS.length}</div>
            <div className="pymlists-op-note">t[0]: '{TUPLE_ITEMS[0]}'</div>
            <div className="pymlists-op-note">t[-1]: '{TUPLE_ITEMS[TUPLE_ITEMS.length-1]}'</div>
          </div>
        </div>
      </div>
    </div>
  );
}
