import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const cards = [
    {
      title: "Continue Learning",
      description: "Resume your learning journey",
      icon: "📚",
      color: "from-purple-500 to-purple-600",
      path: "/learning-path",
      stats: "2 paths in progress"
    },
    {
      title: "Flashcards",
      description: "Practice with your decks",
      icon: "🗂️",
      color: "from-indigo-500 to-indigo-600",
      path: "/flashcards",
      stats: "50 cards mastered"
    },
    {
      title: "Quiz Performance",
      description: "Track your quiz scores",
      icon: "📊",
      color: "from-violet-500 to-violet-600",
      path: "/quiz",
      stats: "85% success rate"
    }
  ];

  const quickActions = [
    { icon: "🎯", label: "New Learning Path", path: "/learning-path" },
    { icon: "🗂️", label: "Create Flashcards", path: "/flashcards" },
    { icon: "📝", label: "Take Quiz", path: "/quiz" },
    { icon: "📈", label: "View Progress", path: "/progress" },
  ];

  return (
    <div className="flex-1 max-w-full p-6 overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl p-8 text-white shadow-lg"
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'Learner'}! 👋
          </h1>
          <p className="text-purple-100">Ready to continue your learning journey?</p>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={index}
              onClick={() => navigate(action.path)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(card.path)}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="text-3xl mb-4">{card.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {card.title}
              </h2>
              <p className="text-gray-600 mb-4">{card.description}</p>
              <div className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full inline-block">
                {card.stats}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <div className="flex-1">
                  <p className="text-gray-800">Completed Python Basics Quiz</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
                <div className="text-sm font-medium text-purple-600">Score: 90%</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
