import React, { useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Dom' | 'Sub' | 'Switch'>('Sub');
  const [error, setError] = useState<string | null>(null);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, password, role);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white focus:outline-none"
          required
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value as 'Dom' | 'Sub' | 'Switch')}
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white focus:outline-none"
        >
          <option value="Dom">Dom</option>
          <option value="Sub">Sub</option>
          <option value="Switch">Switch</option>
        </select>
        <button
          type="submit"
          className="w-full py-2 rounded bg-green-600 hover:bg-green-500 transition text-white"
        >
          Register
        </button>
        <p className="text-gray-400 mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;