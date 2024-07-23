import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useQuizContext } from './QuizContext';
import '../assets/Quizchapter.css';

const QuestionPage = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [correctAnswersArray, setCorrectAnswersArray] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [chapterId, setChapterId] = useState(null);
  const [quizHistory, setQuizHistory] = useState({});

  const { userid, updateQuizResult, getQuizResult, updateQuizHistory, currentQuizCompleted, setQuizCompletedId } = useQuizContext();

  useEffect(() => {
    console.log("userid :", userid);
  }, [userid]);

  useEffect(() => {
    axios.get(`http://localhost:3005/quizzes/${quizId}/questions`)
      .then((response) => {
        const shuffledQuestions = shuffleArray(response.data);
        const randomQuestions = shuffledQuestions.slice(0, 5);

        setQuestions(randomQuestions);
        setCurrentQuestionIndex(0);
        setSelectedOptions([]);
        setQuizCompleted(false);
        setCorrectAnswersArray(randomQuestions[0]?.correctAnswer.split(','));
      })
      .catch((error) => {
        console.error("Error fetching questions", error);
      });

    axios.get(`http://localhost:3005/quizzes/${quizId}/chapterId`)
      .then((response) => {
        setChapterId(response.data.chapterId);
      })
      .catch((error) => {
        console.error("Error fetching chapterId", error);
      });
  }, [quizId]);

  useEffect(() => {
    if (currentQuizCompleted && quizHistory[currentQuizCompleted]) {
      axios.put(`http://localhost:3005/historique`, {
        userId: userid,
        quizHistory: quizHistory,
      })
      .then(response => {
        console.log('Historique mis à jour avec succès.');
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [currentQuizCompleted, quizHistory, userid]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleOptionSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const cleanedSelectedOptions = selectedOptions.map((option) => option.trim());
    const currentCorrectAnswers = correctAnswersArray.map((answer) => answer.trim());
    let isCorrect = false;

    if (currentCorrectAnswers.length > 0) {
      isCorrect = currentCorrectAnswers.every((correctAnswer) =>
        cleanedSelectedOptions.includes(correctAnswer)
      );

      if (isCorrect) {
        const newCorrectAnswers = getQuizResult(quizId) + 1;
        updateQuizResult(quizId, newCorrectAnswers);
      }
    }

    handleNextQuestion();

    if (currentQuestionIndex === questions.length - 1) {
      setQuizCompleted(true);

      const totalCorrectAnswers = getQuizResult(quizId) + (isCorrect ? 1 : 0);
      updateQuizHistory(quizId, totalCorrectAnswers);
      setQuizCompletedId(quizId);

      saveQuizResult(userid, quizId, totalCorrectAnswers);
    }
  };

  const saveQuizResult = (userId, quizId, score) => {
    axios.post('http://localhost:3005/saveQuizResult', { userId, quizId, score })
      .then(response => {
        console.log('Résultat du quiz enregistré avec succès.');
      })
      .catch(error => {
        console.error('Erreur lors de l\'enregistrement du résultat du quiz', error);
      });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions([]);
      setCorrectAnswersArray(questions[currentQuestionIndex + 1]?.correctAnswer.split(','));
    } else {
      setQuizCompleted(true);
    }
  };

  const isNextButtonDisabled = selectedOptions.length === 0;
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="QuestionPage">
      {questions.length > 0 && currentQuestion ? (
        <>
          <h2>Les Questions</h2>
          {quizCompleted ? (
            <div className="ResultMessage">
              <h2>Résultats du quiz</h2>
              {questions.map((question, index) => (
                <div key={index} className="question-container">
                  <p>{`Question ${index + 1}: ${question.text}`}</p>
                  <p>{`Réponse correcte: ${question.correctAnswer}`}</p>
                </div>
              ))}
              {(parseInt(quizId) === 3 || parseInt(quizId) === 6 || parseInt(quizId) === 9) && (
                <Link to={`/quizchapter`} className="ResultLink">Aller aux détails du chapitre</Link>
              )}
            </div>
          ) : (
            <>
              <div>
                <p>{`Question ${currentQuestionIndex + 1}: ${currentQuestion.text}`}</p>
                <div className="options">
                  <div
                    className={`option-box ${selectedOptions.includes(currentQuestion.option1) ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect(currentQuestion.option1)}
                  >
                    {currentQuestion.option1}
                  </div>
                  <div
                    className={`option-box ${selectedOptions.includes(currentQuestion.option2) ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect(currentQuestion.option2)}
                  >
                    {currentQuestion.option2}
                  </div>
                  <div
                    className={`option-box ${selectedOptions.includes(currentQuestion.option3) ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect(currentQuestion.option3)}
                  >
                    {currentQuestion.option3}
                  </div>
                  <div
                    className={`option-box ${selectedOptions.includes(currentQuestion.option4) ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect(currentQuestion.option4)}
                  >
                    {currentQuestion.option4}
                  </div>
                </div>
                <button className="next-btn" onClick={handleAnswer} disabled={isNextButtonDisabled}>Question suivante</button>
              </div>
            </>
          )}
        </>
      ) : (
        <div>
          <p>Chargement...</p>
        </div>
      )}
      {quizCompleted && (
        <Link to="/quizchapter" className="ResultLink">Retour à la page des quiz</Link>
      )}
    </div>
  );
};

export default QuestionPage;
