import React from "react";
import { motion } from "framer-motion";

const Quiz = () => {
  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent mb-6">
          Quiz Time
        </h1>
        <div className="space-y-6">
          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">
              What is artificial intelligence?
            </h2>
            <div className="space-y-3">
              {["Answer 1", "Answer 2", "Answer 3", "Answer 4"].map((answer, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  className="p-4 bg-white rounded-lg border border-purple-100 cursor-pointer hover:border-purple-300"
                >
                  {answer}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg">
              Next Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
