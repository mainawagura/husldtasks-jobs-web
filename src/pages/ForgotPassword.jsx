import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import Toast from "../components/Toast";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send reset email
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${import.meta.env.VITE_APP_URL}/reset-password`, // link lands on Reset Password page
      });

      if (error) throw error;

      setToastMessage({
        text: "If this email exists, a reset link has been sent.",
        type: "success",
      });
      setEmail(""); // clear input
    } catch (err) {
      setToastMessage({
        text: err.message || "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      {toastMessage && (
        <Toast
          message={toastMessage.text}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}

      <div className="forgot-container">
        <div className="forgot-card">
          <h1>Forgot Password</h1>
          <p className="forgot-subtitle">
            Enter your email to receive a password reset link.
          </p>

          <form onSubmit={handleReset} className="forgot-form">
            <div className="forgot-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="forgot-btn forgot-btn-primary forgot-btn-block"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="forgot-footer">
            <p>
              <Link to="/login">Back to Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}