import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = () => {
  const linkVariants = {
    hover: { scale: 1.05, x: 10 }
  };

  return (
    <motion.aside 
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-64 bg-white/80 backdrop-blur-sm shadow-sm min-h-screen p-6"
    >
      <nav className="flex flex-col space-y-6">
        {[
          { to: "/dashboard", icon: "📊", text: "Dashboard" },
          { to: "/learning-path", icon: "📖", text: "Learning Path" },
          { to: "/quiz", icon: "📝", text: "Quiz" },
          { to: "/flashcards", icon: "📚", text: "Flashcards" }
        ].map((item) => (
          <motion.div
            key={item.to}
            variants={linkVariants}
            whileHover="hover"
          >
            <Link 
              to={item.to} 
              className="text-gray-700 font-medium hover:text-purple-600 flex items-center gap-3"
            >
              <span>{item.icon}</span>
              {item.text}
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
