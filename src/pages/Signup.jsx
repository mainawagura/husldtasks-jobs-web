import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "../utils/supabaseClient";
import authImg from "../assets/images/auth.png";
import * as Icons from "../components/Icons";
import './Auth.css';

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
      <Link to="/" className="back-home">
        <Icons.IconDashboard />
        Back to Home
      </Link>

      <div className="auth-visual-side">
        <div className="auth-visual-content">
          <img src={authImg} alt="Husld Secure Signup" />
          <h2>Join the Community.</h2>
          <p>Create your professional account and start scaling your services today.</p>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-container">
          <h1>Sign Up</h1>
          <p className="auth-subtitle">Create your professional account in seconds.</p>

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
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="name@company.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="At least 6 characters"
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Repeat password"
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
                : "Create Your Account"}
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Sign in instead</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
