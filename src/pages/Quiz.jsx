import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { generateQuizData } from "../config/gemini";
import QuizCard from "../components/QuizCard";
import { useAuth } from '../context/AuthContext';
import { updateUserProgress } from '../config/database';

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
  const { user } = useAuth();

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
    if (showResults && quizData && user?.$id) {
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
      const accuracyValue = ((correctCount / quizData.questions.length) * 100).toFixed(2);
      setAccuracy(accuracyValue);

      // Update user progress
      updateUserProgress(user.$id, {
        topicName: topic,
        quizScores: {
          topic,
          score: totalScore,
          accuracy: accuracyValue,
          totalQuestions: quizData.questions.length,
          date: new Date().toISOString()
        }
      }).catch(console.error);
    }
  }, [showResults, quizData, userAnswers, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-lg font-semibold text-purple-600">Generating Quiz...</p>
        </motion.div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 p-8">
        <motion.div 
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
            AI-Powered Quiz
          </h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quiz Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., JavaScript Fundamentals, World History"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Questions
              </label>
              <input
                type="number"
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                min="1"
                max="10"
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <motion.button
              onClick={handleGenerateQuiz}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-medium shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Generate Quiz
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentIndex];
  const userAnswer = userAnswers[currentIndex] || [];
  const correctAnswer = Array.isArray(currentQuestion.correctAnswer)
    ? currentQuestion.correctAnswer
    : [currentQuestion.correctAnswer];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 p-8">
      {!showResults ? (
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {topic} Quiz
            </h2>
            <div className="flex items-center justify-center gap-4 mt-2">
              <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                Question {currentIndex + 1} of {quizData.questions.length}
              </span>
              <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                Points: {currentQuestion.point}
              </span>
            </div>
          </div>

          <QuizCard
            question={currentQuestion.question}
            answers={currentQuestion.answers}
            selectedAnswers={userAnswers[currentIndex] || []}
            onAnswerSelect={handleAnswerSelect}
            questionType={currentQuestion.questionType}
            showResults={false}
          />

          <div className="flex justify-between mt-6">
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
        </div>
      ) : (
        <motion.div
          className="max-w-4xl mx-auto space-y-8"
          initial={{ opacity: 0, y: 19 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Results Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent mb-4">
              Quiz Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-50 p-4 rounded-xl">
                <p className="text-sm text-purple-600">Total Score</p>
                <p className="text-2xl font-bold text-purple-700">
                  {score} / {quizData.questions.length * 10}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl">
                <p className="text-sm text-purple-600">Accuracy</p>
                <p className="text-2xl font-bold text-purple-700">{accuracy}%</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl">
                <p className="text-sm text-purple-600">Questions</p>
                <p className="text-2xl font-bold text-purple-700">
                  {quizData.questions.length}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Review */}
          <div className="space-y-6">
            {quizData.questions.map((q, index) => (
              <QuizCard
                key={index}
                question={q.question}
                answers={q.answers}
                selectedAnswers={userAnswers[index] || []}
                onAnswerSelect={() => {}}
                questionType={q.questionType}
                showResults={true}
                correctAnswer={q.correctAnswer}
                explanation={q.explanation}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <motion.button
              onClick={() => setQuizData(null)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-medium shadow-lg"
            >
              Start New Quiz
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Quiz;
