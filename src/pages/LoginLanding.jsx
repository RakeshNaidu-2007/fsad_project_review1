import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginLanding.css';

export default function LoginLanding() {
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to their dashboard
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      if (role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else if (role === 'STUDENT') {
        navigate('/student', { replace: true });
      }
    }
  }, [navigate]);

  return (
    <div className="login-landing-page">
      <div className="landing-background">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="landing-content">
        <div className="landing-header">
          <div className="landing-logo">
            <span className="logo-icon">🎯</span>
            <div>
              <h1>EduManagePro</h1>
              <p>Educational Activity Management System</p>
            </div>
          </div>
        </div>

        <div className="landing-cards-container">
          <div className="landing-card admin-card">
            <div className="card-header">
              <span className="card-icon">🛡️</span>
              <h2>Admin Portal</h2>
            </div>
            <p className="card-description">
              Manage courses, track student progress, and oversee all activities.
            </p>
            <ul className="card-features">
              <li>✓ Create & manage courses</li>
              <li>✓ View all enrollments</li>
              <li>✓ Track student progress</li>
              <li>✓ System analytics</li>
            </ul>
            <Link to="/admin-login" className="btn-login admin-btn">
              Login as Admin
            </Link>
          </div>

          <div className="landing-card divider">
            <div className="divider-line" />
            <span className="divider-text">OR</span>
            <div className="divider-line" />
          </div>

          <div className="landing-card student-card">
            <div className="card-header">
              <span className="card-icon">🎓</span>
              <h2>Student Portal</h2>
            </div>
            <p className="card-description">
              Enroll in courses, submit assignments, and track your learning.
            </p>
            <ul className="card-features">
              <li>✓ Browse & enroll in courses</li>
              <li>✓ Submit assignments</li>
              <li>✓ Track progress</li>
              <li>✓ Get notifications</li>
            </ul>
            <Link to="/student-login" className="btn-login student-btn">
              Login as Student
            </Link>
          </div>
        </div>

        <div className="landing-footer">
          <p>Choose your portal to get started</p>
          <div className="features-grid">
            <div className="feature">
              <span>🚀</span>
              <p>Easy to use</p>
            </div>
            <div className="feature">
              <span>🔒</span>
              <p>Secure</p>
            </div>
            <div className="feature">
              <span>⚡</span>
              <p>Fast</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
