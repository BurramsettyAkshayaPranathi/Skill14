# API Documentation

## Base URL
```
http://localhost:8080/api/auth
```

## Authentication
Currently, the API uses localStorage for session management. Include user ID in subsequent requests.

Future: Will implement JWT tokens for better security.

---

## Endpoints

### 1. Register User

**Endpoint:** `POST /register`

**Description:** Register a new user account

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "password123",
  "email": "john@example.com",
  "fullName": "John Doe",
  "phoneNumber": "1234567890",
  "address": "123 Main Street",
  "city": "Boston",
  "country": "USA"
}
```

**Query Parameters:** None

**Required Fields:**
- `username` (string): Unique username
- `password` (string): User password
- `email` (string): Valid email address

**Optional Fields:**
- `fullName` (string): User's full name
- `phoneNumber` (string): Contact number
- `address` (string): Street address
- `city` (string): City name
- `country` (string): Country name

**Success Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "userId": 1,
  "username": "john_doe"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Username already exists"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Email already exists"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "password123",
    "email": "john@example.com",
    "fullName": "John Doe"
  }'
```

---

### 2. Login User

**Endpoint:** `POST /login`

**Description:** Authenticate user with username and password

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

**Query Parameters:** None

**Required Fields:**
- `username` (string): User's username
- `password` (string): User's password

**Success Response (200 OK):**
```json
{
  "message": "Login successful",
  "userId": 1,
  "username": "john_doe",
  "email": "john@example.com"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": "User not found"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": "Invalid credentials"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "password123"
  }'
```

---

### 3. Get User Profile

**Endpoint:** `GET /profile/{userId}`

**Description:** Retrieve complete user profile information

**Path Parameters:**
- `userId` (long): The user's ID

**Query Parameters:** None

**Request Body:** None

**Success Response (200 OK):**
```json
{
  "userId": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "fullName": "John Doe",
  "phoneNumber": "1234567890",
  "address": "123 Main Street",
  "city": "Boston",
  "country": "USA"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "User not found"
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:8080/api/auth/profile/1 \
  -H "Content-Type: application/json"
```

---

### 4. Get User by Username

**Endpoint:** `GET /user/{username}`

**Description:** Retrieve user information using username

**Path Parameters:**
- `username` (string): The user's username

**Query Parameters:** None

**Request Body:** None

**Success Response (200 OK):**
```json
{
  "userId": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "fullName": "John Doe",
  "phoneNumber": "1234567890",
  "address": "123 Main Street",
  "city": "Boston",
  "country": "USA"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "User not found"
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:8080/api/auth/user/john_doe \
  -H "Content-Type: application/json"
```

---

### 5. Update User Profile

**Endpoint:** `PUT /profile/{userId}`

**Description:** Update user profile information

**Path Parameters:**
- `userId` (long): The user's ID

**Query Parameters:** None

**Request Body:** (All fields are optional)
```json
{
  "fullName": "John Updated",
  "email": "newemail@example.com",
  "phoneNumber": "9876543210",
  "address": "456 Oak Avenue",
  "city": "New York",
  "country": "USA"
}
```

**Updatable Fields:**
- `fullName` (string)
- `email` (string)
- `phoneNumber` (string)
- `address` (string)
- `city` (string)
- `country` (string)

**Non-updatable Fields:**
- `username` (cannot be changed)
- `password` (requires separate endpoint)
- `userId` (immutable)

**Success Response (200 OK):**
```json
{
  "userId": 1,
  "username": "john_doe",
  "email": "newemail@example.com",
  "fullName": "John Updated",
  "phoneNumber": "9876543210",
  "address": "456 Oak Avenue",
  "city": "New York",
  "country": "USA"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "User not found"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "error": "Failed to update profile"
}
```

**cURL Example:**
```bash
curl -X PUT http://localhost:8080/api/auth/profile/1 \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Updated",
    "phoneNumber": "9876543210"
  }'
```

---

### 6. Logout User

