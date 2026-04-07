# Activity Management System - Full Stack Application

A comprehensive full-stack web application built with **React + Vite** (frontend) and **Spring Boot + MongoDB** (backend) for managing activities, courses, and user participation.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Frontend Components](#frontend-components)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Features](#features)
- [Environment Configuration](#environment-configuration)

---

## 🎯 Project Overview

This is a full-stack Activity Management System that allows users to:
- Register and authenticate as students or admins
- Create, view, and enroll in activities/courses
- Manage user participations and enrollments
- Receive real-time notifications
- Access role-based dashboards (Admin/Student)

**Deployment:** Vercel (auto-deployed from Git)

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool (lightning-fast development)
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Styling
- **ESLint** - Code quality

### Backend
- **Spring Boot 3.2.0** - Java framework
- **Java 17** - Programming language
- **MongoDB** - NoSQL database (Atlas cloud)
- **Spring Data MongoDB** - MongoDB ORM layer
- **Spring Security** - Authentication & authorization
- **JWT (jjwt)** - Token-based authentication
- **Maven 3.9.11** - Build tool

### Database
- **MongoDB Atlas** - Cloud-hosted MongoDB
- **Collection:** users, activities, participations, notifications

---

## 📁 Project Structure

```
new@fsd/
├── public/                          # Static assets
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Navigation bar
│   │   └── Navbar.css
│   ├── pages/
│   │   ├── Home.jsx / Home.css      # Landing page
│   │   ├── AdminDashboard.jsx       # Admin control panel
│   │   ├── StudentDashboard.jsx     # Student portal
│   │   ├── CourseList.jsx           # Browse activities/courses
│   │   ├── CreateCourse.jsx         # Create new activity (Admin)
│   │   ├── EnrollCourse.jsx         # Enroll in courses
│   │   ├── AssignmentSubmit.jsx     # Submit assignments
│   │   ├── and corresponding CSS files
│   ├── App.jsx                      # Main app component
│   ├── main.jsx                     # Entry point
│   ├── index.css                    # Global styles
│   └── assets/                      # Images & media
├── package.json
├── vite.config.js
├── eslint.config.js
├── vercel.json                      # Vercel deployment config
├── index.html

backend/                             # Spring Boot backend folder
├── src/main/java/com/fsd/activitymanagement/
│   ├── entity/                      # MongoDB documents
│   │   ├── User.java
│   │   ├── Activity.java
│   │   ├── Participation.java
│   │   └── Notification.java
│   ├── repository/                  # Data access layer
│   │   ├── UserRepository.java
│   │   ├── ActivityRepository.java
│   │   ├── ParticipationRepository.java
│   │   └── NotificationRepository.java
│   ├── service/                     # Business logic
│   │   ├── UserService.java
│   │   ├── ActivityService.java
│   │   ├── ParticipationService.java
│   │   └── NotificationService.java
│   ├── controller/                  # REST endpoints
│   │   ├── AuthController.java
│   │   ├── UserController.java
│   │   ├── ActivityController.java
│   │   ├── ParticipationController.java
│   │   └── NotificationController.java
│   ├── dto/                         # Data Transfer Objects
│   ├── security/                    # JWT & authorization
│   │   ├── JwtTokenProvider.java
│   │   └── CustomUserDetailsService.java
│   └── ActivityManagementBackendApplication.java
├── pom.xml                          # Maven dependencies
└── application.properties           # Database config
```

---

## 🎨 Frontend Components

### **Navbar.jsx**
- Navigation menu with links to all pages
- User authentication status display
- Logout functionality
- Role-based menu items (Admin/Student)

### **Home.jsx**
- Landing page
- Welcome message
- Quick links to key features
- Featured activities/courses showcase

### **AdminDashboard.jsx**
- Admin-only view (role-based access)
- Create/manage activities
- View all users and participations
- System statistics and analytics

### **StudentDashboard.jsx**
- Student portal
- View enrolled courses
- Track participation status
- View notifications

### **CourseList.jsx**
- Browse all available activities/courses
- Filter and search functionality
- View course details
- Enroll button

### **CreateCourse.jsx**
- Form to create new activities (Admin only)
- Input fields: title, description, date, location, details
- Form validation
- Success/error messages

### **EnrollCourse.jsx**
- Manage course enrollments
- View enrollment confirmation
- Participation status tracking

### **AssignmentSubmit.jsx**
- Submit assignments for enrolled activities
- File upload capability (if applicable)
- Submission history

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** v16+ (for frontend)
- **Java 17** JDK (for backend)
- **Maven 3.9.11** (for backend)
- **MongoDB Atlas** account (for database)

### Step 1: Clone the Repository
```bash
cd c:\Users\B.RakeshNaidu\OneDrive\Desktop\new@fsd 1\new@fsd
```

### Step 2: Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Opens at http://localhost:5173
```

### Step 3: Backend Setup
```bash
cd backend

# Compile the project
mvn clean compile

# Build & package
mvn clean package -DskipTests

# Or run directly with Maven
mvn spring-boot:run
# Server runs at http://localhost:8080
```

---

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Frontend:**
```bash
cd c:\Users\B.RakeshNaidu\OneDrive\Desktop\new@fsd 1\new@fsd
npm run dev
```
Frontend will be available at: `http://localhost:5173`

**Terminal 2 - Backend:**
```bash
cd c:\Users\B.RakeshNaidu\OneDrive\Desktop\new@fsd 1\new@fsd\backend
mvn spring-boot:run
```
Backend will be available at: `http://localhost:8080`

### Production Build

**Frontend:**
```bash
npm run build    # Creates optimized build in dist/
npm run preview  # Preview production build locally
```

**Backend:**
```bash
mvn clean package  # Creates JAR in target/
java -jar target/activity-management-backend-1.0.0.jar
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users/{id}` - Get user profile
- `PUT /api/users/{id}` - Update user profile
- `GET /api/users` - List all users (Admin)
- `DELETE /api/users/{id}` - Delete user (Admin)

### Activities/Courses
- `GET /api/activities` - List all activities
- `GET /api/activities/{id}` - Get activity details
- `POST /api/activities` - Create activity (Admin)
- `PUT /api/activities/{id}` - Update activity (Admin)
- `DELETE /api/activities/{id}` - Delete activity (Admin)
- `GET /api/activities/active` - Get active activities

### Participations
- `GET /api/participations` - List participations
- `GET /api/participations/{id}` - Get participation details
- `POST /api/participations` - Enroll in activity
- `PUT /api/participations/{id}` - Update participation status
- `DELETE /api/participations/{id}` - Withdraw from activity

### Notifications
- `GET /api/notifications` - Get user notifications
- `GET /api/notifications/unread` - Get unread notifications
- `PUT /api/notifications/{id}/read` - Mark as read
- `DELETE /api/notifications/{id}` - Delete notification

---

## 💾 Database Schema

### users Collection
```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String (Unique)",
  "password": "String (Hashed)",
  "role": "STUDENT | ADMIN",
  "isActive": "Boolean",
  "createdActivities": [DBRef to Activity],
  "participations": [DBRef to Participation],
  "notifications": [DBRef to Notification],
  "createdAt": "LocalDateTime",
  "updatedAt": "LocalDateTime"
}
```

### activities Collection
```json
{
  "_id": "ObjectId",
  "title": "String",
  "description": "String",
  "activityDate": "LocalDate",
  "location": "String",
  "details": "String",
  "isActive": "Boolean",
  "createdBy": "DBRef to User",
  "participations": [DBRef to Participation],
  "createdAt": "LocalDateTime",
  "updatedAt": "LocalDateTime"
}
```

### participations Collection
```json
{
  "_id": "ObjectId",
  "user": "DBRef to User",
  "activity": "DBRef to Activity",
  "status": "JOINED | COMPLETED | WITHDREW",
  "createdAt": "LocalDateTime",
  "updatedAt": "LocalDateTime"
}
```

### notifications Collection
```json
{
  "_id": "ObjectId",
  "user": "DBRef to User",
  "message": "String",
  "isRead": "Boolean",
  "type": "INFO | WARNING | SUCCESS | ERROR",
  "relatedActivityId": "String",
  "createdAt": "LocalDateTime"
}
```

---

## ✨ Features

### User Management
- ✅ User registration & login with JWT authentication
- ✅ Role-based access control (Student/Admin)
- ✅ User profile management
- ✅ Account activation/deactivation

### Activity/Course Management
- ✅ Create, read, update, delete activities (Admin)
- ✅ Active/inactive status tracking
- ✅ Activity filtering and search
- ✅ Date and location-based filtering

### Enrollment System
- ✅ Enroll in activities
- ✅ Track participation status
- ✅ Withdraw from activities
- ✅ View enrollment history

### Notifications
- ✅ Real-time notification system
- ✅ Mark notifications as read
- ✅ Notification history
- ✅ Different notification types (info, warning, success)

### Admin Features
- ✅ Admin dashboard with system overview
- ✅ User management (view/delete)
- ✅ Activity management
- ✅ Participation tracking
- ✅ System analytics

### Student Features
- ✅ Student dashboard with enrolled courses
- ✅ Browse available activities
- ✅ Enroll in courses
- ✅ View participation status
- ✅ Receive notifications

---

## 🔐 Environment Configuration

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=Activity Management System
```

### Backend (application.properties)
```properties
# Server
server.port=8080

# MongoDB Atlas Connection
spring.data.mongodb.uri=mongodb+srv://USERNAME:PASSWORD@Cluster0.mongodb.net/activity_management_db?retryWrites=true&w=majority

# Security - JWT
jwt.secret=your-secret-key-here
jwt.expiration=86400000

# Application
spring.application.name=activity-management-backend
```

### MongoDB Atlas Setup
1. Create MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a cluster (Cluster0)
3. Create database user with credentials
4. Get connection string
5. Add connection string to `application.properties`

**Current Credentials (Already Configured):**
- Database User: `2400032757_db_user`
- Database: `activity_management_db`
- Cluster: `Cluster0`

---

## 🐛 Troubleshooting

### Frontend Issues
- **Port 5173 already in use:** `npm run dev -- --port 5174`
- **Module not found:** Delete `node_modules` and run `npm install` again

### Backend Issues
- **Compilation error:** Ensure Java 17 is installed and JAVA_HOME is set
- **MongoDB connection failed:** Verify MongoDB Atlas URI and network access
- **Port 8080 already in use:** Change port in `application.properties`: `server.port=8081`

### Database Issues
- **Collections not found:** Manually create collections in MongoDB Atlas
- **Authentication failed:** Verify database user credentials

---

## 📝 Notes

- **Frontend deployed on:** Vercel (auto-deploy on git push)
- **Backend deployment:** Ready for AWS/Azure/GCP deployment
- **API Documentation:** Available at `/api/swagger-ui.html` (if Swagger enabled)
- **CORS:** Configured to accept requests from localhost:5173 and Vercel domains

---

## 👥 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

---

## 📂 Additional Files

- `vercel.json` - Vercel deployment configuration
- `package.json` - Frontend dependencies & scripts
- `pom.xml` - Backend dependencies & build configuration
- `eslint.config.js` - Code quality rules

---

**Last Updated:** April 7, 2026
**Status:** ✅ Production Ready (Backend fully compiled & packaged with MongoDB configured)
