import React, { useState } from 'react';
import './donateModal.css';
import qrCode from '../../assets/upi-qr-code.jpeg';

function DonateModal({ onClose }) {
    const [copied, setCopied] = useState(false);
    const upiId = 'pramod.pulicherla@ybl';
    // Fixed UPI link format with proper encoding
    const upiLink = `upi://pay?pa=${upiId}&pn=Pramod&tn=Coffee%20Donation&cu=INR`;

    const handleCopyUPI = () => {
        navigator.clipboard.writeText(upiId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // const handleUPIClick = () => {
    //     const intent = `intent://pay?pa=${upiId}&pn=Pramod&tn=Coffee%20Donation&cu=INR#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`;
    //     window.location.href = intent;
    // };

    const handleUPIClick = () => {
        const upiLink = `upi://pay?pa=${upiId}&pn=Pramod&tn=Coffee%20Donation&cu=INR`;
        window.location.href = upiLink;
    };

    return (
        <div className="donate-modal-overlay" onClick={onClose}>
            <div className="donate-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>☕ Buy Me a Coffee</h2>
                <p>Support my work!</p>

                {/* UPI Button for Mobile */}
                <button className="upi-pay-btn" onClick={handleUPIClick}>
                    💳 Pay via UPI Apps
                </button>

                <div className="divider">OR</div>

                {/* QR Code for Desktop/Another Device */}
                <img
                    src={qrCode}
                    alt="UPI QR Code"
                    className="qr-code"
                />

                {/* Copy UPI ID */}
                <div className="upi-id-container">
                    <p className="upi-id">{upiId}</p>
                    <button className="copy-btn" onClick={handleCopyUPI}>
                        {copied ? '✓ Copied!' : '📋 Copy'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DonateModal;