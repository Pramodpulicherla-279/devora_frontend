import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import logo from '../../assets/logo.png';
import { ROADMAPS } from './roadmapData';
import './RoadmapsScreen.css';

/* ── localStorage key ── */
const storageKey = (slug) => `devora_roadmap_${slug}`;

/* ── TYPE badge colour map ── */
const TYPE_COLOR = {
  required: { bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d' },
  optional: { bg: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8' },
  advanced: { bg: '#fdf4ff', border: '#e9d5ff', text: '#7e22ce' },
};

/* ── Node component ── */
function RoadmapNode({ step, color, done, onToggle, onClick }) {
  return (
    <button
      className={`rm-node ${done ? 'done' : ''}`}
      style={{ '--nc': color }}
      onClick={() => onClick(step)}
    >
      {done && <span className="rm-node-check">✓</span>}
      <span className="rm-node-icon">{step.icon}</span>
      <span className="rm-node-title">{step.title}</span>
      <span
        className="rm-node-type"
        style={{ background: TYPE_COLOR[step.type]?.bg, color: TYPE_COLOR[step.type]?.text, border: `1px solid ${TYPE_COLOR[step.type]?.border}` }}
      >
        {step.type}
      </span>
      <button
        className={`rm-node-tick ${done ? 'ticked' : ''}`}
        title={done ? 'Mark incomplete' : 'Mark complete'}
        onClick={(e) => { e.stopPropagation(); onToggle(step.id); }}
      >
        {done ? '✓' : '○'}
      </button>
    </button>
  );
}

/* ── Detail Panel ── */
function DetailPanel({ step, roadmapColor, done, onToggle, onClose }) {
  if (!step) return null;
  const navigate = useNavigate();
  return (
    <div className="rm-detail-overlay" onClick={onClose}>
      <aside className="rm-detail-panel" onClick={(e) => e.stopPropagation()}>
        <button className="rm-detail-close" onClick={onClose}>✕</button>
        <div className="rm-detail-icon" style={{ background: `${roadmapColor}18`, color: roadmapColor }}>
          {step.icon}
        </div>
        <h3 className="rm-detail-title">{step.title}</h3>
        <span
          className="rm-detail-badge"
          style={{ background: TYPE_COLOR[step.type]?.bg, color: TYPE_COLOR[step.type]?.text, border: `1px solid ${TYPE_COLOR[step.type]?.border}` }}
        >
          {step.type}
        </span>
        <p className="rm-detail-desc">{step.description}</p>

        {step.topics?.length > 0 && (
          <div className="rm-detail-topics">
            <h4 className="rm-detail-topics-title">Topics covered</h4>
            <ul>
              {step.topics.map((t, i) => (
                <li key={i} className="rm-detail-topic-item">
                  <span className="rm-detail-topic-dot" style={{ background: roadmapColor }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="rm-detail-actions">
          {step.courseSlug && (
            <button
              className="rm-detail-course-btn"
              style={{ background: roadmapColor }}
              onClick={() => navigate(`/course/${step.courseSlug}`)}
            >
              Start on Dev.EL →
            </button>
          )}
          <button
            className={`rm-detail-done-btn ${done ? 'done' : ''}`}
            style={done ? {} : { border: `2px solid ${roadmapColor}`, color: roadmapColor }}
            onClick={() => onToggle(step.id)}
          >
            {done ? '✓ Completed' : '○ Mark as complete'}
          </button>
        </div>
      </aside>
    </div>
  );
}

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */
export default function RoadmapsScreen() {
  const navigate = useNavigate();
  const { slug: urlSlug } = useParams();
  const [activeSlug, setActiveSlug] = useState(urlSlug || ROADMAPS[0].slug);
  const [completedMap, setCompletedMap] = useState({}); // { roadmapSlug: Set<stepId> }
  const [selectedStep, setSelectedStep] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const mainRef = useRef(null);

  /* ── Load progress from localStorage ── */
  useEffect(() => {
    const map = {};
    ROADMAPS.forEach((r) => {
      try {
        const raw = localStorage.getItem(storageKey(r.slug));
        map[r.slug] = raw ? new Set(JSON.parse(raw)) : new Set();
      } catch {
        map[r.slug] = new Set();
      }
    });
    setCompletedMap(map);
  }, []);

  /* ── Sync URL slug ── */
  useEffect(() => {
    if (urlSlug && ROADMAPS.find((r) => r.slug === urlSlug)) {
      setActiveSlug(urlSlug);
    }
  }, [urlSlug]);

  /* ── Toggle step completion ── */
  const toggleStep = (roadmapSlug, stepId) => {
    setCompletedMap((prev) => {
      const set = new Set(prev[roadmapSlug] || []);
      if (set.has(stepId)) set.delete(stepId);
      else set.add(stepId);
      try {
        localStorage.setItem(storageKey(roadmapSlug), JSON.stringify([...set]));
      } catch {}
      return { ...prev, [roadmapSlug]: set };
    });
  };

  const roadmap = ROADMAPS.find((r) => r.slug === activeSlug) || ROADMAPS[0];
  const doneSet = completedMap[roadmap.slug] || new Set();
  const totalSteps = roadmap.phases.reduce((s, p) => s + p.steps.length, 0);
  const doneCount = doneSet.size;
  const progressPct = totalSteps === 0 ? 0 : Math.round((doneCount / totalSteps) * 100);

  const switchRoadmap = (slug) => {
    setActiveSlug(slug);
    setSelectedStep(null);
    setMobileSidebarOpen(false);
    navigate(`/roadmaps/${slug}`, { replace: true });
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── SEO — dynamic per active roadmap ────────────────────────────────────
  useSEO({
    title:       urlSlug
      ? `${roadmap.name} Developer Roadmap 2025`
      : 'Web Developer Roadmaps 2025 — Step-by-Step Learning Paths',
    description: urlSlug
      ? `Complete ${roadmap.name} learning roadmap — every skill you need, in the right order, with free interactive courses on Dev.EL.`
      : 'Step-by-step interactive developer roadmaps for Frontend, Backend, Full Stack, Data Analytics, DevOps, Automation Testing, Prompt Engineering, and AI Engineering — all free on Dev.EL.',
    canonical:   urlSlug ? `/roadmaps/${urlSlug}` : '/roadmaps',
    jsonLd: urlSlug
      ? [
          {
            '@type': 'HowTo',
            name:    `How to become a ${roadmap.name} developer`,
            description: roadmap.description,
            totalTime:   'P3M',
            step: roadmap.phases.map((phase, i) => ({
              '@type': 'HowToSection',
              position: i + 1,
              name:    phase.title,
              itemListElement: phase.steps.map((step, j) => ({
                '@type':    'HowToStep',
                position:   j + 1,
                name:       step.title,
                text:       step.description || step.title,
              })),
            })),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home',     item: 'https://dev-el.co/'        },
              { '@type': 'ListItem', position: 2, name: 'Roadmaps', item: 'https://dev-el.co/roadmaps' },
              { '@type': 'ListItem', position: 3, name: roadmap.name, item: `https://dev-el.co/roadmaps/${urlSlug}` },
            ],
          },
        ]
      : null,
  });
  // ────────────────────────────────────────────────────────────────────────

  return (
    <div className="rm-screen">
      {/* ── HEADER ── */}
      <header className="rm-header">
        <button className="rm-back" onClick={() => navigate('/')}>← Home</button>
        <Link to="/" className="rm-logo">
          <img src={logo} alt="Dev.EL" />
          <span>Dev<span className="rm-dot">.</span>EL</span>
        </Link>
        <button
          className="rm-menu-btn"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          aria-label="Toggle roadmap list"
        >
          ☰ Roadmaps
        </button>
      </header>

      <div className="rm-body">
        {/* ── SIDEBAR ── */}
        <aside className={`rm-sidebar ${mobileSidebarOpen ? 'open' : ''}`}>
          <div className="rm-sidebar-title">🗺️ Roadmaps</div>
          {ROADMAPS.map((r) => {
            const done = completedMap[r.slug]?.size || 0;
            const total = r.phases.reduce((s, p) => s + p.steps.length, 0);
            const pct = total ? Math.round((done / total) * 100) : 0;
            return (
              <button
                key={r.slug}
                className={`rm-sidebar-item ${activeSlug === r.slug ? 'active' : ''}`}
                style={{ '--ic': r.color }}
                onClick={() => switchRoadmap(r.slug)}
              >
                <span className="rm-si-icon">{r.icon}</span>
                <div className="rm-si-body">
                  <span className="rm-si-name">{r.name}</span>
                  {pct > 0 && (
                    <div className="rm-si-bar">
                      <div className="rm-si-fill" style={{ width: `${pct}%`, background: r.color }} />
                    </div>
                  )}
                </div>
                {pct > 0 && <span className="rm-si-pct" style={{ color: r.color }}>{pct}%</span>}
              </button>
            );
          })}
        </aside>
        {mobileSidebarOpen && (
          <div className="rm-overlay" onClick={() => setMobileSidebarOpen(false)} />
        )}

        {/* ── MAIN CONTENT ── */}
        <main className="rm-main" ref={mainRef}>
          {/* Roadmap header */}
          <div className="rm-roadmap-header" style={{ '--rc': roadmap.color }}>
            <div className="rm-rh-left">
              <div className="rm-rh-icon" style={{ background: `${roadmap.color}18`, color: roadmap.color }}>
                {roadmap.icon}
              </div>
              <div>
                <h1 className="rm-rh-title">{roadmap.name}</h1>
                <p className="rm-rh-desc">{roadmap.description}</p>
              </div>
            </div>
            <div className="rm-rh-progress">
              <div className="rm-prog-ring-wrap">
                <svg viewBox="0 0 64 64" width="64" height="64">
                  <circle cx="32" cy="32" r="26" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                  <circle
                    cx="32" cy="32" r="26"
                    fill="none"
                    stroke={roadmap.color}
                    strokeWidth="6"
                    strokeDasharray={`${2 * Math.PI * 26}`}
                    strokeDashoffset={`${2 * Math.PI * 26 * (1 - progressPct / 100)}`}
                    strokeLinecap="round"
                    transform="rotate(-90 32 32)"
                    style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                  />
                </svg>
                <span style={{ color: roadmap.color }}>{progressPct}%</span>
              </div>
              <div className="rm-prog-text">
                <span className="rm-prog-count">{doneCount} / {totalSteps}</span>
                <span className="rm-prog-label">steps done</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="rm-progress-bar-wrap">
            <div className="rm-progress-bar">
              <div
                className="rm-progress-fill"
                style={{ width: `${progressPct}%`, background: roadmap.color }}
              />
            </div>
            <span className="rm-progress-label">{progressPct}% complete</span>
          </div>

          {/* Phases flow */}
          <div className="rm-flow">
            {roadmap.phases.map((phase, phaseIdx) => {
              const phaseStepsDone = phase.steps.filter((s) => doneSet.has(s.id)).length;
              const phaseAllDone = phaseStepsDone === phase.steps.length;
              return (
                <div key={phase.id} className="rm-phase-wrap">
                  {/* Phase connector (between phases) */}
                  {phaseIdx > 0 && (
                    <div className="rm-phase-connector">
                      <div className="rm-connector-line" style={{ background: roadmap.color }} />
                      <div className="rm-connector-arrow" style={{ borderTopColor: roadmap.color }} />
                    </div>
                  )}

                  {/* Phase card */}
                  <div className={`rm-phase ${phaseAllDone ? 'phase-done' : ''}`} style={{ '--rc': roadmap.color }}>
                    <div className="rm-phase-header">
                      <div className="rm-phase-num" style={{ background: phaseAllDone ? roadmap.color : `${roadmap.color}20`, color: phaseAllDone ? '#fff' : roadmap.color }}>
                        {phaseAllDone ? '✓' : phaseIdx + 1}
                      </div>
                      <h2 className="rm-phase-title">{phase.title}</h2>
                      <span className="rm-phase-prog" style={{ color: roadmap.color }}>
                        {phaseStepsDone}/{phase.steps.length}
                      </span>
                    </div>
                    <div className="rm-nodes">
                      {phase.steps.map((step) => (
                        <RoadmapNode
                          key={step.id}
                          step={step}
                          color={roadmap.color}
                          done={doneSet.has(step.id)}
                          onToggle={(id) => toggleStep(roadmap.slug, id)}
                          onClick={setSelectedStep}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Completion banner */}
            {doneCount === totalSteps && totalSteps > 0 && (
              <div className="rm-completion" style={{ '--rc': roadmap.color }}>
                <span className="rm-completion-icon">🎉</span>
                <div>
                  <h3>Roadmap Complete!</h3>
                  <p>You've mastered all {totalSteps} steps of the {roadmap.name} roadmap.</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── DETAIL PANEL ── */}
      {selectedStep && (
        <DetailPanel
          step={selectedStep}
          roadmapColor={roadmap.color}
          done={doneSet.has(selectedStep.id)}
          onToggle={(id) => toggleStep(roadmap.slug, id)}
          onClose={() => setSelectedStep(null)}
        />
      )}
    </div>
  );
}
