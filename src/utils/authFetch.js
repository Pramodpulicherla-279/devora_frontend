/**
 * authFetch — authenticated wrapper around the native fetch API.
 *
 * What it does:
 *   1. Reads the current JWT from localStorage automatically.
 *   2. Adds the `Authorization: Bearer <token>` header to every request.
 *   3. After the response arrives, checks for the `X-New-Token` header.
 *      The backend `protect` middleware always sets this with a fresh 1-day
 *      token, so every API call from an active user silently resets the
 *      inactivity clock without any extra round-trip.
 *   4. Returns the response unchanged — callers use it exactly like fetch().
 *
 * Usage:
 *   import { authFetch } from '../../utils/authFetch';
 *
 *   const res = await authFetch(`${API_BASE_URL}/api/progress/courses/${id}`);
 *   const res = await authFetch(url, { method: 'POST', body: JSON.stringify(data) });
 */
export async function authFetch(url, options = {}) {
    // Always read the latest token from localStorage (may have been refreshed
    // by a concurrent request on another tab or a previous call this session).
    const raw = localStorage.getItem('userInfo');
    const userInfo = raw ? JSON.parse(raw) : null;
    const token = userInfo?.token;

    const headers = {
        'Content-Type': 'application/json',
        ...( options.headers || {} ),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(url, { ...options, headers });

    // ── Token expired / unauthorised ───────────────────────────────────────
    // Clear stored credentials and tell the Header to open the login popup.
    if (response.status === 401) {
        localStorage.removeItem('userInfo');
        window.dispatchEvent(new Event('auth-expired'));
        return response;
    }
    // ───────────────────────────────────────────────────────────────────────

    // ── Sliding-expiry token rotation ──────────────────────────────────────
    // If the backend issued a fresh token (X-New-Token header), silently
    // update localStorage so the next request carries the renewed token.
    const newToken = response.headers.get('X-New-Token');
    if (newToken && userInfo) {
        localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, token: newToken }));
    }
    // ───────────────────────────────────────────────────────────────────────

    return response;
}
