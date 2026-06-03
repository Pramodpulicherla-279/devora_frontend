import React, { useState } from 'react';
import './visual.css';

const OOP_PILLARS = [
  { id: 'encapsulation', icon: '🔒', label: 'Encapsulation', color: '#68A063', desc: 'Bundle data and methods together. Hide internal details, expose only what\'s needed.', code: `class BankAccount {\n  #balance = 0; // private field\n\n  deposit(amount) {\n    if (amount > 0) this.#balance += amount;\n  }\n\n  getBalance() {\n    return this.#balance; // controlled access\n  }\n}` },
  { id: 'inheritance', icon: '🧬', label: 'Inheritance', color: '#61AFEF', desc: 'Child class extends parent, inheriting its properties and methods. Promotes code reuse.', code: `class Animal {\n  constructor(name) { this.name = name; }\n  speak() { return \`\${this.name} makes a sound\`; }\n}\n\nclass Dog extends Animal {\n  speak() { return \`\${this.name} barks!\`; }\n}\n\nconst d = new Dog('Rex');\nd.speak(); // "Rex barks!"` },
  { id: 'polymorphism', icon: '🎭', label: 'Polymorphism', color: '#C678DD', desc: 'Same method name, different behavior per class. One interface, many implementations.', code: `class Shape {\n  area() { return 0; }\n}\nclass Circle extends Shape {\n  constructor(r) { super(); this.r = r; }\n  area() { return Math.PI * this.r ** 2; }\n}\nclass Square extends Shape {\n  constructor(s) { super(); this.s = s; }\n  area() { return this.s ** 2; }\n}` },
  { id: 'abstraction', icon: '🎯', label: 'Abstraction', color: '#E5C07B', desc: 'Hide complexity, show only what matters. Users work with simple interfaces, not internal logic.', code: `class EmailService {\n  // Users don't care HOW email is sent\n  send(to, subject, body) {\n    this.#connectSMTP();\n    this.#authenticate();\n    this.#deliverMessage(to, subject, body);\n  }\n  #connectSMTP() { /* hidden */ }\n  #authenticate() { /* hidden */ }\n}` },
];

const CLASS_ANATOMY = [
  { part: 'class keyword', color: '#C678DD', code: 'class' },
  { part: 'Class name (PascalCase)', color: '#68A063', code: 'User' },
  { part: 'constructor()', color: '#E5C07B', code: 'constructor(name, email)' },
  { part: 'Instance properties', color: '#61AFEF', code: 'this.name = name;' },
  { part: 'Instance method', color: '#E06C75', code: 'greet() { return `Hi, ${this.name}!`; }' },
  { part: 'Static method', color: '#68A063', code: 'static create(data) { return new User(data); }' },
];

const BkndJsOopVisualization = () => {
  const [activePillar, setActivePillar] = useState('encapsulation');
  const [activePart, setActivePart] = useState(null);

  const pillar = OOP_PILLARS.find(p => p.id === activePillar);

  return (
    <div className="bnoo-wrap">
      <header className="bnoo-head">
        <span className="bnoo-badge">JS OOP</span>
        <h2>Object-Oriented Programming</h2>
        <p>Classes · Inheritance · Encapsulation · Polymorphism</p>
      </header>

      <div className="bnoo-grid">
        {/* 4 Pillars */}
        <div className="bnoo-panel">
          <h3>The 4 Pillars</h3>
          <div className="bnoo-pillars">
            {OOP_PILLARS.map(p => (
              <button key={p.id} className={`bnoo-pillar-btn ${activePillar === p.id ? 'bnoo-pillar-btn--on' : ''}`}
                style={{ '--pc': p.color }} onClick={() => setActivePillar(p.id)}>
                <span className="bnoo-pillar-icon">{p.icon}</span>
                <span className="bnoo-pillar-label">{p.label}</span>
              </button>
            ))}
          </div>
          <div className="bnoo-pillar-detail" style={{ borderColor: pillar.color }}>
            <p className="bnoo-pillar-desc">{pillar.desc}</p>
            <pre className="bnoo-code"><code>{pillar.code}</code></pre>
          </div>
        </div>

        {/* Class Anatomy */}
        <div className="bnoo-panel">
          <h3>Class Anatomy — click each part</h3>
          <pre className="bnoo-anatomy-code">
            {CLASS_ANATOMY.map((part, i) => (
              <div key={i} className={`bnoo-anat-line ${activePart === i ? 'bnoo-anat-line--on' : ''}`}
                style={{ '--ac': part.color }}
                onClick={() => setActivePart(activePart === i ? null : i)}>
                <code>{part.code}</code>
              </div>
            ))}
          </pre>
          {activePart !== null && (
            <div className="bnoo-anat-detail" style={{ borderColor: CLASS_ANATOMY[activePart].color }}>
              <span style={{ color: CLASS_ANATOMY[activePart].color }}>
                {CLASS_ANATOMY[activePart].part}
              </span>
            </div>
          )}
          <pre className="bnoo-code"><code>{`// Full class example\nclass User {\n  #email; // private\n\n  constructor(name, email) {\n    this.name = name;\n    this.#email = email;\n  }\n\n  greet() {\n    return \`Hi, I'm \${this.name}\`;\n  }\n\n  static create(data) {\n    return new User(data.name, data.email);\n  }\n}\n\nconst u = new User('Ali', 'ali@x.com');\nu.greet(); // "Hi, I'm Ali"\n// u.#email → SyntaxError (private!)`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default BkndJsOopVisualization;
