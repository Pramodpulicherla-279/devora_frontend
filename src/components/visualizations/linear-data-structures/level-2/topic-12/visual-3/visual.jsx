/* Problem: Longest Common Prefix
 * 2D animated: scan character columns top-to-bottom across all strings. Stop at the first
 * column where they disagree — everything before it is the common prefix. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const WORDS = ['flower', 'flow', 'flight'];
function prefixLen() { let i = 0; while (WORDS.every(w => w[i] && w[i] === WORDS[0][i])) i++; return i; }
const PLEN = prefixLen();
export default function StrLongestPrefixVisualization() {
  const [col, setCol] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setCol(v => (v > PLEN ? 0 : v + 1)), 0.9, auto);
  const done = col > PLEN;
  const maxLen = Math.max(...WORDS.map(w => w.length));
  const CW = 46, gap = 6;
  const startX = 200;

  return (
    <Stage2D
      title="Longest Common Prefix"
      subtitle="Compare the strings column by column. As long as every string shares the same character at a column, the prefix grows — the first disagreement ends it."
      accent="#58a6ff"
      viewBox="0 0 640 230"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setCol(v => (v > PLEN ? 0 : v + 1))}>next column</button>
          <button className="dsa2d-btn" onClick={() => setCol(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{done ? `prefix = "${WORDS[0].slice(0, PLEN)}"` : `column ${col}`}</span>
        </>
      }
      legend={<>Vertical scanning checks position 0 across all words, then position 1, and so on. Stop at the first mismatch (or when the shortest word ends). Total work is <strong>O(total characters)</strong>. Here the answer is <code>"{WORDS[0].slice(0, PLEN)}"</code>.</>}
    >
      {WORDS.map((w, r) => (
        <g key={r}>
          <text x={startX - 18} y={60 + r * 46} fill="#8b949e" fontSize="12" textAnchor="end" fontFamily="Consolas">s{r}</text>
          {Array.from({ length: maxLen }).map((_, c) => {
            const ch = w[c];
            const inPrefix = c < col && c < PLEN;
            const isMismatchCol = done && c === PLEN;
            return (
              <g key={c}>
                {ch !== undefined && <rect x={startX + c * (CW + gap)} y={40 + r * 46} width={CW} height="38" rx="6"
                  fill={inPrefix ? 'rgba(86,211,100,.18)' : isMismatchCol ? 'rgba(248,81,73,.14)' : '#161b22'}
                  stroke={inPrefix ? '#3fb950' : isMismatchCol ? '#f85149' : '#30363d'} strokeWidth="2" />}
                {ch !== undefined && <text x={startX + c * (CW + gap) + CW / 2} y={65 + r * 46} fill="#e6edf3" fontSize="17" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text>}
              </g>
            );
          })}
        </g>
      ))}
      {!done && col <= maxLen && <line x1={startX + col * (CW + gap) - 3} y1="34" x2={startX + col * (CW + gap) - 3} y2="185" stroke="#58a6ff" strokeWidth="2" strokeDasharray="3 3" />}
      {done && <text x="320" y="212" fill="#56d364" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">common prefix = "{WORDS[0].slice(0, PLEN)}"</text>}
    </Stage2D>
  );
}
