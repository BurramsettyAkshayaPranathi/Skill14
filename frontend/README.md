# Auth System - Frontend (Vite + React)

## Prerequisites
- Node.js 14+ 
- npm or yarn

## Installation & Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, for custom API URL):
```
VITE_API_URL=http://localhost:8080/api/auth
```

## Running the Application

Start the Vite development server:
```bash
npm start
```

The application will open at `http://localhost:5173` by default

## Project Structure

```
src/
├── components/          # React components
│   ├── Login.jsx       # Login component
│   ├── Register.jsx    # Registration component
│   ├── Home.jsx        # Home page (protected)
│   └── Profile.jsx     # User profile page
├── utils/
│   └── api.js          # API service calls
├── styles/             # CSS files
│   ├── App.css
│   ├── Auth.css
│   ├── Home.css
│   └── Profile.css
├── App.js              # Main App component with routing
└── main.jsx            # Vite entry point
```

## Features

- **User Registration**: Create new user accounts with email validation
- **User Login**: Authenticate with username and password
- **Session Management**: Store user info in localStorage
- **Protected Routes**: Home and Profile pages require authentication
- **User Profile**: View and edit user information
- **Logout**: Clear session and redirect to login
- **Responsive Design**: Works on desktop and mobile devices

## Available Routes

- `/login` - Login page
- `/register` - Registration page
- `/home` - Home page (requires login)
- `/profile` - User profile page (requires login)

## Notes

- The backend API is expected to run on `http://localhost:8080`
- Set `VITE_API_URL` if you want to point the frontend to a different backend
- User authentication data is stored in localStorage
- For production, use httpOnly cookies instead of localStorage
- Implement proper password encryption/hashing in backend
