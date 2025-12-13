import React, { useState } from 'react';
import './donateModal.css';
import qrCode from '../../assets/upi-qr-code.jpeg';

function DonateModal({ onClose }) {
    const [amount, setAmount] = useState(10);
    const [customAmount, setCustomAmount] = useState('');
    const [copied, setCopied] = useState(false);

    const upiId = 'pramod.pulicherla@ybl';
    const name = 'Pramod Pulicherla';

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    const handleCopyUPI = () => {
        navigator.clipboard.writeText(upiId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // --- CRITICAL CHANGE ---
    // For personal UPI IDs, we CANNOT send the amount (am) or note (tn) in the link.
    // If we do, GPay/PhonePe will block the transaction for security.
    // We only send the Payee Address (pa), Name (pn), and Currency (cu).
    // We also add mc=0000 to suggest a generic transaction.
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&cu=INR&mc=0000`;

    return (
        <div className="donate-modal-overlay" onClick={onClose}>
            <div className="donate-modal-content" onClick={(e) => e.stopPropagation()}>

                <button className="close-btn" onClick={onClose}>×</button>
                <h2>☕ Buy Me a Coffee</h2>
                <p>Your support keeps my work going ❤️</p>

                {/* NOTE: Since we can't pre-fill the amount in the app, 
                    we show the selected amount visually here as a guide only */}
                <div className="amount-section">
                    <h3>Amount to Pay</h3>
                    
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
                    <p style={{fontSize: '0.8rem', color: '#666', marginTop: '5px'}}>
                        *You will need to enter this amount in your UPI app.
                    </p>
                </div>

                {/* PAY BUTTON */}
                {!isIOS ? (
                    <a 
                        href={upiLink} 
                        className="upi-pay-btn" 
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}
                        target="_blank"
                        rel="noreferrer"
                    >
                        💳 Open UPI App
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
                <p className="scan-text">Scan QR Code (Recommended)</p>
                <img src={qrCode} alt="UPI QR" className="qr-code" />
            </div>
        </div>
    );
}

export default DonateModal;