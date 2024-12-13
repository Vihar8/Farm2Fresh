import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { SiGoogleplay } from 'react-icons/si';

const Footer = () => {
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
          <h2 className="text-lg font-bold">Stay Connected</h2>
          <div className="mt-4 space-y-2">
            <p className="text-sm">Follow us on social media for updates:</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:underline">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="hover:underline">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="hover:underline">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="hover:underline">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 flex justify-center items-center">
        <p className="text-sm text-white">
          Copyright © {new Date().getFullYear()} Farm2Fresh Pvt Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
