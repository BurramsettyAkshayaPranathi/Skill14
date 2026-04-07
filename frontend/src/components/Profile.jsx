import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../utils/api';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    country: '',
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn || !userId) {
      navigate('/login');
      return;
    }

    fetchUserProfile(userId);
  }, [navigate]);

  const fetchUserProfile = async (userId) => {
    try {
      setLoading(true);
      const response = await getUserProfile(userId);
      setUser(response.data);
      setFormData({
        fullName: response.data.fullName || '',
        email: response.data.email || '',
        phoneNumber: response.data.phoneNumber || '',
        address: response.data.address || '',
        city: response.data.city || '',
        country: response.data.country || '',
      });
      setError('');
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userId = localStorage.getItem('userId');
      const response = await updateUserProfile(userId, formData);
      setUser(response.data);
      setSuccess('Profile updated successfully!');
      setEditing(false);
      setError('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('isLoggedIn');
    alert('You have been logged out.');
    navigate('/login');
  };

  if (loading && !user) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <nav className="navbar">
        <div className="nav-brand">Auth System</div>
        <ul className="nav-links">
          <li><a href="/home">Home</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        </ul>
      </nav>

      <div className="profile-content">
        <div className="profile-header">
          <h1>User Profile</h1>
          <button
            onClick={() => setEditing(!editing)}
            className={`btn ${editing ? 'btn-cancel' : 'btn-edit'}`}
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {user && (
          <div className="profile-box">
            {!editing ? (
              <div className="profile-view">
                <div className="profile-item">
                  <label>Username:</label>
                  <span>{user.username}</span>
                </div>
                <div className="profile-item">
                  <label>Email:</label>
                  <span>{user.email}</span>
                </div>
                <div className="profile-item">
                  <label>Full Name:</label>
                  <span>{user.fullName || 'Not provided'}</span>
                </div>
                <div className="profile-item">
                  <label>Phone Number:</label>
                  <span>{user.phoneNumber || 'Not provided'}</span>
                </div>
                <div className="profile-item">
                  <label>Address:</label>
                  <span>{user.address || 'Not provided'}</span>
                </div>
                <div className="profile-item">
                  <label>City:</label>
                  <span>{user.city || 'Not provided'}</span>
                </div>
                <div className="profile-item">
                  <label>Country:</label>
                  <span>{user.country || 'Not provided'}</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSave} className="profile-form">
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    value={user.username}
                    disabled
                    className="disabled-input"
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number:</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>City:</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Country:</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary">
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
