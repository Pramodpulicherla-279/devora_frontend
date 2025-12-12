import React from 'react';
import './DonateModal.css';
import qrCode from '../../assets/upi-qr-code.jpeg';
function DonateModal({ onClose }) {
    return (
        <div className="donate-modal-overlay" onClick={onClose}>
            <div className="donate-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>☕ Buy Me a Coffee</h2>
                <p>Support my work! Scan the QR code below</p>
                <img 
                    src={qrCode} 
                    alt="UPI QR Code" 
                    className="qr-code"
                />
                <p className="upi-id">UPI ID: pramod.pulicherla@ybl</p>
            </div>
        </div>
    );
}

export default DonateModal;