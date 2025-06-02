import React from 'react';
import Button from './Button';

interface QuizResultProps {
  score: number;
  bonusScore: number;
  totalQuestions: number;
  timeTaken: number;
  isNewHighScore: boolean;
  onPlayAgain: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({
  score,
  bonusScore,
  totalQuestions,
  timeTaken,
  isNewHighScore,
  onPlayAgain,
}) => {
  const finalScore = score + bonusScore;

  return (
    <div className="bg-white p-6 rounded shadow-md text-center transition transform duration-500">
      <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p className="text-lg">
        You answered {score} out of {totalQuestions} questions correctly.
      </p>
      <p className="text-lg">Time Taken: {timeTaken} seconds</p>
      <p className="text-lg">Bonus Score: {bonusScore}</p>
      <p className="text-xl font-semibold mt-2">
        Final Score: {finalScore}
      </p>
      {isNewHighScore && (
        <p className="text-green-600 font-bold mt-2">🎉 New High Score!</p>
      )}
      <Button onClick={onPlayAgain}>Play Again</Button>
    </div>
  );
};

export default QuizResult;
