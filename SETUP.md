# Complete Setup Guide

This guide will help you set up and run the full-stack authentication system.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Running the Application](#running-the-application)
6. [Testing the Application](#testing-the-application)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software
- **Java JDK 11 or higher**
  - Download: https://www.oracle.com/java/technologies/downloads/
  - Verify: `java -version`

- **Apache Maven 3.6 or higher**
  - Download: https://maven.apache.org/download.cgi
  - Verify: `mvn -v`

- **Node.js 14+ and npm**
  - Download: https://nodejs.org/
  - Verify: `node -v` and `npm -v`

- **MySQL 8.0**
  - Download: https://dev.mysql.com/downloads/mysql/
  - Or use Docker (see below)

- **Git** (for version control)
  - Download: https://git-scm.com/

## Database Setup

### Option A: Using MySQL Directly

1. **Start MySQL Server**
   - On Windows: `net start MySQL80` (or your version)
   - On Mac: `brew services start mysql`
   - On Linux: `sudo service mysql start`

2. **Create Database and User**
   ```bash
   mysql -u root -p
   ```

3. **Execute in MySQL:**
   ```sql
   CREATE DATABASE auth_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   
   CREATE USER 'auth_user'@'localhost' IDENTIFIED BY 'auth_password';
   
   GRANT ALL PRIVILEGES ON auth_db.* TO 'auth_user'@'localhost';
   
   FLUSH PRIVILEGES;
   
   EXIT;
   ```

### Option B: Using Docker Compose (Recommended)

1. **Install Docker**
   - Download: https://www.docker.com/products/docker-desktop

2. **Start Database Container**
   ```bash
   cd skill-14
   docker-compose up -d
   ```

3. **Verify Container is Running**
   ```bash
   docker ps
   ```

## Backend Setup

1. **Navigate to Backend Directory**
   ```bash
   cd skill-14/backend
   ```

2. **Update Database Configuration** (if not using defaults)
   - Edit: `src/main/resources/application.properties`
   - Update MySQL credentials if needed

3. **Build the Project**
   ```bash
   mvn clean install
   ```

4. **Run Spring Boot Application**
   ```bash
   mvn spring-boot:run
   ```

5. **Verify Backend is Running**
   - Open browser: http://localhost:8080
   - Check console for "Started AuthSystemApplication"

**Note**: On first run, Hibernate will automatically create the `users` table based on the `User` entity.

## Frontend Setup

1. **Open New Terminal Window**

2. **Navigate to Frontend Directory**
   ```bash
   cd skill-14/frontend
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start React Application**
   ```bash
   npm start
   ```

5. **React App Will Automatically Open**
   - URL: http://localhost:3000
   - If not, manually open in browser

## Running the Application

### Terminal 1 - Database (if using Docker)
```bash
cd skill-14
docker-compose up
```

### Terminal 2 - Backend
```bash
cd skill-14/backend
mvn spring-boot:run
```

### Terminal 3 - Frontend
```bash
cd skill-14/frontend
npm start
```

**Expected Output:**
- Terminal 1: MySQL container running
- Terminal 2: Spring Boot started on port 8080
- Terminal 3: React app on http://localhost:3000

## Testing the Application

### 1. Register a New User
1. Go to http://localhost:3000
2. You'll be redirected to `/login`
3. Click "Register here"
4. Fill in the registration form:
   - Username: `john_doe`
   - Email: `john@example.com`
   - Password: `password123`
   - Full Name: `John Doe`
   - Phone: `1234567890`
   - Address: `123 Main St`
   - City: `Boston`
   - Country: `USA`
5. Click "Register"
6. You'll be redirected to login page

### 2. Login
1. Enter username: `john_doe`
2. Enter password: `password123`
3. Click "Login"
4. You'll be redirected to `/home`

### 3. View Home Page
- Welcome message displays
- User info shows (username, email, userId)
- Navigation bar visible with Home, Profile, Logout

### 4. View Profile
1. Click "Profile" in navigation
2. View full user details
3. Click "Edit Profile"
4. Update any field
5. Click "Save Changes"
6. Changes appear immediately

### 5. Logout
1. Click "Logout" button
2. Session is cleared
3. Redirected to login page
4. Try accessing `/home` - redirected to login

## Troubleshooting

### Backend Issues

**Error: "Connection refused" when starting backend**
- MySQL is not running
- Solution: Start MySQL service or Docker container

**Error: "Port 8080 already in use"**
- Another application is using port 8080
- Solution: Change port in `application.properties` or kill the process

**Error: "Unknown database 'auth_db'"**
- Database not created
- Solution: Run the SQL commands in Database Setup section

**Database table not created**
- Check MySQL logs
- Verify Hibernate ddl-auto is set to "update" in application.properties

### Frontend Issues

**Error: "npm: command not found"**
- Node.js not installed
- Solution: Download and install Node.js from https://nodejs.org/

**Error: "Cannot connect to backend"**
- Backend not running on port 8080
- Solution: Verify backend terminal shows "Started AuthSystemApplication"

**Error: "Module not found"**
- Dependencies not installed
- Solution: Run `npm install` in frontend directory

**Blank page after login**
- Check browser console (F12) for errors
- Verify API calls in Network tab
- Clear localStorage and try again

### Database Issues

**Error: "Access denied for user 'root'@'localhost'"**
- Wrong password
- Solution: Verify MySQL password and credentials in application.properties

**Port 3306 already in use**
- Another MySQL instance running
- Solution: Stop other MySQL service or change port

## Environment Variables (Optional)

Create `.env` file in frontend root:
```
REACT_APP_API_URL=http://localhost:8080/api/auth
```

Create `.env` file in backend root:
```
MYSQL_URL=jdbc:mysql://localhost:3306/auth_db
MYSQL_USERNAME=root
MYSQL_PASSWORD=root
```

## Common Commands

### Backend
```bash
# Build
mvn clean install

# Run
mvn spring-boot:run

# Run tests
mvn test

# Build JAR
mvn clean package
```

### Frontend
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Docker
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Access MySQL
docker exec -it auth_db mysql -u auth_user -p
```

## Performance Tips

1. **Clear Browser Cache**: Ctrl+Shift+Delete (if experiencing caching issues)
2. **Check Console**: F12 in browser to see any errors
3. **Monitor Network**: Use Network tab to see API calls
4. **Database**: Verify MySQL has adequate resources
5. **Dependencies**: Keep npm and Maven packages updated

## Security Reminders

⚠️ **This is a learning project!**

Before production deployment:
- [ ] Implement password hashing (BCrypt)
- [ ] Use JWT tokens instead of localStorage
- [ ] Enable HTTPS
- [ ] Add input validation
- [ ] Implement rate limiting
- [ ] Use environment variables for secrets
- [ ] Add CSRF protection
- [ ] Implement logging and monitoring

## Next Steps

1. Understand the code flow
2. Modify features as needed
3. Deploy to cloud platform
4. Implement additional security features
5. Add unit and integration tests
6. Set up CI/CD pipeline

## Support

For issues:
1. Check console logs (F12 in browser)
2. Check backend terminal
3. Verify database is running
4. Review error messages carefully
5. Check GitHub issues if pushing to repository

---

**Ready to code!** 🚀
