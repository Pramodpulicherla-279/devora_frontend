/* Lesson: Functions
 * Visual type: ILLUSTRATION
 * Reason: A function's anatomy (def, params, defaults, return) is structural — an
 * annotated breakdown mapping each part teaches the syntax cleanly. */
import React, { useState } from 'react';
import './visual.css';

const PARTS = {
  def: { label: 'def', d: 'Keyword that defines a function.' },
  name: { label: 'greet', d: 'Function name (snake_case by convention).' },
  params: { label: '(name, greeting="Hi")', d: 'Parameters. greeting has a default value.' },
  body: { label: 'indented body', d: 'The code that runs — defined by indentation.' },
  ret: { label: 'return', d: 'Sends a value back. Without it, returns None.' },
};

const PyFunctionsVisualization = () => {
  const [hl, setHl] = useState('def');
  return (
    <div className="pyfunc-wrap">
      <header className="pyfunc-head">
        <span className="pyfunc-badge">Python</span>
        <h2>Functions</h2>
        <p>Reusable, named blocks of logic</p>
      </header>
      <pre className="pyfunc-code"><code>{``}<span className={`pyfunc-k ${hl==='def'?'pyfunc-k--on':''}`} onClick={()=>setHl('def')}>def</span>{` `}<span className={`pyfunc-k ${hl==='name'?'pyfunc-k--on':''}`} onClick={()=>setHl('name')}>greet</span><span className={`pyfunc-k ${hl==='params'?'pyfunc-k--on':''}`} onClick={()=>setHl('params')}>(name, greeting="Hi")</span>{`:
    `}<span className={`pyfunc-k ${hl==='body'?'pyfunc-k--on':''}`} onClick={()=>setHl('body')}>{'msg = f"{greeting}, {name}!"'}</span>{`
    `}<span className={`pyfunc-k ${hl==='ret'?'pyfunc-k--on':''}`} onClick={()=>setHl('ret')}>return msg</span>{`

greet("Ali")            # → "Hi, Ali!"
greet("Sam", "Hello")   # → "Hello, Sam!"`}</code></pre>
      <div className="pyfunc-detail"><strong>{PARTS[hl].label}</strong><p>{PARTS[hl].d}</p></div>
      <div className="pyfunc-concepts">
        <div className="pyfunc-c"><strong>Default args</strong><p>greeting="Hi" makes that param optional.</p></div>
        <div className="pyfunc-c"><strong>Keyword args</strong><p>greet(name="Ali") — call by name for clarity.</p></div>
        <div className="pyfunc-c"><strong>Return</strong><p>No return → the function gives back None.</p></div>
      </div>
      <div className="pyfunc-note">Tap any highlighted part. Functions keep code DRY — write once, call everywhere with different arguments.</div>
    </div>
  );
};
export default PyFunctionsVisualization;
