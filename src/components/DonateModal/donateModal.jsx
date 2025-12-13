import React, { useState } from 'react';
import './donateModal.css';
import qrCode from '../../assets/upi-qr-code.jpeg';

function DonateModal({ onClose }) {
    const [copied, setCopied] = useState(false);
    
    // FIX THE TYPO: pulicla -> pulicherla
    const upiId = 'pramod.pulicherla@ybl';

    const handleCopyUPI = () => {
        navigator.clipboard.writeText(upiId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="donate-modal-overlay" onClick={onClose}>
            <div className="donate-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>☕ Buy Me a Coffee</h2>
                <p>Your support keeps my work going ❤️</p>

                {/* COPY UPI - Make it the primary method */}
                <div className="upi-id-box">
                    <p className="upi-label">UPI ID</p>
                    <p className="upi-id-large">{upiId}</p>
                    <button className="copy-btn-large" onClick={handleCopyUPI}>
                        {copied ? '✓ Copied!' : '📋 Copy UPI ID'}
                    </button>
                    {/* <p className="instruction-text">
                        Open any UPI app → Enter UPI ID → Send any amount
                    </p> */}
                </div>

                <div className="divider">OR</div>

                {/* QR CODE */}
                <p className="scan-text">Scan QR Code from any UPI app</p>
                <img src={qrCode} alt="UPI QR" className="qr-code" />
            </div>
        </div>
    );
}

export default DonateModal;
