import React, { useState } from 'react';
import './AuthPopup.css';

function AuthPopup({ onClose }) {
    const [isLoginView, setIsLoginView] = useState(true);

    const handleSwitch = () => {
        setIsLoginView(!isLoginView);
    };

    // Prevent clicks inside the popup from closing it
    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={handleContentClick}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>{isLoginView ? 'Login' : 'Sign Up'}</h2>
                <form>
                    {!isLoginView && (
                        <input className="form-input" type="text" placeholder="Full Name" required />
                    )}
                    <input className="form-input" type="email" placeholder="Email Address" required />
                    <input className="form-input" type="password" placeholder="Password" required />
                    {!isLoginView && (
                        <input className="form-input" type="text" placeholder="Mobile NUmber" required />
                    )}
                    <button className="form-button" type="submit">
                        {isLoginView ? 'Login' : 'Create Account'}
                    </button>
                </form>
                <p className="switch-auth">
                    {isLoginView ? "Don't have an account? " : "Already have an account? "}
                    <a href="#" className="switch-auth-link" onClick={handleSwitch}>
                        {isLoginView ? 'Sign Up' : 'Login'}
                    </a>
                </p>
            </div>
        </div>
    );
}

export default AuthPopup;