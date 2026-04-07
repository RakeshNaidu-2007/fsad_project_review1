import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginLanding from './pages/LoginLanding';
import AdminLogin from './pages/AdminLogin';
import StudentLogin from './pages/StudentLogin';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import CreateCourse from './pages/CreateCourse';
import CourseList from './pages/CourseList';
import EnrollCourse from './pages/EnrollCourse';
import AssignmentSubmit from './pages/AssignmentSubmit';
import { AuthProvider } from './context/AuthContext';
import { activityApi } from './api/client';
import './App.css';

function AppContent({ 
  courses, 
  enrolledCourses, 
  setEnrolledCourses, 
  submissions, 
  setSubmissions, 
  addCourse, 
  deleteCourse, 
  enrollCourse, 
  unenrollCourse, 
  addSubmission, 
  loadingCourses 
}) {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location]);

  if (loadingCourses && (location.pathname !== '/' && location.pathname !== '/admin-login' && location.pathname !== '/student-login')) {
    return (
      <div className="app-wrapper">
        <div className="loading-container">
          <p>Loading activities...</p>
        </div>
      </div>
    );
  }

  const noNavbarRoutes = ['/', '/admin-login', '/student-login'];
  const shouldShowNavbar = isAuthenticated && !noNavbarRoutes.includes(location.pathname);

  return (
    <div className="app-wrapper">
      {shouldShowNavbar && <Navbar />}
      <main className={shouldShowNavbar ? 'main-content' : 'main-content-full'}>
        <Routes>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/" element={<LoginLanding />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard
                  courses={courses}
                  deleteCourse={deleteCourse}
                  enrolledCourses={enrolledCourses}
                  submissions={submissions}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student"
            element={
              <ProtectedRoute role="STUDENT">
                <StudentDashboard
                  courses={courses}
                  enrolledCourses={enrolledCourses}
                  enrollCourse={enrollCourse}
                  unenrollCourse={unenrollCourse}
                  submissions={submissions}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home courses={courses} enrollCourse={enrollCourse} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-course"
            element={
              <ProtectedRoute role="ADMIN">
                <CreateCourse addCourse={addCourse} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <CourseList courses={courses} enrollCourse={enrollCourse} enrolledCourses={enrolledCourses} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/enroll"
            element={
              <ProtectedRoute>
                <EnrollCourse courses={courses} enrollCourse={enrollCourse} enrolledCourses={enrolledCourses} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/submit-assignment"
            element={
              <ProtectedRoute role="STUDENT">
                <AssignmentSubmit enrolledCourses={enrolledCourses} addSubmission={addSubmission} />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  // Fetch activities from backend on app mount
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoadingCourses(true);
        const data = await activityApi.getAllActivities();
        const activities = Array.isArray(data) ? data : data.data || [];
        setCourses(activities);
      } catch (error) {
        console.error('Failed to fetch activities:', error);
        setCourses([]);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchActivities();
  }, []);

  const addCourse = (course) => {
    const newCourse = { ...course, id: course.id || Date.now() };
    setCourses((prev) => [...prev, newCourse]);
  };

  const deleteCourse = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    setEnrolledCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const enrollCourse = (course) => {
    if (!enrolledCourses.find((c) => c.id === course.id)) {
      setEnrolledCourses((prev) => [...prev, course]);
    }
  };

  const unenrollCourse = (id) => {
    setEnrolledCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const addSubmission = (submission) => {
    setSubmissions((prev) => [...prev, submission]);
  };

  return (
    <Router>
      <AuthProvider>
        <AppContent
          courses={courses}
          enrolledCourses={enrolledCourses}
          setEnrolledCourses={setEnrolledCourses}
          submissions={submissions}
          setSubmissions={setSubmissions}
          addCourse={addCourse}
          deleteCourse={deleteCourse}
          enrollCourse={enrollCourse}
          unenrollCourse={unenrollCourse}
          addSubmission={addSubmission}
          loadingCourses={loadingCourses}
        />
      </AuthProvider>
    </Router>
  );
}

export default App;
