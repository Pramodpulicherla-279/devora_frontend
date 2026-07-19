/* Problem: Word Search II (Trie + Backtracking on a Grid)
 * 2D animated: instead of searching each word separately, load all words into a trie, then
 * DFS the board once — following trie edges and pruning dead prefixes. Finds "oath". */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const GRID = [['o', 'a', 'a', 'n'], ['e', 't', 'a', 'e'], ['i', 'h', 'k', 'r'], ['i', 'f', 'l', 'v']];
// path spelling "oath": (0,0)o (0,1)a (1,1)t (2,1)h
const PATH = [[0, 0], [0, 1], [1, 1], [2, 1]];
const WORD = 'oath';

export default function TrieWordSearchIIVisualization() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setStep(v => (v >= PATH.length ? 0 : v + 1)), 0.9, auto);
  const inPath = (r, c) => PATH.slice(0, step).some(([pr, pc]) => pr === r && pc === c);
  const CW = 54, ox = 210, oy = 60;

  return (
    <Stage2D
      title="Word Search II" subtitle="Searching every word separately re-scans the board over and over. Load all target words into a trie, then DFS the grid ONCE, extending only while the letters still form a valid trie prefix."
      accent="#58a6ff" viewBox="0 0 640 320"
      controls={<><button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setStep(v => (v >= PATH.length ? 0 : v + 1))}>step</button><button className="dsa2d-btn" onClick={() => setStep(0)}>↺</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">building: "{WORD.slice(0, step)}"</span></>}
      legend={<>The trie is the key optimisation: at each grid cell you only recurse into neighbours whose letter is a <strong>child in the trie</strong> — dead ends are pruned instantly. Mark words <code>is_end</code> to collect them. Far faster than running a separate DFS per word.</>}
    >
      {GRID.map((row, r) => row.map((ch, c) => { const on = inPath(r, c); const isTip = step > 0 && PATH[step - 1] && PATH[step - 1][0] === r && PATH[step - 1][1] === c; return (
        <g key={r + '-' + c}><rect x={ox + c * CW} y={oy + r * CW} width={CW - 6} height={CW - 6} rx="8" fill={isTip ? '#58a6ff' : on ? 'rgba(88,166,255,.25)' : '#161b22'} stroke={on ? '#58a6ff' : '#30363d'} strokeWidth="2" className={isTip ? 'dsa2d-pulse' : ''} /><text x={ox + c * CW + (CW - 6) / 2} y={oy + r * CW + 32} fill={isTip ? '#0d1117' : '#e6edf3'} fontSize="20" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{ch}</text></g>); }))}
      <text x="320" y="300" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">DFS follows a trie path across neighbours → found "{WORD}" {step >= PATH.length ? '✓' : '…'}</text>
    </Stage2D>
  );
}
