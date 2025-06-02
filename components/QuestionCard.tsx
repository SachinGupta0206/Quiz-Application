import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  onAnswerSelect: (selectedOption: string) => void;
  selectedOption: string | null;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  onAnswerSelect,
  selectedOption,
}) => {
  return (
    <div className="bg-white p-6 rounded shadow-md transition transform duration-500">
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </p>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-2">
          {question.question}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswerSelect(option)}
            className={`border px-4 py-2 rounded transition ${
              selectedOption === option
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-800 hover:bg-blue-100'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
