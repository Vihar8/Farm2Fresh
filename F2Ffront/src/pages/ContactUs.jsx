// import React, { useContext, useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from "yup";
// import { Mail, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react';
// import SnackbarContext from "../context/snackbarcontext";

// const ContactUs = () => {
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const { showSnackbar } = useContext(SnackbarContext);

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       mobile: "",
//       requirement: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string()
//         .email("Please enter a valid email address")
//         .required("Email is required"),
//       mobile: Yup.string()
//         .matches(/^[0-9]{10}$/, "Please enter a 10-digit mobile number")
//         .required("Mobile number is required"),
//       requirement: Yup.string()
//         .min(20, "Please provide more detailed requirements (minimum 20 characters)")
//         .required("Requirement description is required"),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       setLoading(true);
//       try {
//         const response = await fetch("http://localhost:3000/api/enquiryform", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(values),
//         });

//         const data = await response.json();
//         if (response.ok) {
//           showSnackbar("Your enquiry has been submitted successfully!", "success");
//           resetForm();
//           setSubmitted(true);

//           // Reset submitted state after 3 seconds
//           setTimeout(() => {
//             setSubmitted(false);
//           }, 3000);
//         } else {
//           showSnackbar(data.error || "Failed to submit enquiry. Please try again.", "error");
//         }
//       } catch (error) {
//         console.error("Error submitting form:", error);
//         showSnackbar("An error occurred. Please try again.", "error");
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   // Character count for requirement
//   const requirementCharCount = formik.values.requirement.length;

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden ">
//         {/* Header */}
//         <div 
//           className="relative p-6 text-white overflow-hidden"
//           style={{ 
//             backgroundColor: '#2CB21A', 
//             clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
//           }}
//         >
//           <div className="absolute inset-0 bg-black/10 z-0"></div>
//           <div className="relative z-10">
//             <h2 className="text-2xl font-bold text-center mb-2">Contact Us</h2>
//             <p className="text-center text-white/90 max-w-xs mx-auto">
//               We're here to help! Share your requirements and we'll get back to you soon.
//             </p>
//           </div>
//         </div>

//         {/* Submission Success Overlay */}
//         {submitted && (
//           <div className="absolute inset-0 bg-white/90 z-50 flex flex-col items-center justify-center">
//             <CheckCircle className="h-20 w-20 text-green-500 mb-4 animate-bounce" />
//             <h3 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h3>
//             <p className="text-gray-600">Your enquiry has been submitted successfully.</p>
//           </div>
//         )}

