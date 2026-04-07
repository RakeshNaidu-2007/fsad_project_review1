import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './StudentLogin.css';

export default function StudentLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login
        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok && data.data.user.role === 'STUDENT') {
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('userId', data.data.user.id);
          localStorage.setItem('role', data.data.user.role);
          localStorage.setItem('userName', data.data.user.name);
          navigate('/student');
        } else if (!response.ok) {
          setError(data.message || 'Login failed');
        } else {
          setError('Only students can access the student portal');
        }
      } else {
        // Register
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:8080/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('userId', data.data.user.id);
          localStorage.setItem('role', data.data.user.role);
          localStorage.setItem('userName', data.data.user.name);
          navigate('/student');
        } else {
          // Show detailed error message
          setError(data.message || 'Registration failed - check your input');
        }
      }
    } catch (err) {
      setError('Error connecting to server: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-login-container">
      <div className="student-login-card">
        <div className="student-login-header">
          <div className="student-icon">👨‍🎓</div>
          <h1>Student Portal</h1>
          <p>{isLogin ? 'Welcome back! Login to your account' : 'Create your student account'}</p>
        </div>

        <form onSubmit={handleSubmit} className="student-login-form">
          {error && <div className="error-message">{error}</div>}

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? (isLogin ? 'Logging in...' : 'Creating account...') : (isLogin ? 'Login to Student Dashboard' : 'Create Account')}
          </button>
        </form>

        <div className="login-footer">
          <button
            type="button"
            className="toggle-button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
          >
            {isLogin ? "Don't have an account? Register here" : 'Already have an account? Login here'}
          </button>
          <p className="admin-link"><a href="/admin-login">Login as Admin</a></p>
          <p className="home-link"><a href="/">← Back to Home</a></p>
        </div>
      </div>
    </div>
  );
}
