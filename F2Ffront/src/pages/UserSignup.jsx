import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../api/axios";
import SnackbarContext from '../context/SnackbarContext';
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";

export default function SignUp() {
  const navigate = useNavigate();
  const { showSnackbar } = useContext(SnackbarContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [userType, setUserType] = useState("buyer"); // Default user type is "buyer"
  const [role, setRole] = useState(1); // Default role is set to 1 (User)

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
      confirmPassword: "",
      mobile: "",
      role: 1,
      otp: "",
      user_type: userType,
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      mobile: Yup.string().matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits").required("Mobile number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Password must contain an uppercase letter")
        .matches(/[a-z]/, "Password must contain a lowercase letter")
        .matches(/[0-9]/, "Password must contain a number")
        .matches(/[!@#$%^&*]/, "Password must contain a special character")
        .required("Password is required"),
      confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
      role: Yup.number().required("Role is required"),
      otp: Yup.string().length(6, "OTP must be 6 digits"),
      user_type: Yup.string().required("User type is required"),
    }),
    onSubmit: async (values) => {
      const updatedValues = {
        ...values,
        user_type: userType,
      };

      const { otp, ...userData } = updatedValues;
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
      setOtpVerified(true);
      navigate('/login')
    } catch (error) {
      console.error("OTP verification error:", error);
      showSnackbar("Failed to verify OTP. Please try again.", "error");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Left Side Image */}
      <div className="lg:w-1/2 w-full bg-cover bg-center" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1603360556632-2c5234378b7e?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}></div>

      {/* Right Side Form */}
      <div className="lg:w-1/2 w-full flex flex-col items-center  bg-gray-50 justify-center p-6">
        <div className="w-12 h-12 flex items-center justify-center bg-greenCustom rounded-full shadow-md mb-4">
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
        <div className="max-w-lg w-full p-4 rounded-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-black">Sign Up</h1>
          </div>

          {/* Form */}
          {!otpVerified && (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black">Full Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  id="name"
                  {...formik.getFieldProps("name")}
                  className={`w-full px-4 py-3 mt-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-greenCustom focus:outline-none ${formik.touched.name && formik.errors.name
                    ? "border-red-500"
                    : "border-gray-300"
                    }`}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black">Email Address</label>
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  {...formik.getFieldProps("email")}
                  className={`w-full px-4 py-3 mt-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-greenCustom focus:outline-none ${formik.touched.email && formik.errors.email
                    ? "border-red-500 "
                    : "border-gray-300 "
                    }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-black">Mobile Number</label>
                <input
                  type="text"
                  placeholder="Mobile Number"
                  id="mobile"
                  {...formik.getFieldProps("mobile")}
                  className={`w-full px-4 py-3 mt-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-greenCustom focus:outline-none ${formik.touched.mobile && formik.errors.mobile
                    ? "border-red-500 "
                    : "border-gray-300 "
                    }`}
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.mobile}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    id="password"
                    {...formik.getFieldProps("password")}
                    className={`w-full px-4 py-3 mt-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-greenCustom focus:outline-none ${formik.touched.password && formik.errors.password
                      ? "border-red-500 "
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
                  <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    {...formik.getFieldProps("confirmPassword")}
                    className={`w-full px-4 py-3 mt-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-greenCustom focus:outline-none ${formik.touched.confirmPassword && formik.errors.confirmPassword
                      ? "border-red-500 "
                      : "border-gray-300"
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
              </div>

              {/* Role */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-black">Role</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(Number(e.target.value))}
                  className={`w-full px-4 py-3 mt-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-greenCustom focus:outline-none ${formik.touched.role && formik.errors.role
                    ? "border-red-500"
                    : "border-gray-300"
                    }`}
                >
                  <option value={1}>User</option>
                  <option value={2}>Admin</option>
                </select>
              </div>

              {/* User Type */}
              <div>
                <label htmlFor="user_type" className="block text-sm font-medium text-black">User Type</label>
                <select
                  id="user_type"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className={`w-full px-4 py-3 mt-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-greenCustom focus:outline-none ${formik.touched.user_type && formik.errors.user_type
                    ? "border-red-500 "
                    : "border-gray-300"
                    }`}
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full px-4 py-3 text-white bg-greenCustom rounded-lg font-semibold shadow-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none"
              >
                To Sign Up Verify Your Email
              </button>

              {/* OTP Verification Section */}
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-semibold text-black">Verify Email</h3>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  {...formik.getFieldProps("otp")}
                  className={`w-full px-4 py-3 mt-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-greenCustom focus:outline-none ${formik.touched.user_type && formik.errors.user_type
                    ? "border-red-500 "
                    : "border-gray-300"}`}
                />
                {formik.touched.otp && formik.errors.otp && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.otp}</p>
                )}
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-full px-4 py-3 text-white bg-greenCustom rounded-lg font-semibold shadow-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300"
                >
                  Verify OTP
                </button>
              </div>
              {/* Sign In Link */}
              <div className="mt-4 text-center text-sm text-black">
                Already have an account?{" "}
                <button onClick={() => navigate("/login")} className="text-green-500">
                  Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}