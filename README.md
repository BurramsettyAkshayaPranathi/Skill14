# Auth System - Full Stack User Authentication

A complete full-stack authentication system built with **React** (Frontend) and **Spring Boot** (Backend). This project demonstrates user registration, login, session management, and profile management.

## 📁 Project Structure

```
skill-14/
├── frontend/           # React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── backend/            # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/auth/
│   │   │   │   ├── controller/
│   │   │   │   ├── model/
│   │   │   │   ├── repository/
│   │   │   │   ├── service/
│   │   │   │   └── AuthSystemApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   ├── pom.xml
│   └── README.md
├── .gitignore
└── README.md (this file)
```

## 🎯 Features Implemented

✅ **User Registration**
- Register new users with username, email, and password
- Store user details in MySQL database
- Form validation

✅ **User Login**
- Authenticate users with username and password
- Store authentication token/user info in localStorage
- Session management

✅ **Home Page**
- Protected route that requires authentication
- Display welcome message with user information
- Navigation to Profile and Logout

✅ **User Profile**
- View complete user profile information
- Edit and update profile details
- Upload/modify additional user information (phone, address, city, country)

✅ **Logout**
- Clear session from localStorage
- Redirect to login page
- Prevent access to protected routes

✅ **Navigation**
- Responsive navbar with Home, Profile, and Logout links
- Navigation links on all pages
- Proper routing and redirects

✅ **Styling**
- Clean and modern UI design
- Responsive design for mobile and desktop
- Gradient backgrounds and smooth transitions
- Form validation feedback

## 🚀 Quick Start

### Prerequisites
- **Java 11+** and **Maven** (for backend)
- **Node.js 14+** and **npm** (for frontend)
- **MySQL** database server

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Create MySQL database:
```sql
CREATE DATABASE auth_db;
```

3. Update database credentials in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/auth_db
spring.datasource.username=root
spring.datasource.password=root
```

4. Run the Spring Boot application:
```bash
mvn clean install
mvn spring-boot:run
```

Backend will run on `http://localhost:8080`

### Frontend Setup

1. Open another terminal and navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React application:
```bash
npm start
```

Frontend will open at `http://localhost:3000`

## 📋 API Endpoints

All endpoints require CORS header for cross-origin requests.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile/{userId}` | Get user profile |
| GET | `/api/auth/user/{username}` | Get user by username |
| PUT | `/api/auth/profile/{userId}` | Update user profile |
| POST | `/api/auth/logout` | Logout user |

## 🔐 Authentication Flow

1. **Registration**: User fills register form → Backend validates and saves → Redirect to login
2. **Login**: User enters credentials → Backend validates → Returns userId and username → Store in localStorage
3. **Session Management**: Check localStorage on page load → If no session, redirect to login
4. **Protected Routes**: Home and Profile require authentication → Check localStorage → Redirect if not logged in
5. **Logout**: Clear localStorage → Redirect to login page

## 📱 React Components

### Login Component (`src/components/Login.js`)
- Form for user login
- Calls backend API
- Stores user info in localStorage
- Redirects to home on success

### Register Component (`src/components/Register.js`)
- Form for user registration
- Validates input
- Calls backend API
- Redirects to login on success

### Home Component (`src/components/Home.js`)
- Protected route
- Displays welcome message
- Shows user information from localStorage
- Navigation links to Profile and Logout

### Profile Component (`src/components/Profile.js`)
- Protected route
- Fetches full user profile from backend
- Edit mode for updating profile
- Shows all user details

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    userId BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    fullName VARCHAR(100),
    phoneNumber VARCHAR(20),
    address VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100)
);
```

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - UI framework
- **React Router DOM 6.15.0** - Client-side routing
- **Axios 1.5.0** - HTTP client
- **CSS3** - Styling

### Backend
- **Spring Boot 3.1.5** - Web framework
- **Spring Data JPA** - ORM
- **MySQL** - Database
- **Lombok** - Reduce boilerplate
- **Maven** - Build tool

## 📝 Default Test Credentials

After running the application:

1. **Register** a new user with credentials
2. **Login** with those credentials

For testing:
- Username: `testuser`
- Password: `password123`
- Email: `test@example.com`

## ⚠️ Security Notes

**IMPORTANT**: This is a learning project. For production use:

1. ✅ Hash passwords using BCrypt or similar
2. ✅ Use JWT tokens instead of storing userId in localStorage
3. ✅ Implement HTTPS
4. ✅ Use secure, httpOnly cookies for tokens
5. ✅ Add input validation and sanitization
6. ✅ Implement rate limiting
7. ✅ Use CSRF protection
8. ✅ Environment variables for configuration

## 🐛 Troubleshooting

**Backend won't start?**
- Check MySQL is running
- Verify database exists
- Check database credentials in application.properties

**Frontend can't connect to backend?**
- Verify backend is running on port 8080
- Check CORS configuration in AuthSystemApplication.java
- Check API URL in `frontend/src/utils/api.js`

**Login/Register not working?**
- Check browser console for errors
- Verify backend API logs
- Check network tab in browser developer tools

## 📚 Learning Resources

This project demonstrates:
- React hooks (useState, useEffect)
- React Router for client-side routing
- Component lifecycle and state management
- API integration with axios
- Form handling and validation
- localStorage for session management
- Spring Boot REST controllers
- JPA/Hibernate for database operations
- MySQL database design
- CORS handling
- Authentication flow

## 🤝 Next Steps

To enhance this project:
1. Add JWT token-based authentication
2. Implement email verification
3. Add password reset functionality
4. Implement refresh tokens
5. Add role-based access control (RBAC)
6. Add file upload for profile picture
7. Implement two-factor authentication
8. Add activity logging
9. Implement search and filtering
10. Deploy to cloud (Azure, AWS, Heroku)

## 📄 License

This project is for educational purposes.

## ✨ Author

Created as SKILL-14 exercise for Full Stack Development learning.

---

**Happy Coding!** 🚀
