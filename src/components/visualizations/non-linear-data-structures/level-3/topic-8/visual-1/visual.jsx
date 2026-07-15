/* Lesson: Tries vs Hash Tables — Picking the Right Tool for Prefix Search
 * 2D animated: query prefix "ca". A hash set must scan EVERY key checking startswith; a trie
 * walks straight to the prefix node in O(L). Side-by-side race. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const KEYS = ['cat', 'car', 'card', 'do', 'dog'];
const PREFIX = 'ca';
export default function TrieVsHashVisualization() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  // hash scans 5 keys (steps 0..4); trie walks 2 chars (fast) — normalize to 5 ticks
  useAutoPlay(() => setStep(v => (v >= 5 ? 0 : v + 1)), 0.7, auto);
  const hashScanned = Math.min(step, KEYS.length);
  const trieDone = step >= 2;
  const matches = KEYS.filter(k => k.startsWith(PREFIX));

  return (
    <Stage2D
      title="Trie vs Hash Table for Prefixes"
      subtitle="Both give O(1)-ish exact lookups. But 'find all words starting with ca' is where they diverge: a hash set has no notion of order, so it must check every key."
      accent="#56d364"
      viewBox="0 0 640 300"
      controls={
        <>
          <button className="dsa2d-btn dsa2d-btn--primary" onClick={() => setStep(v => (v >= 5 ? 0 : v + 1))}>step ▶</button>
          <button className="dsa2d-btn" onClick={() => setStep(0)}>↺</button>
          <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
          <span className="dsa2d-readout">prefix "{PREFIX}" → {matches.join(', ')}</span>
        </>
      }
      legend={<><strong>Hash set:</strong> exact lookup O(1), but prefix search is <code>O(N·L)</code> — scan all N keys. <strong>Trie:</strong> exact lookup O(L) <em>and</em> prefix search O(L) — walk to the prefix node, then read its subtree. For autocomplete, the trie wins decisively.</>}
    >
      <line x1="320" y1="30" x2="320" y2="280" stroke="#30363d" strokeDasharray="4 4" />
      {/* hash side */}
      <text x="150" y="52" fill="#f0883e" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Hash Set — scan all</text>
      {KEYS.map((k, i) => {
        const scanned = i < hashScanned, isMatch = k.startsWith(PREFIX);
        return (
          <g key={k}>
            <rect x="70" y={68 + i * 36} width="160" height="28" rx="6" fill={scanned ? (isMatch ? 'rgba(86,211,100,.18)' : 'rgba(240,136,62,.1)') : '#161b22'} stroke={scanned ? (isMatch ? '#56d364' : '#f0883e') : '#30363d'} strokeWidth="2" className={i === hashScanned - 1 ? 'dsa2d-pulse' : ''} />
            <text x="90" y={87 + i * 36} fill="#e6edf3" fontSize="14" fontFamily="Consolas">{k}</text>
            {scanned && <text x="212" y={87 + i * 36} fill={isMatch ? '#7ee787' : '#8b949e'} fontSize="12" textAnchor="end" fontFamily="Consolas">{isMatch ? '✓' : '✗'}</text>}
          </g>
        );
      })}
      <text x="150" y="268" fill="#f0883e" fontSize="12" textAnchor="middle" fontFamily="Consolas">{hashScanned} / {KEYS.length} keys checked</text>

      {/* trie side */}
      <text x="480" y="52" fill="#56d364" fontSize="15" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Trie — walk to prefix</text>
      {'ca'.split('').map((c, i) => (
        <g key={i}>
          <circle cx={430 + i * 60} cy="120" r="20" fill={step > i ? '#56d364' : '#161b22'} stroke="#56d364" strokeWidth="2.5" className={step === i + 1 ? 'dsa2d-pulse' : ''} style={{ transition: 'fill .3s' }} />
          <text x={430 + i * 60} y="126" fill={step > i ? '#0d1117' : '#e6edf3'} fontSize="16" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{c}</text>
          {i < 1 && <line x1={450 + i * 60} y1="120" x2={470 + i * 60} y2="120" stroke="#56d364" strokeWidth="2" />}
        </g>
      ))}
      {trieDone && <g><rect x="400" y="168" width="160" height="90" rx="10" fill="rgba(86,211,100,.1)" stroke="#56d364" />
        <text x="480" y="190" fill="#8b949e" fontSize="12" textAnchor="middle" fontFamily="system-ui">subtree =</text>
        {matches.map((m, i) => <text key={m} x="480" y={210 + i * 20} fill="#7ee787" fontSize="14" textAnchor="middle" fontFamily="Consolas">{m}</text>)}</g>}
      <text x="480" y="278" fill="#56d364" fontSize="12" textAnchor="middle" fontFamily="Consolas">2 hops, no full scan</text>
    </Stage2D>
  );
}
