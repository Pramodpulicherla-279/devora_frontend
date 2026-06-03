/* Lesson: Data Binding & Directives
 * Visual type: INTERACTIVE
 * Reason: Angular's 4 binding types are best learned live — type in a two-way
 * bound field and watch interpolation, property & event bindings all react. */
import React, { useState } from 'react';
import './visual.css';

const NgBindingVisualization = () => {
  const [text, setText] = useState('Angular');
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  return (
    <div className="ngbind-wrap">
      <header className="ngbind-head">
        <span className="ngbind-badge">Angular</span>
        <h2>Data Binding &amp; Directives</h2>
        <p>Four ways data flows between class and template</p>
      </header>
      <div className="ngbind-live">
        <label className="ngbind-field">Two-way binding <code>[(ngModel)]</code>
          <input className="ngbind-input" value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <div className="ngbind-row">
          <div className="ngbind-demo"><span className="ngbind-tag">Interpolation {'{{ text }}'}</span><div className="ngbind-out">{text}</div></div>
          <div className="ngbind-demo"><span className="ngbind-tag">Property [style.color]</span><div className="ngbind-out" style={{ color: text.length > 5 ? '#dd0031' : '#34d399' }}>{text.length} chars</div></div>
        </div>
        <div className="ngbind-demo"><span className="ngbind-tag">Event (click)</span>
          <button className="ngbind-btn" onClick={() => setCount((c) => c + 1)}>Clicked {count}×</button>
        </div>
        <div className="ngbind-demo"><span className="ngbind-tag">*ngIf directive</span>
          <button className="ngbind-toggle" onClick={() => setShow((s) => !s)}>{show ? 'Hide' : 'Show'}</button>
          {show && <div className="ngbind-conditional">I'm rendered because *ngIf="show" is true</div>}
        </div>
      </div>
      <pre className="ngbind-code"><code>{`<input [(ngModel)]="text" />         <!-- two-way -->
<h2>{{ text }}</h2>                  <!-- interpolation -->
<p [style.color]="color">…</p>      <!-- property -->
<button (click)="onClick()">…</button> <!-- event -->
<div *ngIf="show">…</div>            <!-- directive -->`}</code></pre>
      <div className="ngbind-note"><strong>[ ]</strong> = data flows IN (property). <strong>( )</strong> = events flow OUT. <strong>[( )]</strong> = "banana in a box" = both (two-way).</div>
    </div>
  );
};
export default NgBindingVisualization;
