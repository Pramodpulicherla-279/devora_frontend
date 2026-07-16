/* Lesson: Pruning — Making Backtracking Faster by Quitting Early
 * 2D animated: the same search tree with pruning off vs on. Pruned branches (that can't lead to
 * a solution) are cut immediately, slashing the nodes explored. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const NODES = [
  { id: 0, x: 320, y: 36, p: null },
  { id: 1, x: 180, y: 100, p: 0 }, { id: 2, x: 460, y: 100, p: 0 },
  { id: 3, x: 110, y: 168, p: 1 }, { id: 4, x: 250, y: 168, p: 1 }, { id: 5, x: 390, y: 168, p: 2 }, { id: 6, x: 530, y: 168, p: 2 },
  { id: 7, x: 80, y: 232, p: 3 }, { id: 8, x: 145, y: 232, p: 3 }, { id: 9, x: 215, y: 232, p: 4 }, { id: 10, x: 285, y: 232, p: 4 },
  { id: 11, x: 355, y: 232, p: 5 }, { id: 12, x: 425, y: 232, p: 5 }, { id: 13, x: 495, y: 232, p: 6 }, { id: 14, x: 565, y: 232, p: 6 },
];
// with pruning, subtrees under node 4 and node 6 are cut (can't succeed)
const PRUNED_ROOTS = new Set([4, 6]);
const isPruned = id => { let n = NODES[id]; while (n) { if (PRUNED_ROOTS.has(n.id) && n.id !== id) return true; n = n.p == null ? null : NODES[n.p]; } return false; };
export default function BtPruningVisualization() {
  const [prune, setPrune] = useState(true);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setPrune(p => !p), 2.4, auto);
  const explored = NODES.filter(n => !(prune && (isPruned(n.id) || PRUNED_ROOTS.has(n.id) && false))).filter(n => !(prune && isPruned(n.id)));
  const exploredCount = NODES.filter(n => !(prune && isPruned(n.id))).length;
  return (
    <Stage2D title="Pruning: Quit Branches Early" subtitle="Backtracking's worst enemy is exploring branches that can't possibly succeed. A pruning check — 'can this partial solution still reach a valid answer?' — cuts whole subtrees before you descend into them."
      accent={prune ? '#56d364' : '#f0883e'} viewBox="0 0 640 270"
      controls={<><button className={`dsa2d-btn ${!prune ? 'dsa2d-btn--on' : ''}`} onClick={() => setPrune(false)}>brute force</button><button className={`dsa2d-btn ${prune ? 'dsa2d-btn--on' : ''}`} onClick={() => setPrune(true)}>with pruning</button><AutoButton playing={auto} onToggle={() => setAuto(a => !a)} /><span className="dsa2d-readout">nodes explored: {exploredCount} / {NODES.length}</span></>}
      legend={prune
        ? <>A good pruning test (a constraint that's already violated, a partial sum that overshoots, a bound worse than the best-so-far) lets you skip entire subtrees. Here two branches are cut, dropping from {NODES.length} to <strong>{exploredCount}</strong> nodes — often the difference between feasible and hopeless.</>
        : <>Without pruning, backtracking explores <strong>every</strong> node — all {NODES.length} here. On real problems the tree is exponential, so brute-force exploration quickly becomes impossible. Toggle pruning to see branches disappear.</>}>
      {NODES.filter(n => n.p !== null).map(n => { const par = NODES[n.p]; const cut = prune && isPruned(n.id); return <line key={n.id} x1={par.x} y1={par.y} x2={n.x} y2={n.y} stroke={cut ? '#21262d' : '#8b949e'} strokeWidth="2" strokeDasharray={cut ? '4 4' : 'none'} style={{ transition: 'stroke .3s' }} />; })}
      {NODES.map(n => { const cut = prune && isPruned(n.id); const cutRoot = prune && PRUNED_ROOTS.has(n.id); return <g key={n.id} style={{ opacity: cut ? 0.2 : 1, transition: 'opacity .3s' }}><circle cx={n.x} cy={n.y} r="15" fill={cutRoot ? 'rgba(248,81,73,.18)' : cut ? '#161b22' : 'rgba(86,211,100,.16)'} stroke={cutRoot ? '#f0883e' : cut ? '#30363d' : '#56d364'} strokeWidth="2" />{cutRoot && <text x={n.x} y={n.y + 5} fill="#f0883e" fontSize="14" textAnchor="middle" fontWeight="700">✂</text>}</g>; })}
      <text x="320" y="258" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">{prune ? '✂ = pruned subtree (never explored)' : 'every node visited'}</text>
    </Stage2D>
  );
}
