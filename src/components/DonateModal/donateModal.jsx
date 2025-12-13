import React, { useState, useEffect } from 'react';
import './donateModal.css';
import qrCode from '../../assets/upi-qr-code.jpeg';

function DonateModal({ onClose }) {
    const [amount, setAmount] = useState(10);
    const [customAmount, setCustomAmount] = useState('');
    const [copied, setCopied] = useState(false);

    const upiId = 'pramod.pulicherla@ybl';
    const name = 'Pramod Pulicherla';

    // Detect if device is iPhone (iOS UPI links won't work)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    const handleCopyUPI = () => {
        navigator.clipboard.writeText(upiId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getFinalAmount = () => {
        return customAmount ? customAmount : amount;
    };

    const handleUPIPay = () => {
        const finalAmount = getFinalAmount();

        if (!finalAmount || finalAmount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
            name
        )}&am=${finalAmount}&cu=INR&tn=${encodeURIComponent("Donation")}`;

        if (!isIOS && /android/i.test(navigator.userAgent)) {
            const intent = `intent://pay?pa=${upiId}&pn=${encodeURIComponent(
                name
            )}&am=${finalAmount}&cu=INR&tn=Donation#Intent;scheme=upi;end`;

            window.location.href = intent;

            // Fallback if UPI app didn't open
            setTimeout(() => {
                window.location.href = upiLink;
            }, 700);
        } else {
            // iOS or browsers without UPI support
            alert("iPhone/iOS does not support UPI links. Please scan the QR.");
        }
    };

    return (
        <div className="donate-modal-overlay" onClick={onClose}>
            <div className="donate-modal-content" onClick={(e) => e.stopPropagation()}>

                <button className="close-btn" onClick={onClose}>×</button>
                <h2>☕ Buy Me a Coffee</h2>
                <p>Your support keeps my work going ❤️</p>

                {/* AMOUNT SELECTOR */}
                <div className="amount-section">
                    <h3>Select Amount</h3>
                    
                    <div className="amount-buttons">
                        {[10, 20, 50].map((amt) => (
                            <button
                                key={amt}
                                className={amount === amt ? "amount-btn selected" : "amount-btn"}
                                onClick={() => { setAmount(amt); setCustomAmount(""); }}
                            >
                                ₹{amt}
                            </button>
                        ))}
                    </div>

                    <input
                        type="number"
                        className="custom-amount-input"
                        placeholder="Custom Amount"
                        value={customAmount}
                        onChange={(e) => { setCustomAmount(e.target.value); setAmount(null); }}
                    />
                </div>

                {/* UPI PAYMENT BUTTON */}
                {!isIOS && (
                    <button className="upi-pay-btn" onClick={handleUPIPay}>
                        💳 Pay Now via UPI
                    </button>
                )}

                {isIOS && <p className="ios-warning">📱 iPhone blocks UPI apps. Please use the QR code.</p>}

                <div className="divider">OR</div>

                {/* COPY UPI */}
                <div className="upi-id-box">
                    <p className="upi-label">UPI ID</p>
                    <p className="upi-id-large">{upiId}</p>
                    <button className="copy-btn-large" onClick={handleCopyUPI}>
                        {copied ? '✓ Copied!' : '📋 Copy UPI ID'}
                    </button>
                </div>

                {/* QR */}
                <p className="scan-text">Scan QR Code</p>
                <img src={qrCode} alt="UPI QR" className="qr-code" />
            </div>
        </div>
    );
}

export default DonateModal;
