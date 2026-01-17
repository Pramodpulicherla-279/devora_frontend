import React, { useState } from 'react';
import './visual.css';

const selectorData = [
  {
    id: 'universal',
    title: '1. Universal Selector',
    syntax: '* { border: 2px solid red; }',
    description: 'Selects EVERY element on the page (or inside a container). Great for resets.',
    // We define which items in our mock view should be highlighted
    highlightCondition: (tag, classes, id, parent) => true 
  },
  {
    id: 'element',
    title: '2. Element Selector',
    syntax: 'h3 { color: blue; }',
    description: 'Selects all elements of a specific type (tag name).',
    highlightCondition: (tag) => tag === 'h3'
  },
  {
    id: 'id',
    title: '3. ID Selector',
    syntax: '#unique-item { background: yellow; }',
    description: 'Selects the single element with the specific ID. IDs must be unique.',
    highlightCondition: (tag, classes, id) => id === 'unique-item'
  },
  {
    id: 'class',
    title: '4. Class Selector',
    syntax: '.highlight-me { color: green; }',
    description: 'Selects all elements that have this class attribute.',
    highlightCondition: (tag, classes) => classes.includes('highlight-me')
  },
  {
    id: 'descendant',
    title: '5. Descendant Selector',
    syntax: 'div p { color: purple; }',
    description: 'Selects all <p> elements that are anywhere inside a <div>.',
    highlightCondition: (tag, classes, id, parent) => tag === 'p' && parent === 'div'
  },
  {
    id: 'sibling',
    title: '6. Sibling Combinator (+)',
    syntax: 'p + span { color: red; }',
    description: 'Selects a <span> ONLY if it comes immediately after a <p>.',
    // Logic: Highlight span if previous sibling was p. 
    // We handle this logic in the rendering loop for simplicity.
    isSpecialLogic: 'sibling' 
  },
  {
    id: 'child',
    title: '7. Child Combinator (>)',
    syntax: 'div > button { background: teal; }',
    description: 'Selects <button> only if it is a DIRECT child of a <div> (not a grandchild).',
    highlightCondition: (tag, classes, id, parent, isDirect) => tag === 'button' && parent === 'div' && isDirect
  },
  {
    id: 'attribute',
    title: '8. Attribute Selector',
    syntax: 'input[type="text"] { border: 2px solid blue; }',
    description: 'Selects elements based on a specific attribute value.',
    highlightCondition: (tag, classes, id, parent, isDirect, attrs) => tag === 'input' && attrs?.type === 'text'
  }
];

