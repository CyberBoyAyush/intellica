import React from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const cards = [
    {
      title: "Learning Progress",
      description: "Continue where you left off",
      icon: "📚",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Recent Flashcards",
      description: "Review your latest deck",
      icon: "🗂️",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      title: "Quiz Scores",
      description: "Track your performance",
      icon: "📊",
      color: "from-violet-500 to-violet-600"
    }
  ];

  return (
    <div className="flex-1 max-w-full overflow-x-hidden">
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent mb-4"
        >
          Welcome Back!
        </motion.h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br p-[1px] rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="bg-purple-50 p-4 sm:p-6 rounded-lg h-full">
                <div className="text-2xl sm:text-3xl mb-3">{card.icon}</div>
                <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-2">
                  {card.title}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
