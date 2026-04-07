# API Quick Reference

## 🚀 Import API Client

```javascript
import { 
  authApi,         // Authentication endpoints
  activityApi,     // Activity/Course endpoints
  userApi,         // User management
  participationApi, // Participation tracking
  notificationApi  // Notifications
} from '@/api/client';
```

---

## 🔐 Authentication API

### Register User
```javascript
await authApi.register({
  email: 'user@example.com',
  password: 'password123',
  name: 'John Doe',
  role: 'STUDENT' // or 'ADMIN'
});
```

### Login
```javascript
await authApi.login({
  email: 'user@example.com',
  password: 'password123'
});
// Returns: { token, refreshToken, user, message }
```

### Get Current User
```javascript
const currentUser = await authApi.getCurrentUser();
// Returns: UserDTO { id, name, email, role, isActive, createdAt, updatedAt }
```

### Refresh Token
```javascript
await authApi.refreshToken();
// Returns: { token, refreshToken, message }
```

### Seed Test Users
```javascript
await authApi.seedTestUsers();
// Creates: Admin (rakesh@gmail.com/rakesh@123) & Student (abc@gmail.com/password123)
```

---

## 📚 Activity API

### Get All Activities
```javascript
const activities = await activityApi.getAllActivities();
// Optional params: { page: 1, size: 10, sort: 'createdAt', status: 'ACTIVE' }
const filtered = await activityApi.getAllActivities({ 
  page: 0, 
  size: 20 
});
```

### Get Activity by ID
```javascript
const activity = await activityApi.getActivityById(123);
```

### Create Activity
```javascript
await activityApi.createActivity({
  title: 'New Course',
  description: 'Course description',
  instructor: 'Dr. Smith',
  duration: '6 Weeks',
  level: 'Beginner',
  category: 'Web Development'
});
```

### Update Activity
```javascript
await activityApi.updateActivity(123, {
  title: 'Updated Course Name',
  // ... other fields to update
});
```

### Delete Activity
```javascript
await activityApi.deleteActivity(123);
```

### Search Activities
```javascript
const results = await activityApi.searchActivities('React');
```

---

## 👥 User API

### Get All Users
```javascript
const users = await userApi.getAllUsers();
```

### Get User by ID
```javascript
const user = await userApi.getUserById(456);
```

### Update User
```javascript
await userApi.updateUser(456, {
  name: 'New Name',
  email: 'newemail@example.com'
});
```

### Delete User
```javascript
await userApi.deleteUser(456);
```

---

## 🤝 Participation API

### Check Participation
```javascript
const isParticipating = await participationApi.checkParticipation(
  userId, 
  activityId
);
// Returns: boolean or object
```

### Get Participation Count
```javascript
const count = await participationApi.getParticipationCount(activityId);
// Returns: { count: 42 } or number
```

### Add Participation
```javascript
await participationApi.addParticipation(userId, activityId);
// Enrolls user in activity
```

### Remove Participation
```javascript
await participationApi.removeParticipation(userId, activityId);
// Unenrolls user from activity
```

---

## 🔔 Notification API

### Get All Notifications
```javascript
const notifications = await notificationApi.getAllNotifications();
```

### Get Notification by ID
```javascript
const notification = await notificationApi.getNotificationById(notifId);
```

### Create Notification
```javascript
await notificationApi.createNotification({
  title: 'New Update',
  message: 'Something happened',
  type: 'INFO' // ALERT, WARNING, ERROR, SUCCESS, INFO
});
```

### Mark as Read
```javascript
await notificationApi.markAsRead(notifId);
```

### Delete Notification
```javascript
await notificationApi.deleteNotification(notifId);
```

---

## 🎣 React Hooks

### useAuth Hook
```javascript
import { useAuth } from '@/context/AuthContext';

const { 
  user,              // Current user object
  isAuthenticated,   // Boolean
  isLoading,         // Loading state
  error,             // Error message
  login,             // login(credentials) -> Promise
  register,          // register(userData) -> Promise
  logout,            // logout() -> void
  fetchCurrentUser   // fetchCurrentUser() -> Promise
} = useAuth();
```

### useActivities Hook
```javascript
import { useActivities } from '@/hooks/useActivities';

const {
  activities,       // Array of activities
  isLoading,        // Boolean
  error,            // Error string
  fetchAllActivities, // (params?) -> Promise
  getActivityById,  // (id) -> Promise
  createActivity,   // (data) -> Promise
  updateActivity,   // (id, data) -> Promise
  deleteActivity,   // (id) -> Promise
  searchActivities  // (query) -> Promise
} = useActivities();
```

