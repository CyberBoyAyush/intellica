import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ isDashboard, isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  const handleLogin = () => {
    navigate("/login");  // Changed from /dashboard to /login
  };

  const handleSignup = () => {
    navigate("/signup");  // Changed from /dashboard to /signup
  };

  const handleLogout = () => {
    navigate('/');
  };

  const getUserDisplay = () => {
    if (loading) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-200 rounded-full animate-pulse" />
          <div className="w-20 h-4 bg-purple-200 rounded animate-pulse" />
        </div>
      );
    }

    if (!user) return null;

    return (
      <>
        <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
          {user.$id ? user.$id[0].toUpperCase() : '👤'}
        </div>
        <span className="text-gray-700 font-medium">
          {user.name || user.email?.split('@')[0] || user.$id}
        </span>
      </>
    );
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-white/80 backdrop-blur-md border-b border-purple-100 px-4 md:px-8 py-4 flex justify-between items-center fixed top-0 w-full z-[999]"
    >
      <div className="flex items-center gap-4">
        {isDashboard && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-purple-50 rounded-lg"
          >
            <svg 
              className="w-6 h-6 text-purple-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isSidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        )}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-purple-400 rounded-lg flex items-center justify-center"
          >
            <span className="text-white font-bold">I</span>
          </motion.div>
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
            Intellica
          </span>
        </motion.div>
      </div>

      {isDashboard ? (
        <div className="flex items-center gap-3 md:gap-6">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="hidden md:flex items-center gap-3 bg-purple-50 px-4 py-2 rounded-lg"
          >
            {getUserDisplay()}
          </motion.div>
          <motion.button 
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="px-3 md:px-4 py-2 bg-purple-600 text-white rounded-lg shadow-lg shadow-purple-500/20 flex items-center gap-2 hover:bg-purple-700 transition-colors"
            disabled={loading}
          >
            <span className="hidden md:inline">Logout</span>
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
