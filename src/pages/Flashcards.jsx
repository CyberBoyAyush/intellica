import React, { useState } from "react";
import { motion } from "framer-motion";

const Flashcards = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent mb-6">
          Flashcards
        </h1>
        <div className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-full max-w-lg aspect-video bg-purple-50 rounded-xl shadow-lg cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="h-full flex items-center justify-center p-8">
              <h2 className="text-2xl font-semibold text-purple-700 text-center">
                {isFlipped ? "Answer goes here" : "Question goes here"}
              </h2>
            </div>
          </motion.div>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg">Previous</button>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
