import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isDashboard }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  const handleSignup = () => {
    navigate("/dashboard");
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/70 backdrop-blur-md border-b border-purple-100 px-8 py-4 flex justify-between items-center fixed top-0 w-full z-10"
    >
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2"
      >
        <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-purple-400 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">I</span>
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
          Intellica
        </span>
      </motion.div>

      {isDashboard ? (
        <div className="flex items-center gap-6">
          <motion.div 
            className="flex items-center gap-3 bg-purple-50 px-4 py-2 rounded-lg"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
              👤
            </div>
            <span className="text-gray-700 font-medium">John Doe</span>
          </motion.div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-lg shadow-purple-500/20 flex items-center gap-2"
          >
            <span>Logout</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </motion.button>
        </div>
      ) : (
        <div className="space-x-4">
          <motion.button
            onClick={handleLogin}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-lg shadow-purple-500/20 hover:bg-purple-700"
          >
            Login
          </motion.button>
          <motion.button
            onClick={handleSignup}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50"
          >
            Sign Up
          </motion.button>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
