import { useState, useCallback } from 'react';
import './visual.css';

const COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#eab308'];
const COLOR_NAMES = ['Red', 'Blue', 'Green', 'Yellow'];
const COLOR_KEYS = ['red', 'blue', 'green', 'yellow'];

function genSequence(len) {
  return Array.from({ length: len }, () => Math.floor(Math.random() * 4));
}

export default function JsSimonSaysVisualization() {
  const [sequence, setSequence] = useState([]);
  const [playerSeq, setPlayerSeq] = useState([]);
  const [phase, setPhase] = useState('idle'); // idle | show | input | win | fail
  const [showIdx, setShowIdx] = useState(-1);
  const [score, setScore] = useState(0);
  const [activeBtn, setActiveBtn] = useState(-1);
  const [codeTab, setCodeTab] = useState('sequence');

  const CODE = {
    sequence: `// Game sequence logic
const sequence = [];

function addToSequence() {
  const next = Math.floor(Math.random() * 4);
  sequence.push(next);
}`,
    display: `// Display sequence with timing
async function displaySequence(seq) {
  for (let i = 0; i < seq.length; i++) {
    highlight(seq[i]);     // light up button
    await sleep(600);
    unhighlight(seq[i]);
    await sleep(300);
  }
}`,
    check: `// Check player input
function handleClick(btn) {
  playerSeq.push(btn);
  const idx = playerSeq.length - 1;

  if (btn !== sequence[idx]) {
    gameOver();  // wrong button
    return;
  }
  if (playerSeq.length === sequence.length) {
    nextRound(); // all correct!
  }
}`,
  };

  const flashButton = useCallback((idx, ms = 500) => {
    setActiveBtn(idx);
    return new Promise(res => setTimeout(() => { setActiveBtn(-1); res(); }, ms));
  }, []);

  const startGame = async () => {
    const seq = genSequence(1);
    setSequence(seq);
    setPlayerSeq([]);
    setPhase('show');
    setScore(0);
    for (let i = 0; i < seq.length; i++) {
      setShowIdx(i);
      await flashButton(seq[i]);
      await new Promise(r => setTimeout(r, 250));
    }
    setShowIdx(-1);
    setPhase('input');
  };

  const handleClick = async (btn) => {
    if (phase !== 'input') return;
    await flashButton(btn, 200);
    const newPlayerSeq = [...playerSeq, btn];
    setPlayerSeq(newPlayerSeq);

    const idx = newPlayerSeq.length - 1;
    if (btn !== sequence[idx]) {
      setPhase('fail');
      return;
    }
    if (newPlayerSeq.length === sequence.length) {
      const newScore = score + 1;
      setScore(newScore);
      const newSeq = [...sequence, genSequence(1)[0]];
      setSequence(newSeq);
      setPlayerSeq([]);
      setPhase('show');
      await new Promise(r => setTimeout(r, 600));
      for (let i = 0; i < newSeq.length; i++) {
        setShowIdx(i);
        await flashButton(newSeq[i]);
        await new Promise(r => setTimeout(r, 250));
      }
      setShowIdx(-1);
      setPhase('input');
    }
  };

  return (
    <div className="jsgame-wrap">
      <h3 className="jsgame-title">Simon Says — JavaScript Project</h3>
      <p className="jsgame-sub">Watch the sequence, then repeat it. Covers: arrays, loops, events, async timing</p>

      <div className="jsgame-main">
        <div className="jsgame-board">
          <div className="jsgame-grid">
            {COLORS.map((color, i) => (
              <button
                key={i}
                className="jsgame-btn"
                style={{
                  background: activeBtn === i ? color : color + '55',
                  boxShadow: activeBtn === i ? `0 0 24px ${color}` : 'none',
                  border: `2px solid ${color}`,
                }}
                onClick={() => handleClick(i)}
                disabled={phase !== 'input'}
              >
                {COLOR_NAMES[i]}
              </button>
            ))}
          </div>

          <div className="jsgame-status">
            {phase === 'idle' && <button className="jsgame-start" onClick={startGame}>▶ Start Game</button>}
            {phase === 'show' && <span className="jsgame-msg">👁 Watch the sequence…</span>}
            {phase === 'input' && <span className="jsgame-msg" style={{ color: '#56d364' }}>▶ Your turn! ({playerSeq.length}/{sequence.length})</span>}
            {phase === 'fail' && (
              <div className="jsgame-fail">
                <span>❌ Wrong! Score: {score}</span>
                <button className="jsgame-start" onClick={startGame}>Try Again</button>
              </div>
            )}
          </div>

          <div className="jsgame-score">Score: <strong>{score}</strong></div>
        </div>

        <div className="jsgame-code-panel">
          <div className="jsgame-code-tabs">
            {Object.keys(CODE).map(k => (
              <button key={k} className={`jsgame-code-tab ${codeTab === k ? 'active' : ''}`}
                onClick={() => setCodeTab(k)}>{k}</button>
            ))}
          </div>
          <pre className="jsgame-code">{CODE[codeTab]}</pre>
          <div className="jsgame-concepts">
            <span className="jsgame-concept">Array.push()</span>
            <span className="jsgame-concept">Async/Await</span>
            <span className="jsgame-concept">Event Handlers</span>
            <span className="jsgame-concept">Closures</span>
          </div>
        </div>
      </div>
    </div>
  );
}
