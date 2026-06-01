import './DevLoader.css';

/**
 * Full-page branded loader — shared across all screens.
 * Also used as the Suspense fallback in App.jsx via the same CSS class names.
 */
export default function DevLoader() {
  return (
    <div className="dvl-screen">
      <div className="dvl-card">
        <div className="dvl-spinner-wrap">
          <div className="dvl-halo" />
          <div className="dvl-spinner">
            <div className="dvl-spinner-mask" />
          </div>
          <span className="dvl-letter">D</span>
        </div>
        <div className="dvl-brand">Dev<span className="dvl-dot">.</span>EL</div>
        <div className="dvl-dots"><span /><span /><span /></div>
      </div>
    </div>
  );
}
