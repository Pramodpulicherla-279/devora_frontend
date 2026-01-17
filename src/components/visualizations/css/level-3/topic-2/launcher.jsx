import React, { useState, useEffect } from 'react';
import FlexboxProVisualizer from './visual';
import './launcher.css';

const FlexboxLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  // Check orientation on mount and resize
  useEffect(() => {
    const checkOrientation = () => {
      // Check if width is less than height (Portrait) AND screen is mobile-sized
      if (window.innerWidth < window.innerHeight && window.innerWidth < 900) {
        setIsPortrait(true);
      } else {
        setIsPortrait(false);
      }
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <>
      {/* --- State 1: The Embedded Launch Card --- */}
      {!isOpen && (
        <div className="fl-card">
          <div className="fl-content">
            <h3>Interactive Flexbox Engine</h3>
            <p>Master layout control with our full-screen 3D interactive playground.</p>
            <button className="fl-launch-btn" onClick={() => setIsOpen(true)}>
              <span className="fl-icon">⛶</span> Launch Visualizer
            </button>
            <span className="fl-hint">Best viewed in Landscape mode/ Full Screen</span>
          </div>
          <div className="fl-preview-graphic">
            {/* Simple CSS Graphic representing flexbox */}
            <div className="fl-mini-box"></div>
            <div className="fl-mini-box"></div>
            <div className="fl-mini-box"></div>
          </div>
        </div>
      )}

      {/* --- State 2: Fullscreen Modal --- */}
      {isOpen && (
        <div className="fl-modal-overlay">
          
          {/* Close Button */}
          <button className="fl-close-btn" onClick={() => setIsOpen(false)}>
            ✕ Close
          </button>

          {/* Portrait Warning Overlay (Only shows if mobile + portrait) */}
          {isPortrait && (
            <div className="fl-rotate-warning">
              <div className="fl-rotate-icon">↻</div>
              <h3>Please Rotate Your Device</h3>
              <p>This tool requires landscape mode for the full experience.</p>
            </div>
          )}

          {/* The Actual Component */}
          <div className={`fl-modal-content ${isPortrait ? 'blurred' : ''}`}>
            <FlexboxProVisualizer />
          </div>

        </div>
      )}
    </>
  );
};

export default FlexboxLauncher;