//         {/* Form */}
//         <form 
//           onSubmit={formik.handleSubmit} 
//           className={`p-6 space-y-4 relative ${submitted ? 'opacity-20 pointer-events-none' : ''}`}
//         >
//           {/* Email Input */}
//           <div className="relative group">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Mail className="text-gray-400 h-5 w-5 group-focus-within:text-green-600 transition-colors" />
//             </div>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Email address"
//               className={`w-full pl-10 pr-4 py-3 text-black bg-gray-50 border-2 rounded-lg outline-none transition-all duration-300 ${
//                 formik.errors.email && formik.touched.email
//                   ? "border-red-500 focus:ring-2 focus:ring-red-200"
//                   : "border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-200"
//               }`}
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.email && formik.errors.email && (
//               <p className="text-red-500 text-sm mt-1 animate-pulse">{formik.errors.email}</p>
//             )}
//           </div>

//           {/* Mobile Input */}
//           <div className="relative group">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Phone className="text-gray-400 h-5 w-5 group-focus-within:text-green-600 transition-colors" />
//             </div>
//             <input
//               type="tel"
//               id="mobile"
//               name="mobile"
//               placeholder="Mobile number"
//               className={`w-full pl-10 pr-4 py-3 text-black bg-gray-50 border-2 rounded-lg outline-none transition-all duration-300 ${
//                 formik.errors.mobile && formik.touched.mobile
//                   ? "border-red-500 focus:ring-2 focus:ring-red-200"
//                   : "border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-200"
//               }`}
//               value={formik.values.mobile}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.mobile && formik.errors.mobile && (
//               <p className="text-red-500 text-sm mt-1 animate-pulse">{formik.errors.mobile}</p>
//             )}
//           </div>

//           {/* Requirement Textarea */}
//           <div className="relative group">
//             <div className="absolute top-3 left-0 pl-3 pointer-events-none">
//               <MessageSquare className="text-gray-400 h-5 w-5 group-focus-within:text-green-600 transition-colors" />
//             </div>
//             <textarea
//               id="requirement"
//               name="requirement"
//               placeholder="Share your requirement"
//               rows="4"
//               className={`w-full pl-10 pr-4 py-3 text-black bg-gray-50 border-2 rounded-lg outline-none transition-all duration-300 resize-none ${
//                 formik.errors.requirement && formik.touched.requirement
//                   ? "border-red-500 focus:ring-2 focus:ring-red-200"
//                   : "border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-200"
//               }`}
//               value={formik.values.requirement}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             ></textarea>
//             <div className="flex justify-between items-center mt-1">
//               {formik.touched.requirement && formik.errors.requirement && (
//                 <p className="text-red-500 text-sm animate-pulse">{formik.errors.requirement}</p>
//               )}
//               <p className={`text-xs ml-auto ${
//                 requirementCharCount > 20 ? 'text-green-600' : 'text-gray-400'
//               }`}>
//                 {requirementCharCount}/200
//               </p>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className={`w-full flex items-center justify-center text-white py-3 rounded-lg transition-all duration-300 ${
//               loading ? 'cursor-not-allowed' : 'hover:shadow-lg hover:shadow-green-500/30'
//             }`}
//             style={{ 
//               backgroundColor: '#2CB21A',
//             }}
//             disabled={loading}
//           >
//             {loading ? (
//               <div className="flex items-center">
//                 <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Submitting...
//               </div>
//             ) : (
//               <div className="flex items-center">
//                 <Send className="mr-2 h-5 w-5" />
//                 Submit Enquiry
//               </div>
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;

import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Mail, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react';
import SnackbarContext from "../context/snackbarcontext";

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
        const response = await fetch("http://localhost:3000/api/enquiryform", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if (response.ok) {
          showSnackbar("Your enquiry has been submitted successfully!", "success");
          resetForm();
          setSubmitted(true);

          // Reset submitted state after 3 seconds
          setTimeout(() => {
            setSubmitted(false);
          }, 3000);
        } else {
          showSnackbar(data.error || "Failed to submit enquiry. Please try again.", "error");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-screen-lg bg-white shadow-2xl rounded-2xl overflow-hidden flex">
        {/* Left Side Image */}
        <div className="w-1/2 h-full flex items-center justify-center">
          <img
            src="../public/Contact us.jpg"
            alt="Contact Us Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-1/2 bg-green-600 p-6 flex flex-col justify-center">
          <div className="text-white text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">Contact Us</h2>
            <p className="max-w-md mx-auto">
              We&apos;re here to help! Share your requirements and we&apos;ll get back to you soon.
            </p>
          </div>

          {/* Submission Success Overlay */}
          {submitted && (
            <div className="absolute inset-0 bg-white/90 z-50 flex flex-col items-center justify-center">
              <CheckCircle className="h-20 w-20 text-green-500 mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h3>
              <p className="text-gray-600">Your enquiry has been submitted successfully.</p>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={formik.handleSubmit}
            className={`space-y-4 ${submitted ? 'opacity-20 pointer-events-none' : ''}`}
          >
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                className={`w-full px-4 py-3 rounded-lg border-2 ${formik.errors.email && formik.touched.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-300`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Mobile Input */}
            <div className="relative">
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="Mobile number"
                className={`w-full px-4 py-3 rounded-lg border-2 ${formik.errors.mobile && formik.touched.mobile ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-300`}
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.mobile}</p>
              )}
            </div>

            {/* Requirement Textarea */}
            <div className="relative">
              <textarea
                id="requirement"
                name="requirement"
                placeholder="Share your requirement"
                rows="4"
                className={`w-full px-4 py-3 rounded-lg border-2 ${formik.errors.requirement && formik.touched.requirement ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-300`}
                value={formik.values.requirement}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              <div className="flex justify-between items-center mt-1">
                {formik.touched.requirement && formik.errors.requirement && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.requirement}</p>
                )}
                <p className={`text-xs ${requirementCharCount > 20 ? 'text-green-600' : 'text-gray-400'}`}>
                  {requirementCharCount}/200
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 rounded-lg text-white bg-green-500 hover:bg-green-600 transition-all duration-300 ${loading ? 'cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                <div className="flex justify-center items-center">
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
