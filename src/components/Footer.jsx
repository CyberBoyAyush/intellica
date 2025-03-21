import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/80 backdrop-blur-sm shadow-sm text-center py-4 fixed bottom-0 w-full"
    >
      <p className="text-gray-600 text-sm">
        © 2025 Intellica. Made with 💜 for learners.
      </p>
    </motion.footer>
  );
};

export default Footer;
