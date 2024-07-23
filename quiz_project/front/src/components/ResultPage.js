import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuizContext } from './QuizContext';

const ResultPage = () => {
  const { quizId } = useParams();
  const { getQuizResult, quizResults } = useQuizContext();
  const correctAnswers = getQuizResult(quizId);
  console.log("quizResults:", quizResults);
  return (
    <div>
      <h2>Quiz Results</h2>
      <p>Quiz ID: {quizId}</p>
      <p>Correct Answers: {correctAnswers}</p>
      {/* Add other result display logic here */}
    </div>
  );
};

export default ResultPage;
