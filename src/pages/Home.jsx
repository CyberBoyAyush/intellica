import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-purple-50 relative w-full">
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="fixed top-20 -right-20 md:right-0 w-72 md:w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="fixed top-40 -left-20 md:left-0 w-72 md:w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col items-center justify-center relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={item} className="mb-8">
          <div className="inline-block p-2 bg-purple-100/80 backdrop-blur-sm rounded-2xl">
            <span className="bg-white px-4 py-1.5 rounded-xl text-purple-600 font-medium text-sm flex items-center gap-2">
              <span className="animate-pulse">🚀</span> AI-Powered Learning
            </span>
          </div>
        </motion.div>

        <motion.h1 
          variants={item}
          className="text-3xl sm:text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent mb-6 max-w-4xl px-2"
        >
          Transform Your Learning Journey with AI
        </motion.h1>

        <motion.p 
          variants={item}
          className="text-base sm:text-lg md:text-xl text-gray-600 text-center max-w-2xl mb-12 px-2"
        >
          Experience personalized learning paths, interactive quizzes, and AI-generated flashcards
          tailored to your unique learning style.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl transition-shadow flex items-center justify-center gap-2 group"
          >
            Start Learning
            <motion.svg 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-4 border-2 border-purple-200 text-purple-700 rounded-xl hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
          >
            Watch Demo
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.button>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-16 pt-8 border-t border-purple-100 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 max-w-3xl w-full px-2 sm:px-4"
        >
          {[
            { number: "10K+", label: "Active Users" },
            { number: "50+", label: "Course Topics" },
            { number: "95%", label: "Success Rate" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2 }}
              className="text-center p-4 rounded-lg hover:bg-white/50 transition-colors"
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm sm:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
