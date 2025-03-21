import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { 
      icon: "🎯", 
      label: "Learning Paths",
      path: "/earning-paths",
      active: location.pathname.includes('learning-paths')
    },
    { 
      icon: "🗂️", 
      label: "Flashcards",
      path: "/flashcards",
      active: location.pathname.includes('flashcards')
    },
    { 
      icon: "📝", 
      label: "Quiz",
      path: "/quiz",
      active: location.pathname.includes('quiz')
    },
    { 
      icon: "📈", 
      label: "Progress",
      path: "/progress",
      active: location.pathname.includes('progress')
    },
    { 
      icon: "⚙️", 
      label: "Settings",
      path: "/settings",
      active: location.pathname.includes('settings')
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 h-screen bg-white border-r border-purple-100 fixed left-0 top-16"
    >
      <div className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleNavigation(item.path)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
              item.active 
                ? "bg-purple-100 text-purple-600" 
                : "hover:bg-purple-50"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;
