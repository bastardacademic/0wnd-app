import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createHabit } from '../../redux/actions/habitActions';

const HabitForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    frequency: '',
    startDate: '',
    endDate: '',
    submissiveId: ''
  });

  const { title, description, frequency, startDate, endDate, submissiveId } = formData;
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (user.role === 'D') {
      dispatch(createHabit(formData));
    } else {
      alert('Only Dominants can create habits.');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type=\"text\" name=\"title\" value={title} onChange={onChange} placeholder=\"Title\" required />
      <textarea name=\"description\" value={description} onChange={onChange} placeholder=\"Description\" required></textarea>
      <input type=\"text\" name=\"frequency\" value={frequency} onChange={onChange} placeholder=\"Frequency\" required />
      <input type=\"date\" name=\"startDate\" value={startDate} onChange={onChange} required />
      <input type=\"date\" name=\"endDate\" value={endDate} onChange={onChange} required />
      <input type=\"text\" name=\"submissiveId\" value={submissiveId} onChange={onChange} placeholder=\"Submissive User ID\" required />
      <button type=\"submit\">Add Habit</button>
    </form>
  );
};

export default HabitForm;
