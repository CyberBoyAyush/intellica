import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { generateQuizData } from "../config/gemini";

const Quiz = () => {
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleGenerateQuiz = async () => {
    if (!topic || numQuestions < 1) {
      alert("Please enter a valid topic and number of questions.");
      return;
    }

    setLoading(true);
    const data = await generateQuizData(topic, numQuestions);
    setQuizData(data);
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
    setAccuracy(0);
    setCurrentIndex(0);
    setLoading(false);
  };

  const handleAnswerSelect = (answer) => {
    setUserAnswers((prev) => {
      const question = quizData.questions[currentIndex];

      if (question.questionType === "single") {
        return { ...prev, [currentIndex]: [answer] }; // Only one can be selected
      }

      const updatedAnswers = prev[currentIndex]
        ? prev[currentIndex].includes(answer)
          ? prev[currentIndex].filter((a) => a !== answer)
          : [...prev[currentIndex], answer]
        : [answer];

      return { ...prev, [currentIndex]: updatedAnswers };
    });
  };

  useEffect(() => {
    if (showResults && quizData) {
      let totalScore = 0;
      let correctCount = 0;

      quizData.questions.forEach((q, index) => {
        const correctAnswer = Array.isArray(q.correctAnswer)
          ? q.correctAnswer.sort()
          : [q.correctAnswer];
        const userAnswer = userAnswers[index]?.sort() || [];

        if (JSON.stringify(correctAnswer) === JSON.stringify(userAnswer)) {
          totalScore += q.point || 10;
          correctCount++;
        }
      });

      setScore(totalScore);
      setAccuracy(
        ((correctCount / quizData.questions.length) * 100).toFixed(2)
      );
    }
  }, [showResults, quizData, userAnswers]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
        <p className="ml-3 text-lg font-semibold">Generating Quiz...</p>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">AI-Powered Quiz</h1>
        <input
          type="text"
          placeholder="Enter Quiz Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="number"
          placeholder="Number of Questions"
          value={numQuestions}
          onChange={(e) => setNumQuestions(parseInt(e.target.value))}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={handleGenerateQuiz}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Generate Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentIndex];
  const userAnswer = userAnswers[currentIndex] || [];
  const correctAnswer = Array.isArray(currentQuestion.correctAnswer)
    ? currentQuestion.correctAnswer
    : [currentQuestion.correctAnswer];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {!showResults ? (
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="p-4 border rounded shadow"
        >
          <h2 className="text-lg font-bold">
            Question {currentIndex + 1} / {quizData.questions.length}
          </h2>
          <h2 className="text-lg font-semibold mt-2">
            {currentQuestion.question}
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            Type: {currentQuestion.questionType.toUpperCase()} | Points:{" "}
            {currentQuestion.point}
          </p>

          {currentQuestion.answers.map((option, index) => {
            const isSelected = userAnswer.includes(option);
            const isCorrect = correctAnswer.includes(option);
            const isWrong = isSelected && !isCorrect;

            return (
              <motion.div
                key={index}
                className={`p-2 border rounded cursor-pointer mt-1 ${
                  isSelected
                    ? isCorrect
                      ? "bg-green-400 text-white"
                      : "bg-red-400 text-white"
                    : "bg-gray-200"
                }`}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </motion.div>
            );
          })}

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              className={`px-4 py-2 rounded ${
                currentIndex === 0 ? "bg-gray-400" : "bg-blue-500 text-white"
              }`}
              disabled={currentIndex === 0}
            >
              Previous
            </button>

            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  Math.min(prev + 1, quizData.questions.length - 1)
                )
              }
              className={`px-4 py-2 rounded ${
                currentIndex === quizData.questions.length - 1
                  ? "bg-gray-400"
                  : "bg-blue-500 text-white"
              }`}
              disabled={currentIndex === quizData.questions.length - 1}
            >
              Next
            </button>
          </div>

          {currentIndex === quizData.questions.length - 1 && (
            <button
              onClick={() => setShowResults(true)}
              className="bg-green-500 text-white px-4 py-2 rounded w-full mt-4"
            >
              Show Result
            </button>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-4 border rounded bg-gray-100"
        >
          <h2 className="text-lg font-bold">Results</h2>
          <p>
            Score: {score} / {quizData.questions.length * 10}
          </p>
          <p>Accuracy: {accuracy}%</p>

          <h3 className="text-md font-semibold mt-3">Correct Answers:</h3>
          {quizData.questions.map((q, index) => (
            <div key={index} className="mt-2">
              <h4 className="font-medium">{q.question}</h4>
              <p className="text-green-600">
                Correct Answer:{" "}
                {Array.isArray(q.correctAnswer)
                  ? q.correctAnswer.join(", ")
                  : q.correctAnswer}
              </p>
              <p className="text-gray-600">Explanation: {q.explanation}</p>
            </div>
          ))}

          <button
            onClick={() => setQuizData(null)}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4"
          >
            Restart Quiz
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Quiz;
