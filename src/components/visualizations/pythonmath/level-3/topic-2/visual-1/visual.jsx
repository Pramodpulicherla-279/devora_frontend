import { useState } from 'react';
import './visual.css';

const tree = {
  name: 'BaseException',
  color: '#6b7785',
  children: [
    {
      name: 'Exception',
      color: '#a3adbb',
      children: [
        {
          name: 'ValueError',
          color: '#f97316',
          code: `try:\n    int("abc")\nexcept ValueError as e:\n    print(f"Bad value: {e}")`,
          tip: 'Raised when a function receives the right type but wrong value.',
        },
        {
          name: 'TypeError',
          color: '#58a6ff',
          code: `try:\n    "hello" + 5\nexcept TypeError as e:\n    print(f"Type error: {e}")`,
          tip: 'Raised when an operation is applied to the wrong type.',
        },
        {
          name: 'KeyError',
          color: '#a78bfa',
          code: `try:\n    d = {"a": 1}\n    d["b"]\nexcept KeyError as e:\n    print(f"Key {e} not found")`,
          tip: 'Raised when a dict key is missing.',
        },
        {
          name: 'IndexError',
          color: '#56d364',
          code: `try:\n    lst = [1, 2, 3]\n    lst[10]\nexcept IndexError as e:\n    print(f"Index: {e}")`,
          tip: 'Raised when a list index is out of range.',
        },
        {
          name: 'FileNotFoundError',
          color: '#f85149',
          code: `try:\n    open("missing.txt")\nexcept FileNotFoundError:\n    print("File does not exist")`,
          tip: 'Subclass of OSError. Very common in file I/O.',
        },
      ],
    },
    {
      name: 'SystemExit',
      color: '#6b7785',
      code: `import sys\ntry:\n    sys.exit(0)\nexcept SystemExit:\n    pass  # usually let it propagate`,
      tip: 'Raised by sys.exit(). Not a subclass of Exception!',
    },
  ],
};

function TreeNode({ node, onSelect, selected }) {
  const [open, setOpen] = useState(true);
  const isLeaf = !node.children || node.children.length === 0;

  return (
    <div className="pymerror-node">
      <div className={`pymerror-name ${selected === node.name ? 'pymerror-name--sel' : ''}`}
        style={{ '--nc': node.color }}
        onClick={() => { onSelect(node); if (!isLeaf) setOpen(o => !o); }}>
        {!isLeaf && <span className="pymerror-toggle">{open ? '▾' : '▸'}</span>}
        {isLeaf && <span className="pymerror-leaf">◆</span>}
        {node.name}
      </div>
      {open && node.children && (
        <div className="pymerror-children">
          {node.children.map(c => (
            <TreeNode key={c.name} node={c} onSelect={onSelect} selected={selected} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PyMathErrorVisualization() {
  const [sel, setSel] = useState(null);

  return (
    <div className="pymerror-root">
      <h3 className="pymerror-title">Exception Hierarchy</h3>
      <div className="pymerror-body">
        <div className="pymerror-tree">
          <TreeNode node={tree} onSelect={setSel} selected={sel?.name} />
        </div>
        <div className="pymerror-detail">
          {sel?.code ? (
            <>
              <div className="pymerror-sel-name" style={{ color: sel.color }}>{sel.name}</div>
              <p className="pymerror-tip">{sel.tip}</p>
              <pre className="pymerror-code" style={{ borderColor: sel.color }}>{sel.code}</pre>
            </>
          ) : (
            <p className="pymerror-hint">← Click an exception class</p>
          )}
        </div>
      </div>
    </div>
  );
}
