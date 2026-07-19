/* Lesson: Counting Words With a Given Prefix
 * 2D animated: walk to the prefix node ("ca"), then sweep its subtree counting every is_end
 * node — cat, car, card = 3 words. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';
import { TRIE, nodeAt, walk } from '../../../../_dsa-shared/trieData';

const PREFIX = 'ca';
const SUBTREE = [2, 3, 4, 5];            // nodes under & including 'a'
const ENDS = [3, 4, 5];                  // cat, car, card
export default function TrieCountPrefixVisualization() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  // steps: 0 root,1 c,2 a(prefix reached),3..5 reveal each end node
  useAutoPlay(() => setStep(v => (v >= 5 ? 0 : v + 1)), 0.85, auto);
  const walkPath = walk(PREFIX).path;      // [0,1,2]
  const litWalk = walkPath.slice(0, Math.min(step, 2) + 1);
  const reached = step >= 2;
  const counted = step <= 2 ? 0 : step - 2; // 1..3 after reaching

  return (
    <Stage2D
      title='Counting Words With Prefix "ca"'
      subtitle="Navigate to the node at the end of the prefix, then count how many word-endings live in the subtree below it. Everything under 'ca' shares that prefix."
      accent="#a78bfa"
      viewBox="0 0 640 350"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setStep(v => (v >= 5 ? 0 : v + 1))}>step ▶</button>
          <button className="dsa2d-btn" onClick={() => setStep(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">{reached ? `words with "ca": ${counted}` : 'walking to prefix…'}</span>
        </>
      }
      legend={<>Step 1: walk the prefix in <code>O(L)</code>. Step 2: count <code>is_end</code> markers in the subtree (a DFS). Storing a <em>count</em> at each node makes this <code>O(L)</code> outright — the trick behind fast autocomplete ranking. Here "ca" → <strong>cat, car, card = 3</strong>.</>}
    >
      {TRIE.filter(n => n.parent !== null).map(n => {
        const inWalk = litWalk.includes(n.id) && litWalk.includes(n.parent);
        const inSub = reached && SUBTREE.includes(n.id) && SUBTREE.includes(n.parent);
        const p = nodeAt(n.parent);
        return <line key={n.id} x1={p.x} y1={p.y} x2={n.x} y2={n.y} stroke={inSub ? '#a78bfa' : inWalk ? '#7c6bb0' : '#30363d'} strokeWidth={inWalk || inSub ? 3 : 2} style={{ transition: 'stroke .3s' }} />;
      })}
      {TRIE.map(n => {
        const inWalk = litWalk.includes(n.id);
        const isPrefixNode = n.id === 2 && reached;
        const inSub = reached && SUBTREE.includes(n.id);
        const endIdx = ENDS.indexOf(n.id);
        const countedNow = endIdx !== -1 && endIdx < counted;
        return (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="18"
              fill={countedNow ? '#56d364' : isPrefixNode ? '#a78bfa' : inSub ? 'rgba(167,139,250,.2)' : inWalk ? 'rgba(167,139,250,.25)' : '#161b22'}
              stroke={n.end ? '#56d364' : (inSub || inWalk) ? '#a78bfa' : '#8b949e'} strokeWidth={n.end ? 3 : 2}
              className={countedNow || isPrefixNode ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
            <text x={n.x} y={n.y + 5} fill={countedNow || isPrefixNode ? '#0d1117' : '#e6edf3'} fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{n.ch}</text>
            {countedNow && <text x={n.x + 22} y={n.y - 12} fill="#56d364" fontSize="12" fontFamily="Consolas">✓</text>}
          </g>
        );
      })}
      {reached && <rect x="90" y="270" width="130" height="34" rx="8" fill="rgba(167,139,250,.12)" stroke="#a78bfa" />}
      {reached && <text x="155" y="292" fill="#c9bdf5" fontSize="14" textAnchor="middle" fontWeight="700" fontFamily="Consolas">count = {counted}</text>}
      <text x="320" y="344" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">subtree below "ca" holds all words sharing that prefix</text>
    </Stage2D>
  );
}
