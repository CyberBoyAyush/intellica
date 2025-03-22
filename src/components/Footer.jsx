import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isDashboard =
    location.pathname !== "/" && location.pathname !== "/home";

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-white/80 backdrop-blur-sm border-t border-purple-100 py-4 text-center w-full
        ${isDashboard ? "relative mt-auto" : " bottom-0"}`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-600 text-sm">
            © 2025 Intellica. Made with 💜 for learners.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">
              Privacy
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">
              Terms
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
