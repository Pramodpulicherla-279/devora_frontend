/* Lesson: Running an Android Emulator in CI
 * Concept: the decisive trap. `adb wait-for-device` returns the instant the device CONNECTS —
 * long before Android has finished booting. Tests fired at that moment land on a half-ready
 * phone and fail randomly, which is the worst kind of failure to chase. Drag the start marker
 * between the two waits and watch the phone's actual readiness at that instant. */
import { useState } from 'react';
import Stage2D from '../../../../_dsa-shared/Stage2D';
import { useAutoPlay, AutoButton } from '../../../../_dsa-shared/util';

const BAR_X = 40;
const BAR_W = 560;
const CONNECT_X = BAR_X + 100;   // adb sees the device
const READY_X = BAR_X + 430;     // sys.boot_completed = 1

const WAITS = [
  {
    key: 'device',
    label: 'adb wait-for-device',
    x: CONNECT_X,
    color: '#f85149',
    state: 'CONNECTED, still booting',
    detail: 'launcher not up · packages not registered · services still starting',
    verdict: '✗ Appium attaches to a phone that is not ready. Sessions fail to start, elements are missing, and because it is a timing problem it comes and goes.',
  },
  {
    key: 'boot',
    label: 'getprop sys.boot_completed = 1',
    x: READY_X,
    color: '#56d364',
    state: 'GENUINELY BOOTED',
    detail: 'launcher up · packages ready · services running · animations disabled',
    verdict: '✓ The OS itself reports the boot finished. Tests start on a real, settled phone — the random timing failures disappear.',
  },
];

export default function AcicdEmulatorBootVisualization() {
  const [wi, setWi] = useState(0);
  const [auto, setAuto] = useState(true);
  useAutoPlay(() => setWi(v => (v + 1) % WAITS.length), 3, auto);

  const w = WAITS[wi];

  return (
    <Stage2D
      title={'"Connected" is not "booted" — the emulator trap that eats days'}
      subtitle="An emulator is a VM inside a VM. Even with KVM acceleration it needs a minute or more to finish booting, and adb tells you it exists long before Android is ready to be tested."
      accent={w.color}
      viewBox="0 0 640 300"
      controls={<>
        {WAITS.map((x, k) => (
          <button key={x.key} className={`dsa2d-btn ${k === wi ? 'dsa2d-btn--on' : ''}`} onClick={() => setWi(k)}>
            {k === 0 ? 'start after wait-for-device' : 'start after boot_completed'}
          </button>
        ))}
        <AutoButton playing={auto} onToggle={() => setAuto(a => !a)} />
        <span className="dsa2d-readout">{`pytest starts → phone is ${w.state}`}</span>
      </>}
      legend={<>Running an emulator on a CI runner is <strong>nested virtualization</strong>, so it needs hardware acceleration (<strong>KVM</strong> on Linux) to be usable at all, plus <code>-no-window</code> since a server has no display. Then the readiness rule: <code>adb wait-for-device</code> only means <em>connected</em> — poll <code>sys.boot_completed</code> until it returns <code>1</code> before running tests. Disable the three animation scales to cut further flakiness. The <code>android-emulator-runner</code> action does most of this for you; knowing what it does under the hood is what lets you fix it when it does not just work.</>}
    >
      {/* boot timeline */}
      <text x="40" y="34" fill="#8b949e" fontSize="10.5" fontFamily="system-ui">emulator boot timeline — headless, KVM enabled</text>

      <rect x={BAR_X} y="46" width="100" height="30" rx="6" fill="rgba(240,163,94,.18)" stroke="#f0a35e" strokeWidth="1.2" />
      <text x={BAR_X + 50} y="66" fill="#f0a35e" fontSize="8.5" textAnchor="middle" fontFamily="system-ui">starting</text>

      <rect x={CONNECT_X} y="46" width="330" height="30" fill="rgba(248,81,73,.14)" stroke="#f85149" strokeWidth="1.2" />
      <text x={CONNECT_X + 165} y="66" fill="#f85149" fontSize="8.5" textAnchor="middle" fontFamily="system-ui">
        booting: services → packages → launcher (~60s+)
      </text>

      <rect x={READY_X} y="46" width={BAR_X + BAR_W - READY_X} height="30" rx="6" fill="rgba(86,211,100,.18)" stroke="#56d364" strokeWidth="1.2" />
      <text x={(READY_X + BAR_X + BAR_W) / 2} y="66" fill="#56d364" fontSize="8.5" textAnchor="middle" fontFamily="system-ui">ready</text>

      {/* the two wait markers */}
      {WAITS.map(x => (
        <g key={x.key} opacity={x.key === w.key ? 1 : 0.4} className="dsa2d-fade">
          <line x1={x.x} y1="40" x2={x.x} y2="106" stroke={x.color} strokeWidth={x.key === w.key ? 2.2 : 1.2} strokeDasharray="4 3" />
          <circle cx={x.x} cy="40" r="4" fill={x.color} />
          <text x={x.x} y="122" fill={x.color} fontSize="8.5" textAnchor="middle" fontFamily="Consolas">{x.label}</text>
        </g>
      ))}

      {/* the start flag */}
      <g className="dsa2d-pop" key={w.key}>
        <line x1={w.x} y1="132" x2={w.x} y2="150" stroke={w.color} strokeWidth="2" />
        <rect x={w.x - 62} y="150" width="124" height="22" rx="6" fill={`${w.color}22`} stroke={w.color} strokeWidth="1.8" className="dsa2d-pulse" />
        <text x={w.x} y="165" fill={w.color} fontSize="9" textAnchor="middle" fontWeight="700" fontFamily="Consolas">pytest starts here</text>
      </g>

      {/* phone state */}
      <rect x="40" y="184" width="180" height="76" rx="11" fill="#0d1117" stroke={w.color} strokeWidth="1.8" />
      <text x="130" y="204" fill="#8b949e" fontSize="9" textAnchor="middle" fontFamily="system-ui">phone at that instant</text>
      <text x="130" y="228" fill={w.color} fontSize="11" textAnchor="middle" fontWeight="700" fontFamily="Consolas">{w.state}</text>
      <foreignObject x="50" y="234" width="160" height="26">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#6e7681', font: '8px system-ui', lineHeight: 1.4, textAlign: 'center' }}>
          {w.detail}
        </div>
      </foreignObject>

      <rect x="236" y="184" width="364" height="76" rx="11"
        fill={w.key === 'boot' ? 'rgba(86,211,100,.06)' : 'rgba(248,81,73,.06)'} stroke={w.color} strokeWidth="1.6" />
      <foreignObject x="250" y="192" width="338" height="62">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#c9d1d9', font: '10.5px system-ui', lineHeight: 1.5 }}>
          {w.verdict}
        </div>
      </foreignObject>

      <text x="40" y="284" fill="#6e7681" fontSize="9.5" fontFamily="system-ui">
        {'Without KVM the emulator crawls or never boots at all — like pushing the truck by hand. Enable it before you debug anything else.'}
      </text>
      <text x="40" y="298" fill="#6e7681" fontSize="9.5" fontFamily="system-ui">
        {'When emulators hit their ceiling, cloud device farms sidestep nested virtualization entirely by giving you real hardware.'}
      </text>
    </Stage2D>
  );
}
