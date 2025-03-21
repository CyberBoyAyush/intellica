import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { 
      icon: "🏠", 
      label: "Dashboard",
      path: "/dashboard",
      active: location.pathname === '/dashboard'
    },
    { 
      icon: "🎯", 
      label: "Learning Paths",
      path: "/learning-path",
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
    { 
      icon: "💬", 
      label: "AI Chat",
      path: "/chat",
      active: location.pathname === '/chat'
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const HamburgerButton = () => (
    <motion.button
      className="fixed top-4 left-4 p-2 z-[999] bg-white rounded-xl shadow-lg border border-purple-100 md:hidden"
      onClick={() => setIsOpen(!isOpen)}
    >
      <motion.div 
        className="w-6 h-5 flex flex-col justify-between"
        animate={isOpen ? "open" : "closed"}
      >
        <motion.span 
          className="w-full h-0.5 bg-purple-600 block"
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: 45, y: 9 }
          }}
        />
        <motion.span 
          className="w-full h-0.5 bg-purple-600 block"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 }
          }}
        />
        <motion.span 
          className="w-full h-0.5 bg-purple-600 block"
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: -45, y: -9 }
          }}
        />
      </motion.div>
    </motion.button>
  );

  return (
    <>
      <HamburgerButton />
      <motion.div
        initial={{ x: -250 }}
        animate={{ 
          x: isOpen ? 0 : -250,
          width: isOpen ? '100%' : 0
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed left-0 top-0 h-screen md:w-64 bg-white/95 backdrop-blur-sm border-r border-purple-100 z-[998] overflow-hidden shadow-xl md:shadow-none"
      >
        <div className="min-h-screen p-4 space-y-2 pt-20 w-64">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                handleNavigation(item.path);
                if (window.innerWidth < 768) setIsOpen(false);
              }}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                ${item.active 
                  ? "bg-purple-100 text-purple-600" 
                  : "hover:bg-purple-50"
                }
                sm:px-4 sm:py-3`}
            >
              <span className="text-xl sm:text-2xl">{item.icon}</span>
              <span className="font-medium text-sm sm:text-base">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Mobile Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[997] md:hidden ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
};

export default Sidebar;
