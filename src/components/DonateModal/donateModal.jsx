import React, { useState } from 'react';
import './donateModal.css';
import qrCode from '../../assets/upi-qr-code.jpeg';

function DonateModal({ onClose }) {
    const [amount, setAmount] = useState(10);
    const [customAmount, setCustomAmount] = useState('');
    const [copied, setCopied] = useState(false);

    const upiId = 'pramod.pulichrla@ybl';
    const name = 'Pramod Pulicherla';

    // Detect if device is iPhone (iOS UPI links are notoriously unreliable)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    const handleCopyUPI = () => {
        navigator.clipboard.writeText(upiId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Helper to get the valid amount
    const getFinalAmount = () => {
        const val = customAmount ? parseFloat(customAmount) : amount;
        return val && val > 0 ? val.toFixed(2) : "0.00"; // FIX: UPI requires 2 decimal places (e.g. 10.00)
    };

    const finalAmount = getFinalAmount();

    // Construct the UPI Link dynamically
    // We use the standard upi:// scheme which works on most Android phones
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${finalAmount}&cu=INR&tn=Donation`;

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
                                className={amount === amt && !customAmount ? "amount-btn selected" : "amount-btn"}
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
                        onChange={(e) => setCustomAmount(e.target.value)}
                    />
                </div>

                {/* UPI PAYMENT BUTTON - CHANGED TO ANCHOR TAG */}
                {!isIOS ? (
                    <a 
                        href={upiLink} 
                        className="upi-pay-btn" 
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}
                        target="_blank"
                        rel="noreferrer"
                    >
                        💳 Pay Now via UPI
                    </a>
                ) : (
                    <p className="ios-warning">📱 iPhone users: Please scan the QR code below.</p>
                )}

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