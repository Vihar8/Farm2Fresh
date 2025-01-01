import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../api/axios"; // Ensure the Axios instance is correctly configured
import SnackbarContext from "../context/SnackbarContext";

const ForgetPassword = () => {
    const { showSnackbar } = React.useContext(SnackbarContext);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            setLoading(true);
            try {
                // API call to trigger password reset
                await api.post("/auth/forgot-password", { email: values.email }); // Update endpoint as needed
                showSnackbar(
                    "Password reset link has been sent to your email address.",
                    "success"
                );
            } catch (error) {
                showSnackbar(
                    "Failed to send password reset link. Please try again.",
                    error
                );
            } finally {
                setLoading(false);
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-bold text-center text-black mb-6">
                    Forgot Password
                </h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Enter your registered email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email Address"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-3 mt-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-greenCustom focus:outline-none ${formik.touched.email && formik.errors.email
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-sm text-red-500">{formik.errors.email}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={formik.isSubmitting || loading}
                        className="w-full px-4 py-3 mt-4 bg-greenCustom text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none"
                    >
                        {loading ? "Sending Link..." : "Send Reset Link"}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Remember your password?{" "}
                    <a
                        href="/login"
                        className="text-greenCustom font-medium hover:underline"
                    >
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default ForgetPassword;
