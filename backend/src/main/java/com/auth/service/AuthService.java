package com.auth.service;

import com.auth.model.User;
import com.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    // Register a new user
    public User registerUser(User user) {
        validateRequiredFields(user);

        user.setUsername(user.getUsername().trim());
        user.setPassword(user.getPassword().trim());
        user.setEmail(user.getEmail().trim());

        // Check if username already exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        
        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        
        // Save the user (in a real application, password should be encrypted)
        return userRepository.save(user);
    }
    
    // Login user - validate credentials
    public User loginUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        
        // Check password (in a real application, use password encryption/hashing)
        if (!user.get().getPassword().equals(password)) {
            throw new RuntimeException("Invalid credentials");
        }
        
        return user.get();
    }
    
    // Get user profile by userId
    public User getUserProfile(Long userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    // Get user by username
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    // Update user profile
    public User updateUserProfile(Long userId, User updatedUser) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (updatedUser.getFullName() != null) {
            user.setFullName(updatedUser.getFullName());
        }
        if (updatedUser.getEmail() != null) {
            String email = updatedUser.getEmail().trim();
            if (email.isEmpty()) {
                throw new RuntimeException("Email cannot be empty");
            }

            Optional<User> existingUser = userRepository.findByEmail(email);
            if (existingUser.isPresent() && !existingUser.get().getUserId().equals(userId)) {
                throw new RuntimeException("Email already exists");
            }

            user.setEmail(email);
        }
        if (updatedUser.getPhoneNumber() != null) {
            user.setPhoneNumber(updatedUser.getPhoneNumber());
        }
        if (updatedUser.getAddress() != null) {
            user.setAddress(updatedUser.getAddress());
        }
        if (updatedUser.getCity() != null) {
            user.setCity(updatedUser.getCity());
        }
        if (updatedUser.getCountry() != null) {
            user.setCountry(updatedUser.getCountry());
        }
        
        return userRepository.save(user);
    }

    private void validateRequiredFields(User user) {
        if (isBlank(user.getUsername())) {
            throw new RuntimeException("Username is required");
        }
        if (isBlank(user.getPassword())) {
            throw new RuntimeException("Password is required");
        }
        if (isBlank(user.getEmail())) {
            throw new RuntimeException("Email is required");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
