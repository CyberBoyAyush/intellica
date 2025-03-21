import React from "react";
import { motion } from "framer-motion";

const Progress = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
          Progress Tracking
        </h1>
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="w-16 h-16"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <svg className="w-full h-full text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </motion.div>
            <p className="text-xl text-gray-600">Coming Soon!</p>
            <p className="text-gray-500">
              Track your learning progress and achievements
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Progress;
