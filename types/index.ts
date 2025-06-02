export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  quizStarted: boolean;
  quizCompleted: boolean;
  timeTaken: number;
  bonusScore: number;
  highScore: number;
  isNewHighScore: boolean;
  startTime: number | null;
}
