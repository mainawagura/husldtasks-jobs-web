import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import Toast from "../components/Toast";
import authImg from "../assets/images/auth.png";
import * as Icons from "../components/Icons";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user) {
        setToastMessage({ text: "Login successful!", type: "success" });
        setTimeout(() => navigate("/dashboard"), 500);
      }
    } catch (err) {
      setToastMessage({ text: err.message || "Login failed", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {toastMessage && (
        <Toast
          message={toastMessage.text}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}

      <Link to="/" className="back-home">
        <Icons.IconDashboard /> {/* Placeholder for back icon if needed, or just text */}
        Back to Home
      </Link>

      <div className="auth-visual-side">
        <div className="auth-visual-content">
          <img src={authImg} alt="Husld Secure Login" />
          <h2>Welcome Back.</h2>
          <p>Access your professional workspace and keep your digital hustle moving forward.</p>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-container">
          <h1>Log In</h1>
          <p className="auth-subtitle">Welcome back! Please enter your details.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="show-hide-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? "Signing in..." : "Sign In to Husld"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/signup">Start for free</Link>
            </p>
            <p>
              <Link to="/forgot-password">Forgot password?</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
