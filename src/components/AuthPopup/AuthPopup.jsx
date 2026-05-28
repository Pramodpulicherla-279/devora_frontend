import React, { useState } from 'react';
import './AuthPopup.css';
import { API_BASE_URL } from '../../../config';

/* ── Eye toggle icons ── */
function EyeOpen() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}
function EyeOff() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    );
}

/* ── Reusable password field with show/hide toggle ── */
function PasswordInput({ label, placeholder, value, onChange, required = true }) {
    const [visible, setVisible] = useState(false);
    return (
        <div className="ap-field">
            <label className="ap-label">{label}</label>
            <div className="ap-input-wrap">
                <input
                    className="ap-input"
                    type={visible ? 'text' : 'password'}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    autoComplete="off"
                />
                <button
                    type="button"
                    className="ap-eye-btn"
                    onClick={() => setVisible(v => !v)}
                    tabIndex={-1}
                    aria-label={visible ? 'Hide password' : 'Show password'}
                >
                    {visible ? <EyeOpen /> : <EyeOff />}
                </button>
            </div>
        </div>
    );
}

function AuthPopup({ onClose }) {
    const [isLoginView, setIsLoginView] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const clearForm = () => {
        setName(''); setEmail(''); setMobile('');
        setPassword(''); setConfirmPassword(''); setError('');
    };

    const switchView = (login) => { setIsLoginView(login); clearForm(); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!isLoginView && password !== confirmPassword) {
            setError('Passwords do not match. Please try again.');
            return;
        }

        setIsLoading(true);
        const url = isLoginView ? '/api/users/login' : '/api/users/register';
        const payload = isLoginView
            ? { email, password }
            : { name, email, mobile, password };

        try {
            const res = await fetch(API_BASE_URL + url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error || 'Something went wrong');
            localStorage.setItem('userInfo', JSON.stringify(data));
            onClose();
            window.location.reload();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ap-overlay" onClick={onClose}>
            <div className="ap-card" onClick={e => e.stopPropagation()}>

                {/* Top gradient stripe */}
                <div className="ap-stripe" />

                {/* Close */}
                <button className="ap-close" onClick={onClose} aria-label="Close">✕</button>

                {/* Brand */}
                <div className="ap-brand">
                    <div className="ap-brand-logo">Dev<span className="ap-dot">.</span>EL</div>
                    <p className="ap-brand-sub">Your interactive developer education platform</p>
                </div>

                {/* Tab switcher */}
                <div className="ap-tabs">
                    <button className={`ap-tab ${isLoginView ? 'active' : ''}`} onClick={() => switchView(true)}>Login</button>
                    <button className={`ap-tab ${!isLoginView ? 'active' : ''}`} onClick={() => switchView(false)}>Sign Up</button>
                    <div className="ap-tab-slider" style={{ transform: isLoginView ? 'translateX(0%)' : 'translateX(100%)' }} />
                </div>

                {/* Form */}
                <form className="ap-form" onSubmit={handleSubmit} noValidate>
                    {error && (
                        <div className="ap-error">
                            <span className="ap-error-icon">⚠</span>
                            {error}
                        </div>
                    )}

                    {!isLoginView && (
                        <div className="ap-field">
                            <label className="ap-label">Full Name</label>
                            <input
                                className="ap-input"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="ap-field">
                        <label className="ap-label">Email Address</label>
                        <input
                            className="ap-input"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <PasswordInput
                        label="Password"
                        placeholder="••••••••"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    {!isLoginView && (
                        <>
                            <PasswordInput
                                label="Confirm Password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                            <div className="ap-field">
                                <label className="ap-label">Mobile Number <span className="ap-optional">(optional)</span></label>
                                <input
                                    className="ap-input"
                                    type="tel"
                                    placeholder="+1 234 567 8900"
                                    value={mobile}
                                    onChange={e => setMobile(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    <button className="ap-submit" type="submit" disabled={isLoading}>
                        {isLoading
                            ? <span className="ap-spinner" />
                            : (isLoginView ? 'Login →' : 'Create Account →')}
                    </button>
                </form>

                {/* Switch */}
                <p className="ap-switch">
                    {isLoginView ? "Don't have an account? " : 'Already have an account? '}
                    <button className="ap-switch-btn" onClick={() => switchView(!isLoginView)}>
                        {isLoginView ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default AuthPopup;
