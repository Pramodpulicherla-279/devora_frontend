/* Lesson: Error Handling
 * Visual type: ANIMATION (stepped try/except flow)
 * Reason: try/except/else/finally is control flow that depends on whether an
 * error fires. Toggling the error and watching which blocks run shows the branches. */
import React, { useState } from 'react';
import './visual.css';

const PyErrorVisualization = () => {
  const [fails, setFails] = useState(false);
  const ran = {
    try: true,
    except: fails,
    else: !fails,
    finally: true,
  };
  return (
    <div className="pyerr-wrap">
      <header className="pyerr-head">
        <span className="pyerr-badge">Python</span>
        <h2>Error Handling</h2>
        <p>try / except / else / finally — graceful failure</p>
      </header>
      <label className="pyerr-toggle">
        <input type="checkbox" checked={fails} onChange={(e) => setFails(e.target.checked)} />
        Make the risky code raise an error
      </label>
      <div className="pyerr-blocks">
        <div className={`pyerr-block ${ran.try ? 'pyerr-block--ran' : ''}`}>
          <code>try:</code><span className="pyerr-desc">run risky code {fails ? '→ 💥 raises!' : '→ ✓ ok'}</span>
        </div>
        <div className={`pyerr-block pyerr-block--except ${ran.except ? 'pyerr-block--ran' : 'pyerr-block--skip'}`}>
          <code>except ValueError as e:</code><span className="pyerr-desc">runs ONLY if an error fired</span>
        </div>
        <div className={`pyerr-block pyerr-block--else ${ran.else ? 'pyerr-block--ran' : 'pyerr-block--skip'}`}>
          <code>else:</code><span className="pyerr-desc">runs ONLY if no error</span>
        </div>
        <div className={`pyerr-block pyerr-block--finally ${ran.finally ? 'pyerr-block--ran' : ''}`}>
          <code>finally:</code><span className="pyerr-desc">ALWAYS runs (cleanup)</span>
        </div>
      </div>
      <pre className="pyerr-code"><code>{`try:
    value = int(user_input)
except ValueError as e:
    print("Not a number:", e)
else:
    print("Parsed:", value)
finally:
    print("Done")`}</code></pre>
      <div className="pyerr-note">Catch <strong>specific</strong> exceptions (<code>ValueError</code>), not a bare <code>except:</code>. <code>finally</code> is for cleanup that must happen either way (closing files, releasing locks).</div>
    </div>
  );
};
export default PyErrorVisualization;
