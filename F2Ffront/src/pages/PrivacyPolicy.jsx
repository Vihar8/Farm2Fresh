import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At <strong>Farm2Fresh</strong>, we value your privacy and are committed to protecting your personal data. This Privacy Policy outlines the types of information we collect, how we use it, and the steps we take to ensure your information remains secure. By accessing or using our services, you consent to the practices described in this Privacy Policy.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>

        <h3 className="text-xl font-medium mb-2">1. Anonymous Information</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Your IP address.</li>
          <li>Browser type and version.</li>
          <li>Operating system.</li>
          <li>The pages you visit on our site and the time spent on those pages.</li>
          <li>Referring website addresses.</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">2. Personal Information</h3>
        <p className="mb-4">
          We may collect personal information when you:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Register on our website.</li>
          <li>Make a purchase or place an order.</li>
          <li>Subscribe to our newsletter.</li>
          <li>Contact us through our customer support channels.</li>
        </ul>
        <p className="mb-4">
          The personal information we may collect includes:
        </p>
        <ul className="list-disc list-inside">
          <li>Full name.</li>
          <li>Email address.</li>
          <li>Phone number.</li>
          <li>Billing and shipping address.</li>
          <li>Payment information (such as credit card details).</li>
          <li>Preferences related to our products or services.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc list-inside">
          <li>Provide, improve, and personalize our services.</li>
          <li>Process transactions and deliver products.</li>
          <li>Respond to your inquiries and provide customer support.</li>
          <li>Send promotional emails, newsletters, and updates (only if you opt-in).</li>
          <li>Conduct surveys and collect feedback to enhance user experience.</li>
          <li>Comply with legal requirements and prevent fraudulent activities.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Sharing Your Information</h2>
        <p className="mb-4">
          We do not sell, trade, or rent your personal information to third parties. However, we may share your information with trusted partners who help us operate our website, conduct business, or provide services to you. Examples include:
        </p>
        <ul className="list-disc list-inside">
          <li>Payment processors for secure transactions.</li>
          <li>Shipping providers for product delivery.</li>
          <li>Analytics providers to improve our website and services.</li>
        </ul>
        <p>
          These partners are required to handle your data securely and confidentially.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Cookies and Tracking Technologies</h2>
        <p className="mb-4">
          Farm2Fresh uses cookies and similar technologies to enhance your experience on our website. Cookies help us:
        </p>
        <ul className="list-disc list-inside">
          <li>Recognize your preferences during visits.</li>
          <li>Analyze site traffic and performance.</li>
          <li>Provide relevant marketing and advertising.</li>
        </ul>
        <p>
          You can disable cookies through your browser settings; however, some website features may not function properly as a result.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Data Security</h2>
        <p>
          We implement robust security measures to protect your personal data against unauthorized access, alteration, or disclosure. These include:
        </p>
        <ul className="list-disc list-inside">
          <li>Secure Socket Layer (SSL) encryption for transactions.</li>
          <li>Regular monitoring and updates to our security protocols.</li>
          <li>Restricted access to personal data to authorized personnel only.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Third-Party Links</h2>
        <p>
          Our website may include links to third-party websites. Farm2Fresh is not responsible for the privacy practices or content of these external sites. We encourage you to read their privacy policies before sharing any personal information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
        <p>
          As a user, you have the following rights regarding your personal information:
        </p>
        <ul className="list-disc list-inside">
          <li>Access, update, or delete your personal data.</li>
          <li>Opt-out of receiving marketing communications.</li>
          <li>Withdraw consent for data collection and processing.</li>
        </ul>
        <p>
          To exercise these rights, please contact us at <strong>support@farm2fresh.com</strong>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be effective immediately upon posting to this page. We encourage you to review this page periodically to stay informed about how we protect your information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy, please reach out to us:
        </p>
        <p className="mt-2">Farm2Fresh Support Team</p>
        <p>Email: <strong>support@farm2fresh.com</strong></p>
        <p>Phone: <strong>+1-800-FARM2FR</strong></p>
      </section>

      <p className="mt-6 text-center">Thank you for trusting Farm2Fresh!</p>
    </div>
  );
};

export default PrivacyPolicy;
