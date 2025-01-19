// import React, { useState } from "react";
// import { Mail, ArrowLeft, Loader, CheckCircle, AlertCircle } from "lucide-react";
// import { Link } from "react-router-dom";
// import api from '../api/axios';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [status, setStatus] = useState("idle"); // idle, loading, success, error
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus("loading");
  
//     try {
//       const response = await api.post("/auth/forgot-password", { email });
  
//       setStatus("success");
//       setMessage(response.data.message || "Reset link has been sent to your email!");
//     } catch (err) {
//       setStatus("error");
//       setMessage(err.response?.data?.message || err.message || "An error occurred. Please try again.");
//     }
//   };
  

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
//         {/* Header */}
//         <div className="mb-6">
//           <div className="flex items-center gap-2 mb-2">
//             <Link 
//               to="/login" 
//               className="text-gray-500 hover:text-gray-700 transition-colors"
//             >
//               <ArrowLeft className="h-5 w-5" />
//             </Link>
//             <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
//           </div>
//           <p className="text-gray-600">
//             Enter your email address and we'll send you a link to reset your password.
//           </p>
//         </div>
        
//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
//               <input
//                 type="email"
//                 placeholder="Enter your email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                 required
//                 disabled={status === "loading" || status === "success"}
//               />
//             </div>
//           </div>
          
//           <button
//             type="submit"
//             disabled={status === "loading" || status === "success"}
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
//           >
//             {status === "loading" ? (
//               <>
//                 <Loader className="animate-spin h-5 w-5" />
//                 Sending Reset Link...
//               </>
//             ) : (
//               "Send Reset Link"
//             )}
//           </button>
//         </form>

//         {/* Status Message */}
//         {message && (
//           <div className={`mt-4 p-4 rounded-lg flex items-center gap-2 ${
//             status === "success" 
//               ? "bg-green-50 text-green-700" 
//               : "bg-red-50 text-red-700"
//           }`}>
//             {status === "success" ? (
//               <CheckCircle className="h-5 w-5 flex-shrink-0" />
//             ) : (
//               <AlertCircle className="h-5 w-5 flex-shrink-0" />
//             )}
//             <p>{message}</p>
//           </div>
//         )}

//         {/* Footer */}
//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600">
//             Remember your password?{" "}
//             <Link 
//               to="/login" 
//               className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
//             >
//               Back to Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState } from "react";
import { Mail, ArrowLeft, Loader, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import api from '../api/axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
  
    try {
      const response = await api.post("/auth/forgot-password", { email });
      setStatus("success");
      setMessage(response.data.message || "Reset link has been sent to your email!");
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
              className="w-26 h-26"
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
            <h1 className="text-2xl font-bold text-gray-800">forgot Password</h1>
          </div>
          <p className="text-gray-600 text-center">
            Enter your email address and we'll send you a link to reset your password. Get back to connecting with local farmers and fresh produce!
          </p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-5 w-5" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all placeholder-gray-400"
                required
                disabled={status === "loading" || status === "success"}
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            {status === "loading" ? (
              <>
                <Loader className="animate-spin h-5 w-5" />
                Sending Reset Link...
              </>
            ) : (
              "Send Reset Link"
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

        {/* Footer */}
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <Link 
              to="/login" 
              className="text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;