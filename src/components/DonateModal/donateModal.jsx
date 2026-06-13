import { useState } from 'react';
import './donateModal.css';
import qrCode from '../../assets/upi-qr-code.jpeg';

const UPI_ID = 'pramod.pulicherla@ybl';

export default function DonateModal({ onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="dm-overlay" onClick={onClose}>
      <div className="dm-card" onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button className="dm-close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Header */}
        <div className="dm-header">
          <div className="dm-icon-wrap">
            <span className="dm-icon">☕</span>
          </div>
          <h2 className="dm-title">Buy me a coffee</h2>
          <p className="dm-sub">Your support keeps Dev.EL free for everyone.</p>
        </div>

        {/* QR Code */}
        <div className="dm-qr-wrap">
          <img src={qrCode} alt="UPI QR code" className="dm-qr" />
          <p className="dm-qr-hint">Scan with any UPI app</p>
        </div>

        {/* Divider */}
        <div className="dm-divider"><span>or pay via UPI ID</span></div>

        {/* UPI ID row */}
        <div className="dm-upi-row">
          <span className="dm-upi-id">{UPI_ID}</span>
          <button
            className={`dm-copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            aria-label="Copy UPI ID"
          >
            {copied ? (
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2 8l4 4 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
              </svg>
            )}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        {/* Footer note */}
        <p className="dm-footer">Every cup counts — thank you ❤️</p>
      </div>
    </div>
  );
}
