import React, { useState } from "react";
import Quiz from "react-quiz-component";
import { quiz } from "./quizData";
import { motion } from "framer-motion";

const CustomQuiz = () => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [restart, setRestart] = useState(false);

  const handleRestart = () => {
    setShowAnswers(false);
    setQuizCompleted(false);
    setRestart(!restart);
  };

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100 p-6">
      <motion.div
        className="bg-white p-6 rounded-lg max-w-4xl shadow-lg w-full "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-center text-purple-500 text-4xl font-bold">QUIZ</h1>

        <Quiz
          timer={120}
          enableProgressBar={true}
          key={restart} // Forces re-render on restart
          quiz={quiz}
          showInstantFeedback={false}
          showDefaultResult={false}
          onComplete={() => setQuizCompleted(true)}
          customResultPage={(obj) => {
            const accuracy = (
              (obj.numberOfCorrectAnswers / obj.numberOfQuestions) *
              100
            ).toFixed(2); // Calculate accuracy percentage

            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold text-gray-700">
                  Quiz Completed!
                </h2>
                <p className="mt-2 text-lg">
                  You got{" "}
                  <span className="text-green-500 font-semibold">
                    {obj.numberOfCorrectAnswers}
                  </span>{" "}
                  out of{" "}
                  <span className="text-blue-500 font-semibold">
                    {obj.numberOfQuestions}
                  </span>{" "}
                  correct.
                </p>
                <p className="mt-2 text-lg font-semibold text-purple-600">
                  Accuracy: {accuracy}%
                </p>
              </motion.div>
            );
          }}
        />

        {quizCompleted && (
          <motion.div
            className="flex flex-col items-center mt-6 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => setShowAnswers(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              Show Answers
            </button>

            {showAnswers && (
              <motion.div
                className="bg-gray-200 p-4 rounded-lg w-full text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {quiz.questions.map((question, index) => (
                  <div key={index} className="mb-4">
                    <p className="text-lg font-medium text-gray-700">
                      <strong>Q{index + 1}:</strong> {question.question}
                    </p>

                    {question.questionType === "photo" ? (
                      <img
                        src={question.answers[question.correctAnswer - 1]}
                        alt="Answer"
                        className="w-40 h-40 mt-2"
                      />
                    ) : (
                      <p className="text-green-600 font-semibold">
                        ✅{" "}
                        {Array.isArray(question.correctAnswer)
                          ? question.correctAnswer
                              .map((ansIdx) => question.answers[ansIdx - 1])
                              .join(", ")
                          : question.answers[question.correctAnswer - 1]}
                      </p>
                    )}

                    <p className="text-gray-600 mt-2">
                      <strong>Explanation:</strong> {question.explanation}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            <button
              onClick={handleRestart}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
            >
              Restart Quiz
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CustomQuiz;
