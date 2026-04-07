// API Client for backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Helper to get auth token from localStorage
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : null;
};

// Helper to parse response
const parseResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    const error = data?.message || data?.error || 'An error occurred';
    throw new Error(error);
  }
  
  return data;
};

// Generic fetch wrapper
export const apiCall = async (endpoint, options = {}) => {
  const {
    method = 'GET',
    body = null,
    includeAuth = true,
    ...otherOptions
  } = options;

  const headers = {
    'Content-Type': 'application/json',
    ...otherOptions.headers,
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers.Authorization = token;
    }
  }

  const config = {
    method,
    headers,
    ...otherOptions,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    return await parseResponse(response);
  } catch (error) {
    console.error(`API call failed: ${endpoint}`, error);
    throw error;
  }
};

// Auth API endpoints
export const authApi = {
  register: (data) => {
    // Ensure all required fields are present
    const payload = {
      name: data.name || data.fullName || '', // Support both field names
      email: data.email || '',
      password: data.password || '',
      confirmPassword: data.confirmPassword || data.password || '',
    };
    
    return apiCall('/api/auth/register', {
      method: 'POST',
      body: payload,
      includeAuth: false,
    });
  },

  login: (data) =>
    apiCall('/api/auth/login', {
      method: 'POST',
      body: {
        email: data.email || '',
        password: data.password || '',
      },
      includeAuth: false,
    }),

  getCurrentUser: () =>
    apiCall('/api/auth/me', {
      method: 'GET',
    }),

  refreshToken: () =>
    apiCall('/api/auth/refresh', {
      method: 'POST',
    }),

  seedTestUsers: () =>
    apiCall('/api/auth/seed-test-users', {
      method: 'POST',
      includeAuth: false,
    }),
};

// Activity API endpoints
export const activityApi = {
  getAllActivities: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/api/activities${queryString ? '?' + queryString : ''}`, {
      method: 'GET',
    });
  },

  getActivityById: (id) =>
    apiCall(`/api/activities/${id}`, {
      method: 'GET',
    }),

  createActivity: (data) =>
    apiCall('/api/activities', {
      method: 'POST',
      body: data,
    }),

  updateActivity: (id, data) =>
    apiCall(`/api/activities/${id}`, {
      method: 'PUT',
      body: data,
    }),

  deleteActivity: (id) =>
    apiCall(`/api/activities/${id}`, {
      method: 'DELETE',
    }),

  searchActivities: (query) =>
    apiCall(`/api/activities/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
    }),
};

// User API endpoints
export const userApi = {
  getAllUsers: () =>
    apiCall('/api/users', {
      method: 'GET',
    }),

  getUserById: (id) =>
    apiCall(`/api/users/${id}`, {
      method: 'GET',
    }),

  updateUser: (id, data) =>
    apiCall(`/api/users/${id}`, {
      method: 'PUT',
      body: data,
    }),

  deleteUser: (id) =>
    apiCall(`/api/users/${id}`, {
      method: 'DELETE',
    }),
};

// Participation API endpoints
export const participationApi = {
  checkParticipation: (userId, activityId) =>
    apiCall(`/api/participation/check?userId=${userId}&activityId=${activityId}`, {
      method: 'GET',
    }),

  getParticipationCount: (activityId) =>
    apiCall(`/api/participation/count/${activityId}`, {
      method: 'GET',
    }),

  addParticipation: (data) =>
    apiCall('/api/participation', {
      method: 'POST',
      body: data,
    }),

  removeParticipation: (userId, activityId) =>
    apiCall(`/api/participation?userId=${userId}&activityId=${activityId}`, {
      method: 'DELETE',
    }),
};

// Notification API endpoints
export const notificationApi = {
  getAllNotifications: () =>
    apiCall('/api/notifications', {
      method: 'GET',
    }),

  getNotificationById: (id) =>
    apiCall(`/api/notifications/${id}`, {
      method: 'GET',
    }),

  createNotification: (data) =>
    apiCall('/api/notifications', {
      method: 'POST',
      body: data,
    }),

  markAsRead: (id) =>
    apiCall(`/api/notifications/${id}/read`, {
      method: 'PUT',
    }),

  deleteNotification: (id) =>
    apiCall(`/api/notifications/${id}`, {
      method: 'DELETE',
    }),
};

export default {
  authApi,
  activityApi,
  userApi,
  participationApi,
  notificationApi,
};