const CssSelectorsVisualizer = () => {
  const [activeId, setActiveId] = useState('universal');
  const activeSelector = selectorData.find(s => s.id === activeId);

  // --- Rendering the Mock DOM ---
  // We define different DOM structures for different lessons to keep examples clear
  
  const renderPreview = () => {
    // 1. Universal, Element, ID, Class Views
    if (['universal', 'element', 'id', 'class'].includes(activeId)) {
      const elements = [
        { tag: 'h3', text: 'Heading <h3>', classes: [] },
        { tag: 'p', text: 'Paragraph <p>', classes: ['highlight-me'] },
        { tag: 'div', text: 'Div #unique-item', id: 'unique-item', classes: [] },
        { tag: 'p', text: 'Paragraph <p>', classes: ['highlight-me'] },
        { tag: 'span', text: 'Span <span>', classes: [] }
      ];

      return (
        <div className="csv-preview-container">
          {elements.map((el, idx) => {
            const isHighlighted = activeSelector.highlightCondition(el.tag, el.classes, el.id);
            return (
              <div key={idx} className={`csv-mock-el ${isHighlighted ? 'highlighted' : ''}`}>
                <span className="csv-tag">&lt;{el.tag}{el.id ? ` id="${el.id}"` : ''}{el.classes.length ? ` class="${el.classes[0]}"` : ''}&gt;</span>
                {el.text}
              </div>
            );
          })}
        </div>
      );
    }

    // 2. Descendant & Child Views (Nested Structures)
    if (['descendant', 'child'].includes(activeId)) {
      return (
        <div className="csv-preview-container">
          {/* Parent DIV */}
          <div className="csv-mock-container">
            <span className="csv-tag-label">&lt;div&gt; Parent</span>
            
            {/* Direct Child P */}
            <div className={`csv-mock-el ${activeId === 'descendant' ? 'highlighted' : ''}`}>
               <span className="csv-tag">&lt;p&gt;</span> I am a child paragraph.
            </div>

            {/* Direct Child Button */}
            <div className={`csv-mock-el ${activeId === 'child' ? 'highlighted' : ''}`}>
               <span className="csv-tag">&lt;button&gt;</span> Direct Child
            </div>

            {/* Nested Span acting as container */}
            <div className="csv-mock-container nested">
               <span className="csv-tag-label">&lt;span&gt; Container</span>
                
               {/* Grandchild P */}
               <div className={`csv-mock-el ${activeId === 'descendant' ? 'highlighted' : ''}`}>
                  <span className="csv-tag">&lt;p&gt;</span> I am a grandchild (nested).
               </div>
               
               {/* Grandchild Button */}
               <div className={`csv-mock-el`}> {/* Child selector > won't hit this */}
                  <span className="csv-tag">&lt;button&gt;</span> Grandchild
               </div>
            </div>

          </div>
          
          {/* Outside P */}
          <div className="csv-mock-el">
             <span className="csv-tag">&lt;p&gt;</span> I am outside the div.
          </div>
        </div>
      );
    }

    // 3. Sibling Combinator View
    if (activeId === 'sibling') {
      return (
        <div className="csv-preview-container">
           <div className="csv-mock-el">
             <span className="csv-tag">&lt;p&gt;</span> Paragraph
           </div>
           
           {/* This spans comes immediately after P */}
           <div className="csv-mock-el highlighted">
             <span className="csv-tag">&lt;span&gt;</span> I am next to &lt;p&gt;! (Selected)
           </div>

           <div className="csv-mock-el">
             <span className="csv-tag">&lt;span&gt;</span> I am NOT immediately after &lt;p&gt;.
           </div>
        </div>
      );
    }

    // 4. Attribute Selector View
    if (activeId === 'attribute') {
        const inputs = [
            { type: 'text', placeholder: 'Name' },
            { type: 'password', placeholder: 'Password' },
            { type: 'text', placeholder: 'Email' }
        ];
        return (
            <div className="csv-preview-container">
                {inputs.map((inp, idx) => (
                    <div key={idx} className={`csv-mock-input ${inp.type === 'text' ? 'highlighted' : ''}`}>
                        <span className="csv-tag">&lt;input type="{inp.type}" /&gt;</span>
                    </div>
                ))}
            </div>
        )
    }
  };

  return (
    <div className="csv-wrapper">
      <header className="csv-header">
        <h2>CSS Selectors Explorer</h2>
        <p>Select a rule below to see which elements get styled.</p>
      </header>

      <div className="csv-layout">
        {/* --- Sidebar / Top Menu --- */}
        <div className="csv-sidebar">
          {selectorData.map((s) => (
            <button
              key={s.id}
              className={`csv-nav-btn ${activeId === s.id ? 'active' : ''}`}
              onClick={() => setActiveId(s.id)}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* --- Main Display Area --- */}
        <div className="csv-display">
          
          {/* Explanation Box */}
          <div className="csv-explanation">
             <h3>{activeSelector.title}</h3>
             <p>{activeSelector.description}</p>
             <div className="csv-code-snippet">
               <code>{activeSelector.syntax}</code>
             </div>
          </div>

          {/* Visual Preview */}
          <div className="csv-visual-stage">
            <div className="csv-stage-label">Visual Output (Simulated)</div>
            {renderPreview()}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CssSelectorsVisualizer;