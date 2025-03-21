import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col items-center justify-center text-center p-6 relative"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-purple-100/30 via-transparent to-transparent"></div>
        
        <motion.div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8"
          >
            <div className="inline-block p-2 bg-purple-100 rounded-2xl mb-6">
              <span className="bg-white px-4 py-1 rounded-xl text-purple-600 font-medium text-sm">
                AI-Powered Learning 🚀
              </span>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent mb-6"
          >
            Your Personal Learning Assistant
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mt-2 max-w-2xl mx-auto mb-12"
          >
            Personalized learning paths, interactive quizzes, and AI-generated flashcards
            to help you master any subject.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-6"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard")}
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl shadow-lg shadow-purple-500/25 flex items-center gap-2"
            >
              Get Started
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard")}
              className="px-8 py-4 border-2 border-purple-200 text-purple-700 rounded-xl hover:bg-purple-50 transition-colors flex items-center gap-2"
            >
              Watch Demo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 pt-8 border-t border-purple-100 flex justify-center gap-12"
          >
            {[
              { number: "10K+", label: "Active Users" },
              { number: "50+", label: "Course Topics" },
              { number: "95%", label: "Success Rate" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-purple-700">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Home;
