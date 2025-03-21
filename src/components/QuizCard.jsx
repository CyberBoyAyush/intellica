import React from 'react';
import { motion } from 'framer-motion';

const QuizCard = ({ 
  question, 
  answers, 
  selectedAnswers, 
  onAnswerSelect, 
  questionType, 
  showResults, 
  correctAnswer 
}) => {
  const isCorrect = (answer) => {
    if (!showResults) return false;
    return Array.isArray(correctAnswer) 
      ? correctAnswer.includes(answer)
      : answer === correctAnswer;
  };

  const isSelected = (answer) => selectedAnswers?.includes(answer);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6">
        <span className="text-xs font-medium text-purple-500 bg-purple-50 px-3 py-1 rounded-full">
          {questionType === 'multiple' ? 'Multiple Choice' : 'Single Choice'}
        </span>
        <h3 className="text-xl font-semibold mt-3 text-gray-800">
          {question}
        </h3>
      </div>

      <div className="space-y-3">
        {answers.map((answer, index) => (
          <motion.button
            key={index}
            onClick={() => onAnswerSelect(answer)}
            className={`w-full text-left p-4 rounded-xl transition-all 
              ${isSelected(answer) 
                ? showResults
                  ? isCorrect(answer)
                    ? 'bg-green-100 border-2 border-green-500 text-green-700'
                    : 'bg-red-100 border-2 border-red-500 text-red-700'
                  : 'bg-purple-100 border-2 border-purple-500 text-purple-700'
                : 'bg-gray-50 border-2 border-transparent hover:border-purple-300'
              }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={showResults}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm
                ${isSelected(answer)
                  ? showResults
                    ? isCorrect(answer)
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-600'
                }`}
              >
                {String.fromCharCode(65 + index)}
              </div>
              <span className="font-medium">{answer}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {questionType === 'multiple' && (
        <p className="text-sm text-gray-500 mt-4 italic">
          Select all that apply
        </p>
      )}
    </motion.div>
  );
};

export default QuizCard;
