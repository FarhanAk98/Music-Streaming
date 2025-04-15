import React, { useState } from 'react';
import './FeedbackPage.css';

const FeedbackPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    experience: '',
    comments: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    alert("Thank you for your feedback!");
  };

  return (
    <div className="feedback-container">
      

      

      {/* Page Title */}
      <h2 className="page-title">Feedback Page</h2>

      {/* Feedback Form */}
      <form onSubmit={handleSubmit} className="feedback-form">
        <h3>We value your feedback!</h3>

        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className='comm'>Email Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group radio-group">
          <label className='comm'>Your Experience:</label>
          <label>
            <input
              type="radio"
              name="experience"
              value="Excellent"
              onChange={handleChange}
              required
            /> Excellent
          </label>
          <label>
            <input
              type="radio"
              name="experience"
              value="Good"
              onChange={handleChange}
            /> Good
          </label>
          <label>
            <input
              type="radio"
              name="experience"
              value="Average"
              onChange={handleChange}
            /> Average
          </label>
          <label>
            <input
              type="radio"
              name="experience"
              value="Poor"
              onChange={handleChange}
            /> Poor
          </label>
        </div>

        <div className="form-group">
          <label className='comm'>Comments/Suggestions:</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows={6}
          />
        </div>

        <button type="submit" className="submit-btn">Submit Feedback</button>
      </form>

     
    </div>
  );
};
export default FeedbackPage;
