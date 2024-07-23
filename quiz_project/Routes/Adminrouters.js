const express = require('express');
const router = express.Router();
const Chapter = require('../Models/Chapter');
const Quiz = require('../Models/Quiz');
const Question = require('../Models/Question');
const {
    getAllChapters,
    getAllQuizzes,
    getAllQuestions,
    deleteChapter,
    deleteQuiz,
    deleteQuestion,
    updateChapter,
    updateQuiz,
    updateQuestion,
    addChapter,
    addQuiz,
    addQuestion,
    getAllUsers,
    addUser,
    updateUser,
    deleteUser
  } = require('../Controllers/Admincontroller');

  router.get('/chapters', getAllChapters);
  router.delete('/chapters/:id', deleteChapter);
  router.put('/chapters/:id', updateChapter);

  router.get('/quizzes', getAllQuizzes);
  router.delete('/quizzes/:id', deleteQuiz);
  router.put('/quizzes/:id', updateQuiz);

  router.get('/questions', getAllQuestions);
  router.delete('/questions/:id', deleteQuestion);
  router.put('/questions/:id', updateQuestion);
   
  router.post('/chapters', addChapter);
  router.post('/quizzes', addQuiz);
  router.post('/questions',addQuestion); 




router.get('/users', getAllUsers);


router.post('/users', addUser);


router.put('/users/:id', updateUser);


router.delete('/users/:id', deleteUser);

module.exports = router;
