import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Add this import

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Add this line
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(formData.email, formData.password); // Use formData
      // Login successful - redirect handled by AuthContext
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent mb-6">
          Welcome Back
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          
          <div>
            <label className="text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-medium"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <motion.span
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/signup')}
            className="text-purple-600 cursor-pointer font-medium"
          >
            Sign up
          </motion.span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
