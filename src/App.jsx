import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Marketplace from "./pages/Marketplace";
import Courses from "./pages/Courses";
import Resources from "./pages/Resources";
import Agencies from "./pages/Agencies";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./pages/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Protected Routes wrapped in MainLayout */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <MainLayout activeMenu="dashboard">
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute>
              <MainLayout activeMenu="orders">
                <Orders />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/marketplace" 
          element={
            <ProtectedRoute>
              <MainLayout activeMenu="marketplace">
                <Marketplace />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/agencies" 
          element={
            <ProtectedRoute>
              <MainLayout activeMenu="agencies">
                <Agencies />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/courses" 
          element={
            <ProtectedRoute>
              <MainLayout activeMenu="courses">
                <Courses />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/resources" 
          element={
            <ProtectedRoute>
              <MainLayout activeMenu="resources">
                <Resources />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
