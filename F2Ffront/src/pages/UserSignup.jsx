import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../api/axios";
import SnackbarContext from "../context/snackbarcontext";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";


export default function SignUp() {
  const navigate = useNavigate();
  const { showSnackbar } = useContext(SnackbarContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // for Confirm Password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "", // New field for confirm password
      role: 1, // Default role is Client
      otp: "",
      user_type: "buyer",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Password must contain an uppercase letter")
        .matches(/[a-z]/, "Password must contain a lowercase letter")
        .matches(/[0-9]/, "Password must contain a number")
        .matches(/[!@#$%^&*]/, "Password must contain a special character")
        .required("Password is required"),
        // confirmPassword: Yup.string()
        // .oneOf([Yup.ref("password"), null], "Passwords must match") // Ensures confirmPassword matches password
        // .required("Confirm Password is required"),
      role: Yup.number().required("Role is required"),
      otp: Yup.string().length(6, "OTP must be 6 digits"),
      user_type: Yup.string().required("Business type is required"), // Validation for businessType
    }),
    onSubmit: async (values) => {
      const { otp, ...userData } = values; // Exclude OTP from sign-up payload
      try {
        const response = await api.post("/auth/signup", userData);
        console.log("Sign-up successful:", response.data);
        showSnackbar("Sign-up successful & verification code sent!", "success");
        
      } catch (error) {
        console.error("Sign-up error:", error);
        showSnackbar("Sign-up failed. Please try again.", "error");
      }
    },
  });

  const handleVerifyOtp = async () => {
    const { otp } = formik.values;
    if (!otp) {
      showSnackbar("Please enter the OTP", "error");
      return;
    }
    try {
      const response = await api.post("/auth/verify-email", { code: otp });
      console.log("OTP verified successfully:", response.data);
      showSnackbar("Email verified successfully!", "success");
      navigate("/home");
    } catch (error) {
      console.error("OTP verification error:", error);
      showSnackbar("Failed to verify OTP. Please try again.", "error");
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Left Side */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1603360556632-2c5234378b7e?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div>

      {/* Right Side */}
      <div className="flex flex-col justify-center w-full md:w-1/2 p-10 md:p-20 bg-gray-50">
        <div className="max-w-lg mx-auto">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 flex items-center justify-center bg-greenCustom rounded-full shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c.552 0 1 .448 1 1s-.448 1-1-1-.448-1-1-1zm-1-2V7m0 10v-2m-4.95-4.95l-1.414-1.414m10.828 10.828l1.414 1.414M17 12h2m-10 0H5m8.485-8.485l1.414-1.414m-10.828 10.828l1.414 1.414"
                />
              </svg>
            </div>
            <h1 className="mt-5 text-3xl font-bold text-black">Sign Up</h1>
          </div>
          <form onSubmit={formik.handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-black">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                {...formik.getFieldProps("name")}
                className={`w-full px-4 py-3 mt-2 border rounded-lg shadow-sm focus:ring-2 ${formik.touched.name && formik.errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-greenCustom"
                  }`}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...formik.getFieldProps("email")}
                className={`w-full px-4 py-3 mt-2 border rounded-lg shadow-sm focus:ring-2 ${formik.touched.email && formik.errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-greenCustom"
                  }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...formik.getFieldProps("password")}
                  className={`w-full px-4 py-3 mt-2 border rounded-lg shadow-sm focus:ring-2 ${formik.touched.password && formik.errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-greenCustom"
                    }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  {...formik.getFieldProps("confirmPassword")}
                  className={`w-full px-4 py-3 mt-2 border rounded-lg shadow-sm focus:ring-2 ${formik.touched.confirmPassword && formik.errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-greenCustom"
                    }`}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                </button>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.confirmPassword}</p>
              )}
            </div> */}
            {/* Role Field */}
            <div className="flex space-x-4">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-black">
                Role
              </label>
              <select
                id="role"
                {...formik.getFieldProps("role")}
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-greenCustom focus:outline-none"
              >
                <option value={1}>Client</option>
                <option value={2}>Admin</option>
              </select>
            </div>
            <div className="flex-1">
                <label htmlFor="user_type" className="block text-sm font-medium text-black">
                  Business Type
                </label>
                <select
                  id="user_type"
                  {...formik.getFieldProps("user_type")}
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-greenCustom focus:outline-none"
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 text-white bg-greenCustom rounded-lg font-semibold shadow-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none"
            >
              Sign Up
            </button>
          </form>

          {/* OTP Verification */}
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold text-black">Verify Email</h3>
            <input
              type="text"
              placeholder="Enter OTP"
              {...formik.getFieldProps("otp")}
              className={`w-full px-4 py-3 mt-2 border rounded-lg shadow-sm focus:ring-2 ${
                formik.touched.otp && formik.errors.otp
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-greenCustom"
              }`}
            />
            {formik.touched.otp && formik.errors.otp && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.otp}</p>
            )}
            <button
              onClick={handleVerifyOtp}
              className="w-full px-4 py-3 text-white bg-greenCustom rounded-lg font-semibold shadow-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none"
            >
              Get Verified
            </button>
          </div>

          {/* Sign In Link */}
          <div className="mt-4 text-center text-sm text-black">
            Already have an account?{" "}
            <a href="/login" className="text-greenCustom font-medium hover:underline">
              Sign in
            </a>
          </div>

          <p className="mt-10 text-sm text-center text-black">
            Join us at{" "}
            <a
              href="https://bodyshody.vercel.app/"
              className="text-greenCustom font-medium hover:underline"
            >
              Farm2Fresh
            </a>{" "}
            to grow your business.
          </p>
        </div>
      </div>
    </div>
  );
}