### useParticipation Hook
```javascript
import { useParticipation } from '@/hooks/useParticipation';

const {
  isLoading,
  error,
  checkParticipation,     // (userId, activityId) -> Promise<boolean>
  getParticipationCount,  // (activityId) -> Promise<number>
  addParticipation,       // (userId, activityId) -> Promise
  removeParticipation     // (userId, activityId) -> Promise
} = useParticipation();
```

---

## 🔧 Error Handling

All API calls throw errors that you can catch:

```javascript
try {
  const data = await activityApi.getActivityById(123);
} catch (error) {
  console.error(error.message); // Human-readable error
  // Handle error in UI
}
```

Within hooks/context:

```javascript
const { user, error, isLoading } = useAuth();

if (error) {
  return <div className="error">{error}</div>;
}
```

---

## 📝 Examples in Components

### Login Component
```javascript
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const { login, error, isLoading } = useAuth();
  const navigate = useNavigate();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email: credential, password });
      navigate('/home');
    } catch (err) {
      // Error already in context
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input 
        value={credential} 
        onChange={(e) => setCredential(e.target.value)} 
        placeholder="Email"
        disabled={isLoading}
      />
      <input 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        type="password"
        placeholder="Password"
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### Course List Component
```javascript
import { useActivities } from '@/hooks/useActivities';
import { useEffect } from 'react';

export default function CourseList() {
  const { activities, isLoading, error, fetchAllActivities } = useActivities();

  useEffect(() => {
    fetchAllActivities();
  }, []);

  if (isLoading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="course-list">
      {activities.map(course => (
        <div key={course.id} className="course-card">
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p>By: {course.instructor}</p>
          <p>Duration: {course.duration}</p>
        </div>
      ))}
    </div>
  );
}
```

### Enrollment Component
```javascript
import { useParticipation } from '@/hooks/useParticipation';
import { useAuth } from '@/context/AuthContext';

export default function EnrollButton({ activityId }) {
  const { user } = useAuth();
  const { addParticipation, checkParticipation, isLoading } = useParticipation();
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    const check = async () => {
      const isEnrolled = await checkParticipation(user.id, activityId);
      setEnrolled(isEnrolled);
    };
    check();
  }, [user.id, activityId]);

  const handleEnroll = async () => {
    try {
      await addParticipation(user.id, activityId);
      setEnrolled(true);
    } catch (error) {
      console.error('Enrollment failed:', error);
    }
  };

  return (
    <button 
      onClick={handleEnroll} 
      disabled={enrolled || isLoading}
    >
      {enrolled ? 'Enrolled' : 'Enroll Now'}
    </button>
  );
}
```

---

## 🌐 Environment Variables

### Development (.env.development)
```env
VITE_API_URL=http://localhost:8080
```

### Production (.env.production)
```env
VITE_API_URL=https://api.yourdomain.com
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🔑 Token Management

Tokens are automatically managed:
- Stored in `localStorage` after login
- Sent with every request in `Authorization` header
- Format: `Bearer <token>`

Manual token access:
```javascript
const token = localStorage.getItem('token');
const refreshToken = localStorage.getItem('refreshToken');

// Clear tokens (logout)
localStorage.removeItem('token');
localStorage.removeItem('refreshToken');
```

---

## 📊 Response Format

Most endpoints return:
```javascript
{
  data: { /* actual data */ },
  message: "Success message",
  status: 200
}
```

API client automatically extracts `data` property.

---

## 🚨 Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized (token expired/invalid) |
| 403 | Forbidden (no permission) |
| 404 | Not Found |
| 500 | Server Error |

---

## 💡 Pro Tips

1. **Always use try-catch** with API calls
2. **Show loading states** while fetching
3. **Wrap component** with `<AuthProvider>` for auth context
4. **Check token** before operations: `localStorage.getItem('token')`
5. **Use hooks** instead of calling API client directly for state sync
6. **Clear localStorage** on logout
7. **Handle 401 errors** by redirecting to login
8. **Test endpoints** with Postman first if unsure

---

## 🔗 Related Files

- API Client: `src/api/client.js`
- Auth Context: `src/context/AuthContext.jsx`
- Activity Hook: `src/hooks/useActivities.js`
- Participation Hook: `src/hooks/useParticipation.js`
- Config: `.env.development`, `.env.production`
- Vite Config: `vite.config.js`

