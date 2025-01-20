import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle, Loader, ArrowLeft, Sprout } from "lucide-react";
import api from '../api/axios';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const passwordRequirements = [
    { test: /.{8,}/, text: "At least 8 characters long" },
    { test: /[A-Z]/, text: "Contains uppercase letter" },
    { test: /[a-z]/, text: "Contains lowercase letter" },
    { test: /[0-9]/, text: "Contains number" },
    { test: /[^A-Za-z0-9]/, text: "Contains special character" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match");
      return;
    }
    setStatus("loading");
    try {
      const response = await api.post("/auth/reset-password", {
        token,
        newPassword,
      });
      setStatus("success");
      setMessage("Password reset successful!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setStatus("error");
      setMessage(err.response?.data?.message || err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-green-100">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center">
            <img 
              src="/f2f.jpg"
              alt="Farm2Fresh Logo" 
              className="w-28 h-28"
            />
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Link 
              to="/login" 
              className="text-green-700 hover:text-green-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
          </div>
          <p className="text-gray-600 text-center">
            Create a strong password to protect your Farm2Fresh account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-5 w-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                required
                disabled={status === "loading" || status === "success"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-5 w-5" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                required
                disabled={status === "loading" || status === "success"}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-700"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <p className="text-sm font-medium text-gray-700 mb-3">Password Requirements:</p>
            <div className="space-y-2">
              {passwordRequirements.map(({ test, text }) => (
                <div 
                  key={text} 
                  className="flex items-center gap-2 text-sm"
                >
                  {test.test(newPassword) ? (
                    <Sprout className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                  )}
                  <span className={
                    test.test(newPassword) 
                      ? "text-green-700 font-medium" 
                      : "text-gray-600"
                  }>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            {status === "loading" ? (
              <>
                <Loader className="animate-spin h-5 w-5" />
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        {/* Status Message */}
        {message && (
          <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
            status === "success" 
              ? "bg-green-50 text-green-700 border border-green-200" 
              : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {status === "success" ? (
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
            )}
            <p className="text-sm">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;