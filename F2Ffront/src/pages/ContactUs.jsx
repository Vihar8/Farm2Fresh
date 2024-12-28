import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Mail, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react';
import SnackbarContext from '../context/SnackbarContext';
import api from "../api/axios";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { showSnackbar } = useContext(SnackbarContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      mobile: "",
      requirement: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Please enter a 10-digit mobile number")
        .required("Mobile number is required"),
      requirement: Yup.string()
        .min(20, "Please provide more detailed requirements (minimum 20 characters)")
        .required("Requirement description is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const response = await api.post("/api/enquiryform", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          showSnackbar("Your enquiry has been submitted successfully!", "success");
          resetForm();
          setSubmitted(true);

          // Reset submitted state after 3 seconds
          setTimeout(() => {
            setSubmitted(false);
          }, 3000);
        } else {
          showSnackbar(response.data.error || "Failed to submit enquiry. Please try again.", "error");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        showSnackbar("An error occurred. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    },
  });

  // Character count for requirement
  const requirementCharCount = formik.values.requirement.length;

  return (
    <div className="max-h-screen bg-gray-50 flex items-center justify-center p-4 m-2">
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Left side with image */}
        <div className="relative bg-cover bg-center"  style={{ backgroundImage: 'url(/ContactUs.jpg)' }}>
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <h2 className="text-white pt-80 text-4xl font-bold">Get in Touch</h2>
          </div>
        </div>

        {/* Right side with form */}
        <div className="p-5 space-y-4 relative">
          {/* Header */}
          <div className=" mb-5">
            <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
            <div className=" w-20 border-t-4 border-lime-500 my-5" />
            <p className="text-gray-700 text-center">We're here to help! Share your requirements and we'll get back to you soon.</p>
          </div>
          {/* Hero Section (Ensure it's relative) */}
          {/* Submission Success Overlay */}
          {submitted && (
            <div className="absolute inset-0 bg-white/80 z-50 flex flex-col items-center justify-center">
              <CheckCircle className="h-20 w-20 text-green-600 mb-8 animate-bounce z-70" />
              <h3 className="text-2xl font-bold text-green-600 mb-2 z-70">Thank You!</h3>
              <p className="text-gray-600 z-70">Your enquiry has been submitted successfully.</p>
            </div>
          )}
          {/* Form */}
          <form
            onSubmit={formik.handleSubmit}
            className={`relative space-y-4 ${submitted ? 'opacity-20 pointer-events-none' : ''}`}
          >
            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-gray-400 h-5 w-5 group-focus-within:text-green-600 transition-colors" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                className={`w-full pl-10 pr-4 py-3 text-black bg-gray-50 border-2 rounded-lg outline-none transition-all duration-300 ${formik.errors.email && formik.touched.email ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-200"}`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1 animate-pulse">{formik.errors.email}</p>
              )}
            </div>

            {/* Mobile Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="text-gray-400 h-5 w-5 group-focus-within:text-green-600 transition-colors" />
              </div>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="Mobile number"
                className={`w-full pl-10 pr-4 py-3 text-black bg-gray-50 border-2 rounded-lg outline-none transition-all duration-300 ${formik.errors.mobile && formik.touched.mobile ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-200"}`}
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <p className="text-red-500 text-sm mt-1 animate-pulse">{formik.errors.mobile}</p>
              )}
            </div>

            {/* Requirement Textarea */}
            <div className="relative group">
              <div className="absolute top-3 left-0 pl-3 pointer-events-none">
                <MessageSquare className="text-gray-400 h-5 w-5 group-focus-within:text-green-600 transition-colors" />
              </div>
              <textarea
                id="requirement"
                name="requirement"
                placeholder="Share your requirement"
                rows="4"
                className={`w-full pl-10 pr-4 py-3 text-black bg-gray-50 border-2 rounded-lg outline-none transition-all duration-300 resize-none ${formik.errors.requirement && formik.touched.requirement ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-200"}`}
                value={formik.values.requirement}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              <div className="flex justify-between items-center mt-1">
                {formik.touched.requirement && formik.errors.requirement && (
                  <p className="text-red-500 text-sm animate-pulse">{formik.errors.requirement}</p>
                )}
                <p className={`text-xs ml-auto ${requirementCharCount > 20 ? 'text-green-600' : 'text-gray-400'}`}>
                  {requirementCharCount}/200
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full flex items-center justify-center text-white py-3 rounded-lg transition-all duration-300 ${loading ? 'cursor-not-allowed' : 'hover:shadow-lg hover:shadow-green-500/30'}`}
              style={{ backgroundColor: '#2CB21A' }}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                <div className="flex items-center">
                  <Send className="mr-2 h-5 w-5" />
                  Submit Enquiry
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
