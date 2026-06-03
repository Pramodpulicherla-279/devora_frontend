/* Lesson: Claude & Gemini
 * Visual type: ILLUSTRATION
 * Reason: A side-by-side strengths comparison of the two model families is the
 * natural format — a comparison table/cards, no interactivity needed. */
import React, { useState } from 'react';
import './visual.css';

const ROWS = [
  { f: 'Maker', claude: 'Anthropic', gemini: 'Google DeepMind' },
  { f: 'Strengths', claude: 'Long-form writing, coding, careful reasoning, safety', gemini: 'Native multimodal, huge context, Google ecosystem' },
  { f: 'Context window', claude: 'Up to ~200K+ tokens', gemini: 'Up to ~1M+ tokens' },
  { f: 'Multimodal', claude: 'Text + images', gemini: 'Text, images, audio, video' },
  { f: 'Known for', claude: 'Following instructions, nuance', gemini: 'Integration with Search/Workspace' },
];

const LlmClaudeGeminiVisualization = () => {
  const [hl, setHl] = useState(null);
  return (
    <div className="llmcg-wrap">
      <header className="llmcg-head">
        <span className="llmcg-badge">Frontier Models</span>
        <h2>Claude &amp; Gemini</h2>
        <p>Two leading alternatives to GPT</p>
      </header>
      <div className="llmcg-table">
        <div className="llmcg-thead">
          <div className="llmcg-th"></div>
          <div className="llmcg-th llmcg-th--claude">Claude</div>
          <div className="llmcg-th llmcg-th--gemini">Gemini</div>
        </div>
        {ROWS.map((r, i) => (
          <div key={i} className={`llmcg-row ${hl === i ? 'llmcg-row--on' : ''}`} onClick={() => setHl(hl === i ? null : i)}>
            <div className="llmcg-rf">{r.f}</div>
            <div className="llmcg-rc">{r.claude}</div>
            <div className="llmcg-rg">{r.gemini}</div>
          </div>
        ))}
      </div>
      <div className="llmcg-note">There's no single "best" — pick based on context-length needs, modality, ecosystem, and how the model handles your specific prompts. Always test on your own tasks.</div>
    </div>
  );
};
export default LlmClaudeGeminiVisualization;
