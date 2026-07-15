import './stage2d.css';

/**
 * Shared 2D animated stage for every Python Foundations visualization.
 * A themed, responsive SVG canvas with slots for a title, on-screen
 * controls and an explainer legend. No WebGL — pure SVG + CSS animation.
 */
export default function Stage2D({
  title,
  subtitle,
  viewBox = '0 0 640 340',
  children,
  controls,
  legend,
  accent = '#58a6ff',
}) {
  return (
    <div className="pf2d-root" style={{ '--pf-accent': accent }}>
      {title && (
        <div className="pf2d-head">
          <h3 className="pf2d-title">{title}</h3>
          {subtitle && <p className="pf2d-sub">{subtitle}</p>}
        </div>
      )}
      <div className="pf2d-stage">
        <svg viewBox={viewBox} className="pf2d-svg" preserveAspectRatio="xMidYMid meet">
          {children}
        </svg>
      </div>
      {controls && <div className="pf2d-controls">{controls}</div>}
      {legend && <div className="pf2d-legend">{legend}</div>}
    </div>
  );
}
