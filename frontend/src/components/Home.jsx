import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');

    if (!isLoggedIn || !username) {
      navigate('/login');
    } else {
      setUser({
        username,
        userId: localStorage.getItem('userId'),
        email: localStorage.getItem('email'),
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('isLoggedIn');

    alert('You have been logged out.');
    navigate('/login');
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-brand">Auth System</div>
        <ul className="nav-links">
          <li><a href="/home">Home</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        </ul>
      </nav>

      <div className="home-content">
        <div className="welcome-card">
          <h1>Welcome, {user.username}!</h1>
          <p>You are successfully logged in to the Auth System.</p>

          <div className="info-section">
            <h2>Your Information</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.userId}</p>
          </div>

          <div className="action-buttons">
            <a href="/profile" className="btn btn-secondary">View Full Profile</a>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        </div>

        <div className="info-card">
          <h3>About This Application</h3>
          <p>
            This is a full-stack authentication system built with React and Spring Boot.
            It demonstrates user registration, login, session management, and profile management.
          </p>
          <ul>
            <li>User registration with validation</li>
            <li>Secure login with credentials</li>
            <li>Session management using localStorage</li>
            <li>Profile management and updates</li>
            <li>Responsive UI design</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
