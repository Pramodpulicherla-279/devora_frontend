import './stage2d.css';

/**
 * Shared 2D animated stage for all DSA-track visualizations (complexity, linear &
 * non-linear data structures). Themed responsive SVG canvas + control/legend slots.
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
    <div className="dsa2d-root" style={{ '--dsa-accent': accent }}>
      {title && (
        <div className="dsa2d-head">
          <h3 className="dsa2d-title">{title}</h3>
          {subtitle && <p className="dsa2d-sub">{subtitle}</p>}
        </div>
      )}
      <div className="dsa2d-stage">
        <svg viewBox={viewBox} className="dsa2d-svg" preserveAspectRatio="xMidYMid meet">
          {children}
        </svg>
      </div>
      {controls && <div className="dsa2d-controls">{controls}</div>}
      {legend && <div className="dsa2d-legend">{legend}</div>}
    </div>
  );
}
