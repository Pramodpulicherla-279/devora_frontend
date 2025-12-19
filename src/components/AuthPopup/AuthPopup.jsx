import React, { useState } from 'react';
import './AuthPopup.css';
import { API_BASE_URL } from '../../../config';



function AuthPopup({ onClose }) {
    const [isLoginView, setIsLoginView] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const clearForm = () => {
        setName('');
        setEmail('');
        setMobile('');
        setPassword('');
        setError('');
    };

    const handleSwitch = () => {
        setIsLoginView(!isLoginView);
        clearForm();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        const url = isLoginView ? '/api/users/login' : '/api/users/register';
        const payload = isLoginView 
            ? { email, password } 
            : { name, email, mobile, password };

        try {
            const response = await fetch(API_BASE_URL + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Something went wrong');
            }

            // On success, store token and user data, then close popup
            localStorage.setItem('userInfo', JSON.stringify(data));
            window.location.reload();
            onClose();

        } catch (err) {
            setError(err.message);
        }
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
                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    {!isLoginView && (
                        <input className="form-input" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    )}
                    <input className="form-input" type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input className="form-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {!isLoginView && (
                        <input className="form-input" type="text" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
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