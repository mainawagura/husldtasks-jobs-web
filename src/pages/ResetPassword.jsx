import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import Toast from "../components/Toast";
import "./ResetPassword.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get("access_token"); // get token from URL

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setToastMessage({ text: "Passwords do not match.", type: "error" });
      return;
    }

    if (password.length < 6) {
      setToastMessage({ text: "Password must be at least 6 characters.", type: "error" });
      return;
    }

    if (!accessToken) {
      setToastMessage({ text: "Invalid or expired reset link.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      // This is the correct way to update the password using the token
      const { error } = await supabase.auth.updateUser({ password }, { accessToken });
      if (error) throw error;

      setToastMessage({ text: "Password updated successfully!", type: "success" });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setToastMessage({ text: err.message || "Failed to reset password.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-page">
      {toastMessage && <Toast message={toastMessage.text} type={toastMessage.type} onClose={() => setToastMessage(null)} />}
      <div className="reset-container">
        <div className="reset-card">
          <h1>Reset Password</h1>
          <form onSubmit={handleReset} className="reset-form">
            <div className="reset-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="reset-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="reset-btn reset-btn-primary reset-btn-block" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}