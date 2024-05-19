import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/authActions';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'S'
  });

  const { username, email, password, role } = formData;
  const dispatch = useDispatch();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(register({ username, email, password, role }));
  };

  return (
    <form onSubmit={onSubmit}>
      <input type=\"text\" name=\"username\" value={username} onChange={onChange} placeholder=\"Username\" required />
      <input type=\"email\" name=\"email\" value={email} onChange={onChange} placeholder=\"Email\" required />
      <input type=\"password\" name=\"password\" value={password} onChange={onChange} placeholder=\"Password\" required />
      <select name=\"role\" value={role} onChange={onChange} required>
        <option value=\"D\">Dominant (Habit Setter)</option>
        <option value=\"S\">Submissive (Habit Tracker)</option>
      </select>
      <button type=\"submit\">Register</button>
    </form>
  );
};

export default Register;
