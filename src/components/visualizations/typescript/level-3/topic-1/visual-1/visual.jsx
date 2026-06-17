import { useState } from 'react';
import './visual.css';

const JS_CODE = `// plain JS — no safety
export async function getUser(req, res) {
  const id = req.params.id;
  const user = await User.findById(id);
  res.json(user);
}`;

const TS_CODE = `// TypeScript — fully typed
import { Request, Response } from 'express';

interface User { id: string; name: string; email: string; }

export async function getUser(
  req: Request<{ id: string }>,
  res: Response<User | { error: string }>
): Promise<void> {
  const { id } = req.params;       // typed string
  const user = await User.findById(id);
  if (!user) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  res.json(user);                  // checked against User
}`;

const STEPS = ['npx tsc --init', 'Rename .js → .ts', 'Add types to function signatures', 'Fix the errors TS surfaces', 'Enable strict mode incrementally'];

export default function TsInPracticeVisualization() {
  const [ts, setTs] = useState(true);

  return (
    <div className="tsprac-wrap">
      <h3 className="tsprac-title">TypeScript in Practice</h3>
      <p className="tsprac-sub">Adding types to a real Express route handler</p>

      <div className="tsprac-toggle">
        <button className={`tsprac-tog ${!ts ? 'tsprac-tog-js' : ''}`} onClick={() => setTs(false)}>Before (JS)</button>
        <button className={`tsprac-tog ${ts ? 'tsprac-tog-ts' : ''}`} onClick={() => setTs(true)}>After (TS)</button>
      </div>

      <pre className={`tsprac-code ${ts ? 'tsprac-code-ts' : ''}`}>{ts ? TS_CODE : JS_CODE}</pre>

      <div className="tsprac-gains">
        {ts ? (
          <>
            <span className="tsprac-gain">✓ Typed req.params</span>
            <span className="tsprac-gain">✓ Checked response shape</span>
            <span className="tsprac-gain">✓ Null handling enforced</span>
          </>
        ) : (
          <span className="tsprac-nogain">⚠️ Any typo or wrong shape only fails at runtime</span>
        )}
      </div>

      <div className="tsprac-migration">
        <div className="tsprac-migration-h">Incremental adoption path</div>
        <div className="tsprac-steps">
          {STEPS.map((s, i) => (
            <div key={i} className="tsprac-step"><span className="tsprac-step-num">{i + 1}</span>{s}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
