import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useQuizContext } from './QuizContext';
import '../assets/Quizchapter.css';

const QuizList = () => {
  const { chapterId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const { getQuizPassed, updateQuizResult, currentQuizCompleted, setQuizCompletedId } = useQuizContext();

  useEffect(() => {
    axios
      .get(`http://localhost:3005/chapters/${chapterId}/quizzes`)
      .then((response) => {
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [chapterId]);

  const handleQuizSelection = (quizId) => {
    const quizPassed = getQuizPassed(quizId);
    if (!quizPassed) {
      setSelectedQuiz(quizId);
      if (currentQuizCompleted !== quizId) {
        updateQuizResult(quizId, 0); // Reset the quiz results only if the quiz has not been completed before
      }
    }
  };

  return (
    <div className="QuizList">
      <h2>Les Quizzes</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <Link
              to={`/questions/${quiz.id}`}
              className={`quiz-link ${selectedQuiz === quiz.id ? 'selected' : ''}`}
              onClick={() => {
                handleQuizSelection(quiz.id);
              }}
            >
              {quiz.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
