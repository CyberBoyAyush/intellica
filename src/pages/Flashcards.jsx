import React, { useRef } from "react";
import { FlashcardArray } from "react-quizlet-flashcard";
import { motion } from "framer-motion";

const Flashcards = () => {
  const manualFlipRef = useRef(null); // Reference for manual flip control

  const cards = [
    {
      id: 1,
      frontHTML: "What is the capital of Alaska?",
      backHTML: "Juneau",
    },
    {
      id: 2,
      frontHTML: "What is the capital of California?",
      backHTML: "Sacramento",
    },
    {
      id: 3,
      frontHTML: "What is the capital of New York?",
      backHTML: "Albany",
    },
    {
      id: 4,
      frontHTML: "What is the capital of Florida?",
      backHTML: "Tallahassee",
    },
    { id: 5, frontHTML: "What is the capital of Texas?", backHTML: "Austin" },
    {
      id: 6,
      frontHTML: "What is the capital of New Mexico?",
      backHTML: "Santa Fe",
    },
    {
      id: 7,
      frontHTML: "What is the capital of Arizona?",
      backHTML: "Phoenix",
    },
  ];

  return (
    <motion.div
      className="flex justify-center min-h-screen p-6 "
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className=" text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent mb-6">
          Flashcards
        </h1>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FlashcardArray
            cards={cards}
            className="text-stone-900"
            borderRadius="1rem"
            height="320px"
            width="500px"
            style={{ boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)" }}
            manualFlipRef={manualFlipRef}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Flashcards;
