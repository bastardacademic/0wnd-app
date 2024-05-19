import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/authActions';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const dispatch = useDispatch();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <form onSubmit={onSubmit}>
      <input type=\"email\" name=\"email\" value={email} onChange={onChange} placeholder=\"Email\" required />
      <input type=\"password\" name=\"password\" value={password} onChange={onChange} placeholder=\"Password\" required />
      <button type=\"submit\">Login</button>
    </form>
  );
};

export default Login;
