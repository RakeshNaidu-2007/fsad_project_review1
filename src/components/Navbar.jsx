import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Load user from localStorage
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('userName');
        const role = localStorage.getItem('role');
        if (token && userName) {
            setUser({ name: userName, role });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('userName');
        setUser(null);
        setMenuOpen(false);
        navigate('/');
    };

    const links = [
        { to: '/', label: 'Home', icon: '🏠' },
        { to: '/courses', label: 'Courses', icon: '📚' },
        ...(user?.role === 'ADMIN' ? [{ to: '/admin', label: 'Dashboard', icon: '🛡️' }] : []),
        ...(user?.role === 'STUDENT' ? [{ to: '/student', label: 'Dashboard', icon: '🎓' }] : []),
    ];

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <NavLink to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
                    <span className="brand-icon">🎯</span>
                    <span className="brand-text">
                        EduManage<span className="brand-accent">Pro</span>
                    </span>
                </NavLink>

                <button
                    className={`hamburger ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>

                <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    {links.map(({ to, label, icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                            end={to === '/'}
                        >
                            <span className="nav-icon">{icon}</span>
                            {label}
                        </NavLink>
                    ))}

                    {user?.role === 'STUDENT' && (
                        <NavLink
                            to="/submit-assignment"
                            className={({ isActive }) => `nav-link btn-cta ${isActive ? 'active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            ✏️ Submit
                        </NavLink>
                    )}

                    {user ? (
                        <div className="user-section">
                            <span className="user-info">
                                <span className="user-icon">👤</span>
                                <span className="user-name">{user.name}</span>
                            </span>
                            <button className="btn-logout" onClick={handleLogout}>
                                🚪 Logout
                            </button>
                        </div>
                    ) : (
                        <div className="auth-section">
                            <NavLink
                                to="/admin-login"
                                className="nav-link btn-admin"
                                onClick={() => setMenuOpen(false)}
                            >
                                🛡️ Admin
                            </NavLink>
                            <NavLink
                                to="/student-login"
                                className="nav-link btn-student"
                                onClick={() => setMenuOpen(false)}
                            >
                                🎓 Student
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
