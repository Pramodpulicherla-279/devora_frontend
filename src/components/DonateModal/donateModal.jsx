import React, { useState } from 'react';
import './donateModal.css';
import qrCode from '../../assets/upi-qr-code.jpeg';

function DonateModal({ onClose }) {
    const [copied, setCopied] = useState(false);
    const upiId = 'pramod.pulicherla@ybl';

    const handleCopyUPI = () => {
        navigator.clipboard.writeText(upiId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleUPIClick = () => {
        const upiLink =
            `upi://pay?pa=${upiId}&pn=Pramod%20Pulicherla&am=1&cu=INR&tn=Donation`;

        if (/android/i.test(navigator.userAgent)) {
            const intent =
                `intent://pay?pa=${upiId}&pn=Pramod%20Pulicherla&am=1&cu=INR&tn=Donation#Intent;scheme=upi;end`;

            window.location.href = intent;

            setTimeout(() => {
                window.location.href = upiLink;
            }, 800);

        } else {
            window.location.href = upiLink;
        }
    };


    return (
        <div className="donate-modal-overlay" onClick={onClose}>
            <div className="donate-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>☕ Buy Me a Coffee</h2>
                <p>Support my work!</p>

                {/* Copy UPI ID - Make it prominent */}
                <div className="upi-id-box">
                    <p className="upi-label">UPI ID</p>
                    <p className="upi-id-large">{upiId}</p>
                    <button className="copy-btn-large" onClick={handleCopyUPI}>
                        {copied ? '✓ Copied!' : '📋 Copy UPI ID'}
                    </button>
                </div>

                {/* UPI Button for Mobile */}
                <button className="upi-pay-btn" onClick={handleUPIClick}>
                    💳 Open in UPI App
                </button>

                <div className="divider">OR</div>

                {/* QR Code for Desktop/Another Device */}
                <p className="scan-text">Scan QR Code</p>
                <img
                    src={qrCode}
                    alt="UPI QR Code"
                    className="qr-code"
                />
            </div>
        </div>
    );
}

export default DonateModal;