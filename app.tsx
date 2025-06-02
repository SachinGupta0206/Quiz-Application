import React, { useState, useEffect, useCallback } from 'react';

// Define the interface for a single question
interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

// Array of quiz questions
const questions: Question[] = [
  {
    id: 1,
     questionText: 'The function which is called to render HTML to a web page in react?',
    options: ['ReactDOM_render()', 'render()', 'render_DOM()', 'DOM_HTML()'],
    correctAnswer: 'render()',
  },
  {
    id: 2,
    questionText: 'What is Tailwind CSS?',
    options: ['A CSS preprocessor like Sass','A utility-first CSS framework','A JavaScript library for styling','A set of pre-designed components' ],
    correctAnswer: 'A utility-first CSS framework',
  },
  {
    id: 3,
    questionText: 'Using which of the following command can prevent default behaviour at in react?',
    options: ['preventDefault()', 'default()', 'avoidDefault()', 'None of the above'],
    correctAnswer: 'preventDefault() ',
  },
  {
    id: 4,
    questionText: 'Which class in Tailwind CSS makes text bold?',
    options: ['bold', 'font-bold', 'strong', 'text-bold'],
    correctAnswer: 'font-bold',
  },
  {
    id: 5,
    questionText: 'Total ways of defining variables in ES6 is?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '3',
  },
];

// Main App component
const App: React.FC = () => {
  // State variables for the quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [highestScore, setHighestScore] = useState<number>(0);
  const [isNewHighScore, setIsNewHighScore] = useState<boolean>(false);
  const [baseScore, setBaseScore] = useState<number>(0);
  const [bonusScore, setBonusScore] = useState<number>(0);
  const [finalScore, setFinalScore] = useState<number>(0);

  // Effect to load highest score from localStorage on component mount
  useEffect(() => {
    const storedHighestScore = localStorage.getItem('highestQuizScore');
    if (storedHighestScore) {
      setHighestScore(parseInt(storedHighestScore, 10));
    }
  }, []);

  // Function to start the quiz
  const handleStartQuiz = useCallback(() => {
    setQuizStarted(true);
    setStartTime(Date.now()); // Record start time
    sessionStorage.removeItem('currentQuizTime'); // Clear previous session time
  }, []);

  // Function to handle an answer selection
  const handleAnswer = useCallback((selectedAnswer: string) => {
    // Check if the selected answer is correct
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    // Move to the next question
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      const endTime = Date.now();
      const calculatedTimeTaken = Math.floor((endTime - startTime) / 1000);
      setTimeTaken(calculatedTimeTaken);
      sessionStorage.setItem('currentQuizTime', calculatedTimeTaken.toString()); // Save time to sessionStorage

      // Calculate base score (10 points per correct answer)
      const calculatedBaseScore = (score + (selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 1 : 0)) * 10;
      setBaseScore(calculatedBaseScore);

      // Calculate bonus score based on time taken (more points for faster completion)
      // The bonus score is calculated as (correct answers * 1000) / time taken
      const calculatedBonusScore = calculatedTimeTaken > 0
        ? Math.floor(((score + (selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 1 : 0)) * 1000) / calculatedTimeTaken)
        : 0; // Avoid division by zero if time taken is 0
      setBonusScore(calculatedBonusScore);

      // Final score is the sum of base and bonus scores
      const calculatedFinalScore = calculatedBaseScore + calculatedBonusScore;
      setFinalScore(calculatedFinalScore);

      // Check for new high score and save to localStorage
      if (calculatedFinalScore > highestScore) {
        setHighestScore(calculatedFinalScore);
        localStorage.setItem('highestQuizScore', calculatedFinalScore.toString());
        setIsNewHighScore(true);
      } else {
        setIsNewHighScore(false);
      }
    }
  }, [currentQuestionIndex, score, startTime, highestScore]);

  // Function to reset the quiz state for playing again
  const handlePlayAgain = useCallback(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizStarted(false);
    setQuizCompleted(false);
    setStartTime(0);
    setTimeTaken(0);
    setIsNewHighScore(false);
    setBaseScore(0);
    setBonusScore(0);
    setFinalScore(0);
    sessionStorage.removeItem('currentQuizTime'); // Clear session time on play again
  }, []);

  // Render the appropriate screen based on quiz state
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-purple-600 flex items-center justify-center p-4 font-inter">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-md transition-all duration-500 ease-in-out transform hover:scale-105">
        {!quizStarted ? (
          // Start Screen
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 animate-fade-in">
              Welcome to the Quiz!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Test your knowledge with 5 challenging questions.
            </p>
            {/* Corrected button class for proper Tailwind styling */}
            <button onClick={handleStartQuiz} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-300">
              Start Quiz
            </button>
            {highestScore > 0 && (
              <p className="mt-4 text-md text-gray-500">
                Highest Score Ever: <span className="font-semibold text-green-700">{highestScore}</span>
              </p>
            )}
          </div>
        ) : quizCompleted ? (
          // Results Screen
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
              Quiz Completed!
            </h2>
            <p className="text-xl text-gray-700 mb-2">
              Base Score: <span className="font-bold text-blue-600">{baseScore}</span>
            </p>
            <p className="text-xl text-gray-700 mb-2">
              Bonus Score: <span className="font-bold text-purple-600">{bonusScore}</span>
            </p>
            <p className="text-2xl text-gray-800 font-bold mb-4">
              Final Score: <span className="text-green-700">{finalScore}</span>
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Time Taken: <span className="font-semibold">{timeTaken}</span> seconds
            </p>
            {isNewHighScore && (
              <p className="text-2xl font-bold text-yellow-600 mb-6 animate-bounce">
                🎉 New High Score!
              </p>
            )}
            <p className="text-md text-gray-500 mb-6">
              Your Highest Score Ever: <span className="font-semibold text-green-700">{highestScore}</span>
            </p>
            <button
              onClick={handlePlayAgain}
              className="bg-yellow-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Play Again
            </button>
          </div>
        ) : (
          // Question Screen
          <div className="animate-fade-in">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              {questions[currentQuestionIndex].questionText}
            </p>
            <div className="flex flex-col space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
