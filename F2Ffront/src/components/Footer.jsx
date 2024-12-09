import React from 'react'

const Footer = () => {
  return (   
  <footer className="bg-black text-white py-8">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
    {/* Left Column */}
    <div>
      <h2 className="text-lg font-bold">Useful Links</h2>
      <ul className="mt-4 space-y-2">
        <li>Agri Updates</li>
        <li>Privacy Policy</li>
        <li>Terms and Conditions</li>
        <li>Contact Us</li>
      </ul>
    </div>

    {/* Middle Column */}
    <div>
      <h2 className="text-lg font-bold">What We Do</h2>
      <p className="mt-4 text-sm">
        Our agri tech platform helps empower farmers, commodity buyers, and
        sellers. Our verified and authentic marketplace is transforming the
        way agri commodities transactions are carried out in India.
      </p>
      <button className="mt-4 text-green-500 hover:underline">
        View More →
      </button>
    </div>

    {/* Right Column */}
    <div>
      <h2 className="text-lg font-bold">Enquiry Form</h2>
      <form className="mt-4 space-y-4">
        <input
          type="email"
          placeholder="Email address"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Mobile number"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Share your requirement"
          className="w-full px-4 py-2 border border-gray-300 rounded"
          rows="3"
        ></textarea>
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Submit
        </button>
      </form>
    </div>
  </div>

  {/* Bottom Section */}
  <div className="mt-8 border-t border-gray-700 pt-4 flex justify-between items-center">
    <p className="text-sm">
      Copyright © 2024 Comex Agritech Pvt Ltd. All rights reserved.
    </p>
    <div className="flex space-x-4">
      <a href="#" className="hover:underline">
        <img src="/google-play.png" alt="Google Play" className="w-32" />
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
