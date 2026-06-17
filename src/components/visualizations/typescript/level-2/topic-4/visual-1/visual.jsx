import { useState } from 'react';
import './visual.css';

const OPTIONS = [
  { key: 'target', value: '"ES2022"', desc: 'Which JS version to compile down to.' },
  { key: 'module', value: '"ESNext"', desc: 'Module system for the output (ESM/CommonJS).' },
  { key: 'strict', value: 'true', desc: 'Enables all strict type-checking flags at once.', strict: true },
  { key: 'esModuleInterop', value: 'true', desc: 'Smooth interop between CommonJS and ES modules.' },
  { key: 'outDir', value: '"./dist"', desc: 'Where compiled .js files are written.' },
  { key: 'rootDir', value: '"./src"', desc: 'Root of your input .ts files.' },
  { key: 'include', value: '["src"]', desc: 'Globs of files to compile.' },
  { key: 'exclude', value: '["node_modules"]', desc: 'Globs to skip.' },
];

const STRICT_FLAGS = ['strictNullChecks', 'noImplicitAny', 'strictFunctionTypes', 'strictBindCallApply', 'alwaysStrict'];

export default function TsConfigVisualization() {
  const [sel, setSel] = useState(2);
  const [showStrict, setShowStrict] = useState(false);
  const o = OPTIONS[sel];

  return (
    <div className="tscfg-wrap">
      <h3 className="tscfg-title">tsconfig.json</h3>
      <p className="tscfg-sub">The compiler's control panel — click an option to learn what it does</p>

      <div className="tscfg-body">
        <pre className="tscfg-json">{`{
  "compilerOptions": {`}
{OPTIONS.map((opt, i) => (
  <span key={opt.key} className={`tscfg-line ${sel === i ? 'tscfg-line-sel' : ''}`} onClick={() => setSel(i)}>
    {`    "${opt.key}": ${opt.value},`}
  </span>
))}
{`  }
}`}</pre>
      </div>

      <div className="tscfg-detail">
        <code className="tscfg-detail-key">{o.key}</code>
        <span className="tscfg-detail-desc">{o.desc}</span>
        {o.strict && (
          <button className="tscfg-strict-btn" onClick={() => setShowStrict(s => !s)}>
            {showStrict ? 'Hide' : 'Show'} what strict enables
          </button>
        )}
      </div>

      {o.strict && showStrict && (
        <div className="tscfg-flags">
          {STRICT_FLAGS.map(f => <span key={f} className="tscfg-flag">✓ {f}</span>)}
        </div>
      )}
    </div>
  );
}
