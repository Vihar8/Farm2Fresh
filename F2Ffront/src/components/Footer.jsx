import { useFormik } from 'formik';
import * as Yup from "yup";
import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {

  const formik = useFormik({
    initialValues: {
      email: "",
      mobile: "",
      requirement: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
      requirement: Yup.string().required("Requirement is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch("http://localhost:3000/api/enquiryform", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          alert("Enquiry submitted successfully!");
          resetForm();
        } else {
          alert("Failed to submit enquiry. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again.");
      }
    },
  });

  return (   
  <footer className="bg-gray-800 text-white py-8">
 

<div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
  {/* Left Column */}
  <div>
    <h2 className="text-lg font-bold">Useful Links</h2>
    <ul className="mt-4 space-y-2">
      <li>
        <Link to="/agri-updates" className="hover:underline">
          Agri Updates
        </Link>
      </li>
      <li>
        <Link to="/privacy-policy" className="hover:underline">
          Privacy Policy
        </Link>
      </li>
      <li>
        <Link to="/terms-conditions" className="hover:underline">
          Terms and Conditions
        </Link>
      </li>
      <li>
        <Link to="/contact-us" className="hover:underline">
          Contact Us
        </Link>
      </li>
    </ul>
  </div>

  {/* Middle Column */}
  <div>
    <h2 className="text-lg font-bold">What We Do</h2>
    <p className="mt-4 text-sm">
      Our agri-tech platform helps empower farmers, commodity buyers, and
      sellers. Our verified and authentic marketplace is transforming the
      way agri commodities transactions are carried out in India.
    </p>
  </div>



    {/* Right Column */}
    <div>
          <h2 className="text-lg font-bold">Enquiry Form</h2>
          <form
            onSubmit={formik.handleSubmit}
            className="mt-4 space-y-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              className={`w-full px-4 py-2 text-gray-800 placeholder-gray-500 border ${formik.errors.email && formik.touched.email
                  ? "border-red-500"
                  : "border-gray-300"
                } rounded`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
            <input
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Mobile number"
              className={`w-full px-4 py-2  text-gray-800 placeholder-gray-500 border ${formik.errors.mobile && formik.touched.mobile
                  ? "border-red-500"
                  : "border-gray-300"
                } rounded`}
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.mobile}</p>
            )}
            <textarea
              id="requirement"
              name="requirement"
              placeholder="Share your requirement"
              rows="3"
              className={`w-full px-4 py-2 text-gray-800 placeholder-gray-500 border ${formik.errors.requirement && formik.touched.requirement
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
                } rounded focus:ring-2 focus:ring-blue-500 outline-none`}
              value={formik.values.requirement}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.errors.requirement && formik.touched.requirement && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.requirement}</p>
            )}


            <button
              type="submit"
              className="w-full bg-greenCustom text-white py-2 rounded hover:bg-green-600"
            >
              Submit
            </button>
      </form>
    </div>
  </div>

  {/* Bottom Section */}
  <div className="mt-8 border-t border-gray-700 pt-4 flex justify-between items-center">
  <p className="text-sm text-white">
    Copyright © {new Date().getFullYear()} Farm2Fresh Pvt Ltd. All rights reserved.
  </p>
    <div className="flex space-x-4">
      <a href="#" className="hover:underline">
        <img src="https://tse2.mm.bing.net/th?id=OIP.EraXyr2uEATx7qWI2MIy-QHaCl&pid=Api&P=0&h=180" alt="Google Play" className="w-32 rounded-full" />
      </a>
      <div className="flex space-x-2">
        <a href="#" className="hover:underline">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="hover:underline">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#" className="hover:underline">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="hover:underline">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  </div>
</footer>
);
};

export default Footer
