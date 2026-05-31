import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../../../config';
import logo from '../../assets/logo.png';

export default function ResetPasswordScreen() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/reset-password/${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Something went wrong');
      setDone(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)',
      padding: '24px', fontFamily: 'Inter, -apple-system, sans-serif',
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', textDecoration: 'none' }}>
        <img src={logo} alt="Dev.EL" style={{ height: '28px' }} />
        <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
          Dev<span style={{ color: '#7c3aed' }}>.</span>EL
        </span>
      </Link>

      <div style={{
        background: '#fff', borderRadius: '20px', padding: '40px 36px',
        width: '100%', maxWidth: '420px',
        boxShadow: '0 8px 40px rgba(15,23,42,0.12)',
        border: '1px solid rgba(124,58,237,0.08)',
      }}>
        {/* Top stripe */}
        <div style={{
          height: '4px', borderRadius: '4px 4px 0 0',
          background: 'linear-gradient(90deg, #7c3aed, #2563eb, #0ea5e9)',
          margin: '-40px -36px 32px',
        }} />

        {done ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>
              Password reset!
            </h2>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 20px' }}>
              Your password has been updated. Redirecting you to the home page…
            </p>
            <Link to="/" style={{
              display: 'inline-block', padding: '10px 24px',
              background: '#7c3aed', color: '#fff', borderRadius: '9px',
              textDecoration: 'none', fontWeight: 600, fontSize: '14px',
            }}>
              Go to Home →
            </Link>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>
              Set a new password
            </h2>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 24px' }}>
              Choose a strong password you haven't used before.
            </p>

            {error && (
              <div style={{
                background: '#fef2f2', border: '1.5px solid #fca5a5',
                borderRadius: '9px', padding: '10px 14px',
                fontSize: '13px', color: '#dc2626', marginBottom: '16px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span>⚠</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* New password */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPw ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoFocus
                    style={{
                      width: '100%', padding: '10px 40px 10px 14px',
                      border: '1.5px solid #e2e8f0', borderRadius: '9px',
                      fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                      fontFamily: 'inherit', color: '#0f172a', background: '#fff',
                      WebkitBoxShadow: '0 0 0 50px #fff inset',
                      transition: 'border-color 0.15s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#7c3aed'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(v => !v)}
                    style={{
                      position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0,
                    }}
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                  >
                    {showPw ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Confirm Password
                </label>
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                  style={{
                    width: '100%', padding: '10px 14px',
                    border: '1.5px solid #e2e8f0', borderRadius: '9px',
                    fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                    fontFamily: 'inherit', color: '#0f172a', background: '#fff',
                    WebkitBoxShadow: '0 0 0 50px #fff inset',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#7c3aed'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !password || !confirm}
                style={{
                  padding: '12px', borderRadius: '10px', border: 'none',
                  background: loading || !password || !confirm ? '#c4b5fd' : '#7c3aed',
                  color: '#fff', fontSize: '15px', fontWeight: 700,
                  cursor: loading || !password || !confirm ? 'not-allowed' : 'pointer',
                  transition: 'background 0.15s', marginTop: '4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
              >
                {loading ? (
                  <span style={{
                    width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.4)',
                    borderTop: '2px solid #fff', borderRadius: '50%',
                    animation: 'rp-spin 0.7s linear infinite', display: 'inline-block',
                  }} />
                ) : 'Reset Password →'}
              </button>
            </form>

            <p style={{ textAlign: 'center', fontSize: '13px', color: '#64748b', marginTop: '20px', marginBottom: 0 }}>
              <Link to="/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                ← Back to Home
              </Link>
            </p>
          </>
        )}
      </div>

      <style>{`@keyframes rp-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
