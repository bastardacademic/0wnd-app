import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendFeedback } from '../../redux/actions/feedbackActions';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendFeedback(feedback));
    setFeedback('');  // Clear the form after submitting
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Feedback</h2>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Write your feedback here"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;
