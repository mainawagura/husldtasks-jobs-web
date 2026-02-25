import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "../utils/supabaseClient";
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryTime, setRetryTime] = useState(0); // cooldown timer
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  // Countdown timer for retry
  useEffect(() => {
    if (retryTime <= 0) return;
    const timer = setInterval(() => setRetryTime(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [retryTime]);

  const handleFocus = () => setError(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cancel if already processing or retry timer active
    if (loading || retryTime > 0) return;

    setError(null);
    setConfirmationMessage(null);

    // Client-side validation
    if (!formData.fullName.trim()) return setError("Please enter your full name.");
    if (!formData.email.trim()) return setError("Please enter your email address.");
    if (formData.password.length < 6) return setError("Password must be at least 6 characters.");
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match.");

    setLoading(true);

    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: { data: { full_name: formData.fullName } },
      });

      if (signupError) {
        let message = "Unable to create account. Please try again.";

        switch (signupError.status) {
          case 400:
            message = "Invalid signup details. Please check your email and password.";
            break;
          case 409:
            message = "This email is already registered. Please log in or use another email.";
            break;
          case 429:
            message = "Too many attempts. Please wait a few seconds before trying again.";
            setRetryTime(30); // 30-second cooldown
            break;
          default:
            message = "Something went wrong. Please try again.";
        }

        setError(message);
        setLoading(false);
        return;
      }

      // Signup successful → show confirmation message
      setConfirmationMessage(
        "Signup successful! Please check your email to confirm your account before logging in."
      );
      setLoading(false);

    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Something went wrong. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1>Sign Up</h1>
          <p className="auth-subtitle">Create your account</p>

          {/* Friendly Error Message */}
          {error && (
            <div className="error-alert">
              <span>{error}</span>
              <button className="dismiss-btn" onClick={() => setError(null)}>×</button>
            </div>
          )}

          {/* Confirmation Message */}
          {confirmationMessage && (
            <div className="confirmation-alert">
              {confirmationMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className={`form-group ${error && !formData.fullName.trim() ? "has-error" : ""}`}>
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className={`form-group ${error && !formData.email.trim() ? "has-error" : ""}`}>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={`form-group ${error && formData.password.length < 6 ? "has-error" : ""}`}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Create a password"
                required
              />
            </div>

            <div className={`form-group ${error && formData.password !== formData.confirmPassword ? "has-error" : ""}`}>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading || retryTime > 0}
            >
              {retryTime > 0
                ? `Please wait ${retryTime}s`
                : loading
                ? "Creating Account..."
                : "Sign Up"}
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Log In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}