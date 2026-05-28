import React, { useState, useEffect, useRef } from 'react';
import AuthPopup from '../AuthPopup/AuthPopup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DonateModal from '../DonateModal/donateModal.jsx';
import logo from '../../assets/logo.png';
import './header.css';
import { API_BASE_URL } from '../../../config';

function Header({ onAboutClick, onContactClick }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(null);

    // Close search dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Load user from localStorage
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) setUser(JSON.parse(userInfo));
    }, []);

    // Lock body scroll when sidebar is open
    useEffect(() => {
        document.body.style.overflow = isSidebarOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isSidebarOpen]);

    const openPopup = () => { setIsPopupOpen(true); setIsSidebarOpen(false); };
    const closePopup = () => {
        setIsPopupOpen(false);
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) setUser(JSON.parse(userInfo));
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        setIsSidebarOpen(false);
        window.location.reload();
    };

    const handleAboutClick = (e) => {
        if (onAboutClick) { e.preventDefault(); onAboutClick(); setIsSidebarOpen(false); }
    };
    const handleContactClick = (e) => {
        if (onContactClick) { e.preventDefault(); onContactClick(); setIsSidebarOpen(false); }
    };

    const openDonate = () => { setIsDonateModalOpen(true); setIsSidebarOpen(false); };
    const closeDonate = () => setIsDonateModalOpen(false);

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length < 2) { setResults([]); setShowDropdown(false); return; }
        try {
            const res = await fetch(`${API_BASE_URL}/api/lessons/lessons/search?q=${encodeURIComponent(value)}`);
            const data = await res.json();
            if (data.success) { setResults(data.data); setShowDropdown(true); }
        } catch { setResults([]); setShowDropdown(false); }
    };

    const handleSelect = async (lesson) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/lessons/slug/${lesson.slug}`);
            const data = await res.json();
            if (data.success && data.data?.part?.course) {
                navigate(`/course/${data.data.part.course.slug}/${lesson.slug}`);
            } else {
                alert('Course not found for this lesson.');
            }
        } catch { alert('Error fetching lesson details.'); }
        setQuery(''); setResults([]); setShowDropdown(false);
    };

    return (
        <>
            <header className="header-container">

                {/* ── LEFT: Logo + Search ── */}
                <div className="hdr-left">
                    <Link to="/" className="hdr-logo">
                        <img src={logo} alt="Dev.eL" />
                        <span>Dev<span className="hdr-dot">.</span>eL</span>
                    </Link>

                    <div className="lesson-search-bar" ref={searchRef}>
                        <input
                            type="text"
                            placeholder="Search lessons..."
                            value={query}
                            onChange={handleSearch}
                            onFocus={() => setShowDropdown(results.length > 0)}
                        />
                        {showDropdown && results.length > 0 && (
                            <ul className="search-dropdown">
                                {results.map(lesson => (
                                    <li key={lesson.slug} onClick={() => handleSelect(lesson)}>
                                        {lesson.title}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* ── RIGHT (desktop): Nav links + profile ── */}
                <div className="hdr-right">
                    <nav className="hdr-nav-links">
                        {location.pathname === '/' ? (
                            <>
                                <a href="/about"   className="hdr-nav-link" onClick={handleAboutClick}>About</a>
                                <a href="/contact" className="hdr-nav-link" onClick={handleContactClick}>Contact</a>
                            </>
                        ) : (
                            <Link to="/" className="hdr-nav-link">Home</Link>
                        )}
                        <Link to="/privacy-policy" className="hdr-nav-link">Privacy Policy</Link>
                        <Link to="/terms"           className="hdr-nav-link">Terms</Link>
                    </nav>

                    <div className="hdr-profile">
                        <button className="donate-button" onClick={openDonate}>☕ Buy Me a Coffee</button>
                        {user ? (
                            <div className="hdr-user">
                                <Link to="/profile" className="hdr-avatar" title="My Profile">{user.name.charAt(0).toUpperCase()}</Link>
                                <Link to="/profile" className="hdr-username">{user.name}</Link>
                                <button className="hdr-logout-btn" onClick={handleLogout}>Logout</button>
                            </div>
                        ) : (
                            <button className="hdr-login-btn hdr-desktop-only" onClick={openPopup}>Login</button>
                        )}
                    </div>
                </div>

                {/* ── MOBILE BAR: login (guest) + hamburger ── */}
                <div className="hdr-mobile-bar">
                    {!user && (
                        <button className="hdr-login-btn" onClick={openPopup}>Login</button>
                    )}
                    {user && (
                        <Link to="/profile" className="hdr-avatar hdr-avatar-mobile" title="My Profile">
                            {user.name.charAt(0).toUpperCase()}
                        </Link>
                    )}
                    <button className="hdr-hamburger" onClick={() => setIsSidebarOpen(true)} aria-label="Open menu">
                        ☰
                    </button>
                </div>

                {/* ── MOBILE SIDEBAR DRAWER ── */}
                <nav className={`hdr-sidebar ${isSidebarOpen ? 'open' : ''}`}>

                    {/* Sidebar header */}
                    <div className="hdr-sb-head">
                        <Link to="/" className="hdr-sb-brand" onClick={() => setIsSidebarOpen(false)}>
                            <img src={logo} alt="Dev.eL" />
                            <span>Dev<span className="hdr-dot">.</span>eL</span>
                        </Link>
                        <button className="hdr-sb-close" onClick={() => setIsSidebarOpen(false)}>✕</button>
                    </div>

                    {/* Nav links */}
                    <div className="hdr-sb-links">
                        {location.pathname === '/' ? (
                            <>
                                <a href="/about"   className="hdr-sb-link" onClick={handleAboutClick}>About</a>
                                <a href="/contact" className="hdr-sb-link" onClick={handleContactClick}>Contact</a>
                            </>
                        ) : (
                            <Link to="/" className="hdr-sb-link" onClick={() => setIsSidebarOpen(false)}>Home</Link>
                        )}
                        <Link to="/privacy-policy" className="hdr-sb-link" onClick={() => setIsSidebarOpen(false)}>Privacy Policy</Link>
                        <Link to="/terms"           className="hdr-sb-link" onClick={() => setIsSidebarOpen(false)}>Terms & Conditions</Link>
                    </div>

                    {/* Bottom: user section + coffee */}
                    <div className="hdr-sb-bottom">
                        <div className="hdr-sb-sep" />
                        {user ? (
                            <>
                                <Link to="/profile" className="hdr-sb-user" onClick={() => setIsSidebarOpen(false)} style={{ textDecoration: 'none' }}>
                                    <div className="hdr-avatar">{user.name.charAt(0).toUpperCase()}</div>
                                    <div className="hdr-sb-user-info">
                                        <span className="hdr-sb-uname">{user.name}</span>
                                        <span className="hdr-sb-ustatus">View Profile →</span>
                                    </div>
                                </Link>
                                <button className="hdr-sb-logout" onClick={handleLogout}>Logout</button>
                            </>
                        ) : null}
                        <button className="hdr-sb-coffee" onClick={openDonate}>☕ Buy Me a Coffee</button>
                    </div>
                </nav>

                {/* Overlay */}
                {isSidebarOpen && <div className="hdr-overlay" onClick={() => setIsSidebarOpen(false)} />}

            </header>

            {isPopupOpen      && <AuthPopup    onClose={closePopup}  />}
            {isDonateModalOpen && <DonateModal onClose={closeDonate} />}
        </>
    );
}

export default Header;
