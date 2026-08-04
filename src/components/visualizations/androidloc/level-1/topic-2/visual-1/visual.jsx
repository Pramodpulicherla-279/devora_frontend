/* Lesson: Appium Inspector — See the Screen, Build Locators in Seconds
 * Concept: the Inspector is "X-ray goggles" with three panels — a device mirror, the element
 * tree (hierarchy), and the attributes panel. Click an element in the mirror → the tree
 * highlights it → attributes fill in → you copy the best locator. Click elements to see the loop. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const ELS = [
  { label: 'Search field', tree: 'EditText', rid: 'search_input', desc: 'Search produce', cls: 'android.widget.EditText', locator: 'ACCESSIBILITY_ID, "Search produce"', y: 96 },
  { label: 'Cart button', tree: 'ImageButton', rid: 'cart_btn', desc: 'Open cart', cls: 'android.widget.ImageButton', locator: 'ID, "com.kisankart:id/cart_btn"', y: 132 },
  { label: 'Login button', tree: 'Button', rid: 'login', desc: 'Login', cls: 'android.widget.Button', locator: 'ACCESSIBILITY_ID, "Login"', y: 168 },
];

export default function AlocInspectorVisualization() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setI(v => (v + 1) % ELS.length), 2, auto);
  const e = ELS[i];

  return (
    <Stage2D
      title="Appium Inspector: X-ray goggles for your app"
      subtitle="Three panels move together — a mirror of the device, the element tree, and an attributes ID-card. Click any element and instantly see the locator that will find it, no guessing."
      accent="#58a6ff"
      viewBox="0 0 640 250"
      controls={<>
        {ELS.map((el, k) => <button key={k} className={`dsa2d-btn ${k === i ? 'dsa2d-btn--on' : ''}`} onClick={() => setI(k)}>{el.label}</button>)}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">selected: {e.label}</span>
      </>}
      legend={<>The workflow: click in the <strong>mirror</strong> → the <strong>tree</strong> highlights the node → the <strong>attributes</strong> panel shows resource-id, content-desc, text, class, and bounds → copy the strongest locator into your code. It’s the fastest way to turn what you see into a reliable <code>find_element</code>.</>}
    >
      {/* Panel 1: device mirror */}
      <text x="30" y="28" fill="#8b949e" fontSize="11" fontFamily="system-ui">device mirror</text>
      <rect x="30" y="34" width="150" height="200" rx="12" fill="#0d1117" stroke="#30363d" strokeWidth="2" />
      {ELS.map((el, k) => (
        <g key={k}>
          <rect x="44" y={el.y - 20} width="122" height="28" rx="6"
            fill={k === i ? 'rgba(88,166,255,.2)' : '#12161d'} stroke={k === i ? '#58a6ff' : '#30363d'}
            strokeWidth={k === i ? 2.5 : 1} className={k === i ? 'dsa2d-pulse' : ''} />
          <text x="105" y={el.y - 2} fill={k === i ? '#79c0ff' : '#8b949e'} fontSize="10.5" textAnchor="middle" fontFamily="system-ui">{el.label}</text>
        </g>
      ))}

      {/* Panel 2: element tree */}
      <text x="200" y="28" fill="#8b949e" fontSize="11" fontFamily="system-ui">element tree</text>
      <rect x="200" y="34" width="180" height="200" rx="12" fill="#161b22" stroke="#30363d" strokeWidth="2" />
      <text x="214" y="58" fill="#8b949e" fontSize="11" fontFamily="Consolas">▾ FrameLayout</text>
      <text x="226" y="78" fill="#8b949e" fontSize="11" fontFamily="Consolas">▾ LinearLayout</text>
      {ELS.map((el, k) => (
        <g key={k}>
          <rect x="222" y={90 + k * 22} width="146" height="20" rx="4" fill={k === i ? 'rgba(88,166,255,.18)' : 'transparent'} stroke={k === i ? '#58a6ff' : 'transparent'} />
          <text x="238" y={104 + k * 22} fill={k === i ? '#79c0ff' : '#8b949e'} fontSize="11" fontFamily="Consolas">• {el.tree}</text>
        </g>
      ))}
      <text x="214" y="192" fill="#6e7681" fontSize="10" fontFamily="Consolas">…nested hierarchy</text>

      {/* Panel 3: attributes */}
      <text x="400" y="28" fill="#8b949e" fontSize="11" fontFamily="system-ui">attributes (ID card)</text>
      <rect x="400" y="34" width="210" height="200" rx="12" fill="#0d1117" stroke="#58a6ff" strokeWidth="2" />
      {[['resource-id', e.rid], ['content-desc', e.desc], ['class', e.cls.split('.').pop()], ['clickable', 'true']].map(([k, v], idx) => (
        <g key={idx}>
          <text x="414" y={60 + idx * 26} fill="#8b949e" fontSize="10.5" fontFamily="Consolas">{k}</text>
          <text x="600" y={60 + idx * 26} fill="#7ee787" fontSize="10.5" textAnchor="end" fontFamily="Consolas">{v}</text>
        </g>
      ))}
      <rect x="414" y="150" width="182" height="72" rx="8" fill="rgba(88,166,255,.1)" stroke="#58a6ff" />
      <text x="424" y="168" fill="#8b949e" fontSize="10" fontFamily="system-ui">suggested locator →</text>
      {e.locator.match(/.{1,26}(\s|,|$)/g).slice(0, 3).map((ln, k) => (
        <text key={k} x="424" y={186 + k * 15} fill="#79c0ff" fontSize="10.5" fontFamily="Consolas">{ln.trim()}</text>
      ))}
    </Stage2D>
  );
}
