import React, { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export const useQuizContext = () => useContext(QuizContext);

export const QuizContextProvider = ({ children }) => {
  const [quizResults, setQuizResults] = useState({});
  const [quizHistory, setQuizHistory] = useState({});
  const [currentQuizCompleted, setCurrentQuizCompleted] = useState(null);
  const [userid, setUserid] = useState(null); 

  const updateQuizResult = (quizId, correctAnswers) => {
    setQuizResults((prevResults) => ({
      ...prevResults,
      [quizId]: correctAnswers,
    }));
  };

  const updateQuizHistory = (quizId, correctAnswers) => {
    setQuizHistory((prevHistory) => ({
      ...prevHistory,
      [quizId]: [...(prevHistory[quizId] || []), correctAnswers],
    }));
  };
  
  
  
 

  const getQuizResult = (quizId) => {
    return quizResults[quizId] || 0;
  };

  const getQuizPassed = (quizId) => {
    const correctAnswers = quizResults[quizId] || 0;
    const threshold = 4; // Mettez ici le seuil requis pour réussir le quiz (par exemple, 4).
    return correctAnswers >= threshold;
  };


 const setQuizCompletedId = (quizId) => {
    setCurrentQuizCompleted(quizId);
  };

  return (
    <QuizContext.Provider
      value={{
        quizResults,
        updateQuizResult,
        getQuizResult,
        quizHistory,
        updateQuizHistory,
        getQuizPassed,
        setQuizCompletedId,
        currentQuizCompleted,
        userid, 
        setUserid
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