**Endpoint:** `POST /logout`

**Description:** Logout the current user (clears session)

**Path Parameters:** None

**Query Parameters:** None

**Request Body:** None

**Success Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8080/api/logout \
  -H "Content-Type: application/json"
```

---

## HTTP Status Codes

| Code | Status | Meaning |
|------|--------|---------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid input or request |
| 401 | Unauthorized | Authentication failed |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server error |

---

## CORS Configuration

The API is configured to accept requests from:
- **Origin:** `http://localhost:3000`
- **Methods:** GET, POST, PUT, DELETE, OPTIONS
- **Headers:** Content-Type, Authorization (custom)
- **Credentials:** Allowed

---

## Request/Response Flow

### Registration Flow
```
Client: POST /register
Server: Validates input
Server: Checks if username/email exists
Server: Saves user to database
Server: Returns 201 with userId
Client: Stores info and redirects to login
```

### Login Flow
```
Client: POST /login with username & password
Server: Validates credentials
Server: Returns userId and username
Client: Stores in localStorage
Client: Redirects to /home
```

### Profile Fetch Flow
```
Client: GET /profile/{userId} (userId from localStorage)
Server: Fetches user from database
Server: Returns full user object
Client: Displays profile
```

### Profile Update Flow
```
Client: PUT /profile/{userId} with updated data
Server: Validates and updates fields
Server: Saves to database
Server: Returns updated user object
Client: Updates local state
```

---

## Example Code - JavaScript/React

### Register User
```javascript
async function registerUser(userData) {
  const response = await fetch('http://localhost:8080/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
  return await response.json();
}

// Usage
const user = await registerUser({
  username: 'john_doe',
  password: 'password123',
  email: 'john@example.com'
});
```

### Login User
```javascript
async function loginUser(username, password) {
  const response = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  
  // Store in localStorage
  localStorage.setItem('userId', data.userId);
  localStorage.setItem('username', data.username);
  
  return data;
}
```

### Get Profile
```javascript
async function getProfile(userId) {
  const response = await fetch(`http://localhost:8080/api/auth/profile/${userId}`);
  return await response.json();
}

// Usage
const profile = await getProfile(userId);
```

### Update Profile
```javascript
async function updateProfile(userId, updates) {
  const response = await fetch(`http://localhost:8080/api/auth/profile/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates)
  });
  return await response.json();
}

// Usage
const updated = await updateProfile(userId, {
  fullName: 'Jane Doe',
  phoneNumber: '9876543210'
});
```

---

## Example Code - cURL

### Register User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "test123",
    "email": "test@example.com",
    "fullName": "Test User"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "test123"
  }'
```

### Get Profile
```bash
curl -X GET http://localhost:8080/api/auth/profile/1
```

### Update Profile
```bash
curl -X PUT http://localhost:8080/api/auth/profile/1 \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Updated Name",
    "phoneNumber": "5555555555"
  }'
```

---

## Error Handling

Always check for error responses:

```javascript
try {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    const error = await response.json();
    console.error('Error:', error.error);
    // Handle error appropriately
  }
  
  const data = await response.json();
  // Handle success
} catch (err) {
  console.error('Network error:', err);
}
```

---

## Rate Limiting

Currently, there is no rate limiting. For production, implement:
- Max 10 login attempts per IP per hour
- Max 3 registration attempts per IP per day
- General API rate: 100 requests per minute

---

## Future Enhancements

- [ ] JWT Token authentication
- [ ] OAuth 2.0 integration
- [ ] Two-factor authentication
- [ ] Password reset via email
- [ ] API versioning (v1, v2, etc.)
- [ ] Request/response logging
- [ ] API analytics
- [ ] Webhook support

---

## Support

For API issues or questions:
1. Check error messages carefully
2. Verify backend is running
3. Check CORS configuration
4. Review browser console
5. Check Network tab in DevTools

---

**Last Updated:** March 2026
**API Version:** 1.0.0
