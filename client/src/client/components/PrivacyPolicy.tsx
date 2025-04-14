import React, { useState } from "react";
import "./PrivacyPolicy.css"; // Add styling as needed


const PrivacyPolicy: React.FC = () => {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="privacy-us-page">
      
     

      <div className="privacy-container">
        <h1>Privacy Policy</h1>
        <p><strong>Effective Date:</strong> [14-03-2025]</p>
        
        <h2>1. Introduction</h2>
        <p>Welcome to <strong>Our Music App</strong> ("we," "our," or "us"). Your privacy is important to us, and we are committed to protecting any personal information you share with us.</p>

        <h2>2. Information We Collect</h2>
        <h3>2.1 Personal Information</h3>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          
        </ul>

        <h3>2.2 Non-Personal Information</h3>
        <ul>
          <li>Browser type and version</li>
          <li>IP address</li>
          <li>Device type</li>
          <li>Website usage statistics</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>Provide and improve our services</li>
          <li>Process transactions and payments</li>
          <li>Send newsletters and promotional content (only if subscribed)</li>
          <li>Respond to customer inquiries and support requests</li>
          <li>Ensure website security and prevent fraud</li>
        </ul>

        <h2>4. Cookies and Tracking Technologies</h2>
        <p>We use cookies to enhance your browsing experience. You can disable cookies in your browser settings, but some website features may not function properly.</p>

        <h2>5. Sharing Your Information</h2>
        <p>We <strong>do not sell</strong> or rent your personal data. However, we may share information with:</p>
        <ul>
          <li>Third-party service providers (e.g., payment processors)</li>
          <li>Legal authorities, if required by law</li>
        </ul>

        <h2>6. Data Security</h2>
        <p>We implement security measures to protect your personal information. However, no data transmission over the internet is 100% secure.</p>

        <h2>7. Your Rights</h2>
        <ul>
          <li>Access, update, or delete your personal information</li>
          <li>Opt-out of marketing emails</li>
          <li>Request a copy of your data</li>
        </ul>

        <h2>8. Third-Party Links</h2>
        <p>Our website may contain links to third-party sites. We are not responsible for their privacy practices. Please review their policies before providing personal information.</p>

        <h2>9. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date.</p>

        <h2>10. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p>📧 <strong>Email:</strong> [support@OurMusicApp.com]</p>
        <p>📍 <strong>Address:</strong> [123 Melody Lane, Suite 405, Music City, CA 90210, CANADA]</p>

        <button className="like-button" onClick={handleLike}>Like ({likes})</button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;