import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/feedback', { feedback, email })
      .then((response) => {
        alert('Thank you for your feedback!');
        setFeedback('');
        setEmail('');
      })
      .catch((error) => {
        alert('Error submitting feedback');
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Enter your feedback..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Your email (optional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
