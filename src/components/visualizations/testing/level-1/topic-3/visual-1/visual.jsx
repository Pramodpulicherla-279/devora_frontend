import { useState } from 'react';
import './visual.css';

const SECTIONS = [
  { key: 'arrange', label: 'Arrange', color: '#58a6ff', desc: 'Set up test data, inputs, and dependencies.', code: 'const cart = new Cart();\ncart.add({ price: 10 });' },
  { key: 'act', label: 'Act', color: '#f0883e', desc: 'Call the one thing under test.', code: 'const total = cart.checkout();' },
  { key: 'assert', label: 'Assert', color: '#56d364', desc: 'Verify the result matches expectations.', code: 'expect(total).toBe(10);' },
];

export default function TstAaaPatternVisualization() {
  const [sel, setSel] = useState('arrange');
  const [showBad, setShowBad] = useState(false);
  const s = SECTIONS.find(x => x.key === sel);

  return (
    <div className="tstaaa-wrap">
      <h3 className="tstaaa-title">Test Structure: Arrange-Act-Assert</h3>
      <p className="tstaaa-sub">Three clear phases keep every test readable</p>

      <div className="tstaaa-phases">
        {SECTIONS.map(sec => (
          <button key={sec.key} className={`tstaaa-phase ${sel === sec.key ? 'tstaaa-phase-active' : ''}`}
            style={{ borderColor: sec.color, background: sel === sec.key ? sec.color + '20' : '#161b22', color: sel === sec.key ? sec.color : '#8b949e' }}
            onClick={() => setSel(sec.key)}>{sec.label}</button>
        ))}
      </div>

      <div className="tstaaa-detail" style={{ borderLeftColor: s.color }}>
        <div className="tstaaa-detail-desc">{s.desc}</div>
        <pre className="tstaaa-code">{s.code}</pre>
      </div>

      <div className="tstaaa-toggle">
        <button className={`tstaaa-tog ${showBad ? 'tstaaa-tog-bad' : 'tstaaa-tog-good'}`} onClick={() => setShowBad(b => !b)}>
          {showBad ? 'Show good AAA test' : 'Show messy test'}
        </button>
      </div>

      <pre className={`tstaaa-full ${showBad ? 'tstaaa-full-bad' : ''}`}>{showBad
        ? `test('cart', () => {
  const cart = new Cart(); cart.add({price:10});
  expect(cart.checkout()).toBe(10); cart.add({price:5});
  expect(cart.checkout()).toBe(15);  // tangled
});`
        : `test('checkout sums item prices', () => {
  // Arrange
  const cart = new Cart();
  cart.add({ price: 10 });
  // Act
  const total = cart.checkout();
  // Assert
  expect(total).toBe(10);
});`}</pre>
    </div>
  );
}
