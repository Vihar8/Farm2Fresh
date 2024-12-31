import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import JWTContext from "../context/JWTContext";
import api from "../api/axios";
import { LOGIN } from "../context/actions"; // Ensure actions.js is properly structured
import SnackbarContext from "../context/SnackbarContext";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";

const SignInSide = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(JWTContext); // Use JWT context to dispatch login action
  const { showSnackbar } = useContext(SnackbarContext); // Access showSnackbar from context
  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const response = await api.post("/auth/login", values); // Adjust API URL as needed
        const { token, user } = response.data; // Assuming the API returns a JWT token and user info

        // Store token in localStorage
        localStorage.setItem("serviceToken", token);

        // Dispatch login action to update context
        dispatch({ type: LOGIN, payload: { user } });
        showSnackbar("SignIn successfully!", "success");

        // Redirect to home page after successful login
        navigate("/home");
      } catch (error) {
        setFieldError("email", "Invalid email or password");
        setFieldError("password", "Invalid email or password");
        showSnackbar("Failed to SignIn. Please try again.", "error");
      } finally {
        setSubmitting(false);
      }
    },
  });

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
                  d="M12 11c.552 0 1 .448 1 1s-.448 1-1-1-1-.448-1-1 .448-1 1-1zm-1-2V7m0 10v-2m-4.95-4.95l-1.414-1.414m10.828 10.828l1.414 1.414M17 12h2m-10 0H5m8.485-8.485l1.414-1.414m-10.828 10.828l1.414 1.414"
                />
              </svg>
            </div>
            <h1 className="mt-5 text-3xl font-bold text-black">Sign In</h1>
          </div>
          <form onSubmit={formik.handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 mt-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-greenCustom focus:outline-none ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Password
              </label>
              <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full px-4 py-3 mt-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-greenCustom focus:outline-none ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
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
                <p className="text-sm text-red-500">{formik.errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full px-4 py-3 text-white bg-greenCustom rounded-lg font-semibold shadow-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none"
            >
              {formik.isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <div className="flex justify-between items-center mt-8 text-sm">
            <a href="#" className="text-greenCustom font-medium hover:underline">
              Forgot password?
            </a>
            <Link to="/usersignup" className="text-greenCustom font-medium hover:underline">
  Don't have an account? Sign Up
</Link>

          </div>
          <p className="mt-10 text-sm text-center text-black">
            Connect With Us at{" "}
            <a
              href="https://farm2fresh.vercel.app/"
              className="text-greenCustom font-medium hover:underline"
            >
              Farm2Fresh
            </a>{" "}
            and grow your Business.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInSide;


