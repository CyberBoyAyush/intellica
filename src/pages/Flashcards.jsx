import React, { useState, useRef } from "react";
import { FlashcardArray } from "react-quizlet-flashcard";
import { motion } from "framer-motion";
import { generateFlashcards } from "../config/gemini";

const Flashcards = () => {
  const manualFlipRef = useRef(null);
  const [topic, setTopic] = useState(""); // Topic input
  const [numCards, setNumCards] = useState(5); // Number of flashcards
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFlashcards = async () => {
    if (!topic.trim() || numCards < 1) {
      return alert("Please enter a valid topic and number of flashcards!");
    }

    setLoading(true);
    setError(null);

    try {
      const generatedCards = await generateFlashcards(topic, numCards);
      setCards(generatedCards);
    } catch (err) {
      console.error("Error fetching flashcards:", err);
      setError("Failed to load flashcards. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center min-h-screen p-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent mb-6">
        Flashcards
      </h1>

      {/* Input Fields */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic (e.g., JavaScript Basics)"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="number"
          value={numCards}
          onChange={(e) =>
            setNumCards(Math.max(1, parseInt(e.target.value) || 1))
          }
          placeholder="Number of Flashcards"
          className="px-4 py-2 border rounded-md w-20 text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={fetchFlashcards}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
        >
          Get Flashcards
        </button>
      </div>

      {/* Loading/Error Messages */}
      {loading && <p className="text-gray-500">Generating flashcards...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Flashcards Display */}
      {cards.length > 0 && !loading && (
        <motion.div
          className="flex justify-center mt-6"
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
      )}
    </motion.div>
  );
};

export default Flashcards;
