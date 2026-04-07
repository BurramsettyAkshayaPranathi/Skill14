# Auth System - Backend (Spring Boot)

## Setup Instructions

### Prerequisites
- Java 17 or higher
- MySQL Server running
- Maven 3.6+

### Database Setup
1. Create a MySQL database:
```sql
CREATE DATABASE auth_db;
```

2. The Spring Boot application will automatically create the `users` table when you run it (via JPA/Hibernate).

### Configuration
Update `src/main/resources/application.properties` with your MySQL credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/auth_db
spring.datasource.username=root
spring.datasource.password=root
```

### Running the Backend
1. Navigate to the backend folder
2. Run the following command:
```bash
mvn clean install
mvn spring-boot:run
```

The server will start on `http://localhost:8080`

## API Endpoints

### Register User
**POST** `/api/auth/register`
```json
{
  "username": "john_doe",
  "password": "password123",
  "email": "john@example.com",
  "fullName": "John Doe",
  "phoneNumber": "1234567890",
  "address": "123 Main St",
  "city": "Boston",
  "country": "USA"
}
```

### Login User
**POST** `/api/auth/login`
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

### Get User Profile
**GET** `/api/auth/profile/{userId}`

### Get User by Username
**GET** `/api/auth/user/{username}`

### Update User Profile
**PUT** `/api/auth/profile/{userId}`
```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "phoneNumber": "9876543210",
  "address": "456 Oak St",
  "city": "New York",
  "country": "USA"
}
```

### Logout
**POST** `/api/auth/logout`

## Notes
- The backend runs on port 8080
- CORS is enabled for React frontend at `http://localhost:3000`
- Database credentials should be updated before running in production
