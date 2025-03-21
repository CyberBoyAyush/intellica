import React from "react";
import { motion } from "framer-motion";

const LearningPath = () => {
  const paths = [
    { title: "Basics of AI", progress: 60 },
    { title: "Machine Learning", progress: 30 },
    { title: "Deep Learning", progress: 0 },
  ];

  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent mb-6">
          Learning Paths
        </h1>
        <div className="space-y-4">
          {paths.map((path, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.01 }}
              className="bg-purple-50 p-6 rounded-lg"
            >
              <h2 className="text-xl font-semibold text-purple-700 mb-2">{path.title}</h2>
              <div className="w-full bg-purple-200 rounded-full h-2.5">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${path.progress}%` }}
                ></div>
              </div>
              <p className="text-gray-600 mt-2">{path.progress}% Complete</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
