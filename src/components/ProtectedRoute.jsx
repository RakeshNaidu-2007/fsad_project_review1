import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, role = null }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  // Check if user is authenticated
  if (!token) {
    // Redirect to appropriate login based on role requirement
    if (role === 'ADMIN') {
      return <Navigate to="/admin-login" replace />;
    } else if (role === 'STUDENT') {
      return <Navigate to="/student-login" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Check if user has the required role
  if (role && userRole !== role) {
    // Redirect to their dashboard instead
    if (userRole === 'ADMIN') {
      return <Navigate to="/admin" replace />;
    } else if (userRole === 'STUDENT') {
      return <Navigate to="/student" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}
