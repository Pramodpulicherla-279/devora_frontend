import React, { useState, useEffect, useRef } from 'react';
import AuthPopup from '../AuthPopup/AuthPopup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DonateModal from '../DonateModal/donateModal.jsx';
import logo from '../../assets/logo.png';
import './header.css';
import { API_BASE_URL } from '../../../config';

function Header({ onAboutClick, onContactClick }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    // State to manage login status. Set to `true` to see the logged-in view.
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    // Hide dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, []);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
        setIsSidebarOpen(false);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        // Check for user info in case of successful login/signup
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        setIsSidebarOpen(false);
        window.location.reload();
    };

    const handleAboutClick = (e) => {
        if (onAboutClick) {
            e.preventDefault();
            onAboutClick();
            setIsSidebarOpen(false);
        }
    };

    const handleContactClick = (e) => {
        if (onAboutClick) {
            e.preventDefault();
            onContactClick();
            setIsSidebarOpen(false);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleOpenDonate = () => {
        setIsDonateModalOpen(true);
        setIsSidebarOpen(false);
    };

    const handleCloseDonate = () => {
        setIsDonateModalOpen(false);
    };

    // const handleTermsClick = () => {
    //     navigate('/terms')
    // };
    // const handlePrivacyPolicyClick = () => {
    //     navigate('/privacy-policy')
    // };

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length < 2) {
            setResults([]);
            setShowDropdown(false);
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/api/lessons/lessons/search?q=${encodeURIComponent(value)}`);
            const data = await res.json();
            if (data.success) {
                setResults(data.data);
                setShowDropdown(true);
            }
        } catch (err) {
            setResults([]);
            setShowDropdown(false);
        }
    };

    const handleSelect = async (lesson) => {
        // Fetch lesson details to get courseSlug
        try {
            const res = await fetch(`${API_BASE_URL}/api/lessons/slug/${lesson.slug}`);
            const data = await res.json();
            if (data.success && data.data && data.data.part && data.data.part.course) {
                const courseSlug = data.data.part.course.slug;
                navigate(`/course/${courseSlug}/${lesson.slug}`);
            } else {
                // fallback: show error or do nothing
                alert('Course not found for this lesson.');
            }
        } catch (err) {
            alert('Error fetching lesson details.');
        }
        setQuery('');
        setResults([]);
        setShowDropdown(false);
    };
    return (
        <>
            <header className="header-container">
                {/* Left: Logo */}
                <div className="logo">
                    <img src={logo} alt="DevEL Logo" />
                    <p>Dev.eL</p>
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


                <button type="button" className="header-hamburger-menu" onClick={toggleSidebar}>
                    ☰
                </button>

                {/* Right: Nav and Profile */}
                <div className={`right-section ${isSidebarOpen ? 'open' : ''}`}>
                    <button type="button" className="close-sidebar" onClick={toggleSidebar}>×</button>
                    {/* Navigation Links */}
                    <div className="nav-links">
                        {location.pathname === '/' ? (
                            <>
                                <a href="/about" className="nav-link" onClick={handleAboutClick} >About</a>
                                <a href="/contact" className="nav-link" onClick={handleContactClick}>Contact</a>

                            </>
                        ) : (
                            <Link to="/" className="nav-link">Home</Link>
                        )}
                        <Link to="/privacy-policy" className="nav-link">Privacy Policy</Link>
                        <Link to="/terms" className="nav-link">Terms & Conditions</Link>
                    </div>

                    {/* Profile/Login */}
                    <div className="profile-section">
                        <button className="donate-button" onClick={handleOpenDonate}>
                            ☕ Buy Me a Coffee
                        </button>
                        {user ? (
                            <div className="profile-container">
                                <img
                                    src={`https://placehold.co/40x40/EFEFEF/4A4A4A?text=${user.name.charAt(0).toUpperCase()}`}
                                    alt="User Avatar"
                                    className="avatar"
                                />
                                <span className="user-name">{user.name}</span>
                                <button className="login-button" onClick={handleLogout}>Logout</button>
                            </div>
                        ) : (
                            <button className="login-button" onClick={handleOpenPopup}>Login</button>
                        )}
                    </div>
                </div>
                {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
            </header >
            {isPopupOpen && <AuthPopup onClose={handleClosePopup} />}
            {isDonateModalOpen && <DonateModal onClose={handleCloseDonate} />}
        </>
    );
}
const styles = {
};
export default Header;