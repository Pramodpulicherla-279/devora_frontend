/* Lesson: Components & Templates
 * Visual type: ILLUSTRATION
 * Reason: A component = decorator + class + template. An annotated anatomy that
 * maps each part of the @Component to what it does teaches the structure. */
import React, { useState } from 'react';
import './visual.css';

const PARTS = {
  decorator: { label: '@Component({...})', d: 'The decorator marks the class as a component and configures it.' },
  selector: { label: "selector: 'app-card'", d: 'The custom HTML tag you use to place this component: <app-card>.' },
  template: { label: 'templateUrl / template', d: 'The HTML view, with Angular binding syntax.' },
  styles: { label: 'styleUrls', d: 'Component-scoped CSS (encapsulated by default).' },
  cls: { label: 'export class CardComponent', d: 'The logic: properties & methods the template can use.' },
};

const NgComponentsVisualization = () => {
  const [hl, setHl] = useState('decorator');
  return (
    <div className="ngcomp-wrap">
      <header className="ngcomp-head">
        <span className="ngcomp-badge">Angular</span>
        <h2>Components &amp; Templates</h2>
        <p>The building block of every Angular app</p>
      </header>
      <pre className="ngcomp-code"><code>{`@Component({
  `}<span className={`ngcomp-k ${hl==='selector'?'ngcomp-k--on':''}`} onClick={()=>setHl('selector')}>selector: 'app-card'</span>{`,
  `}<span className={`ngcomp-k ${hl==='template'?'ngcomp-k--on':''}`} onClick={()=>setHl('template')}>templateUrl: './card.html'</span>{`,
  `}<span className={`ngcomp-k ${hl==='styles'?'ngcomp-k--on':''}`} onClick={()=>setHl('styles')}>styleUrls: ['./card.css']</span>{`
})
`}<span className={`ngcomp-k ${hl==='cls'?'ngcomp-k--on':''}`} onClick={()=>setHl('cls')}>export class CardComponent {`{`}
  title = 'Hello';
{`}`}</span></code></pre>
      <div className="ngcomp-detail"><strong>{PARTS[hl].label}</strong><p>{PARTS[hl].d}</p></div>
      <div className="ngcomp-template">
        <div className="ngcomp-t-label">card.html template</div>
        <pre className="ngcomp-code ngcomp-code--sm"><code>{`<div class="card">
  <h2>{{ title }}</h2>
</div>`}</code></pre>
        <div className="ngcomp-render"><div className="ngcomp-card"><h3>Hello</h3></div></div>
      </div>
      <div className="ngcomp-note">Tap any highlighted part. <code>{'{{ title }}'}</code> is interpolation — it renders the component class's <code>title</code> property into the view.</div>
    </div>
  );
};
export default NgComponentsVisualization;
