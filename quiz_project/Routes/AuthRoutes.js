const express = require('express');
const { signupKid, checkSuicideCases,saveQuizResult,checkRobotPermission,getHistoriqueEnfantById, getHistoriqueEnfants, getHistoriqueEnfantsByAdmin, signupParent, login, getAllChapter, getQuizzesByChapterId, getQuestionsByQuizId, getChapterIdForQuiz, submitReclamation, submitQuizHistory, submitQuestionnaire } = require('../Controllers/AuthController');

const router = express.Router();

router.post('/signup/kid', signupKid);
router.post('/signup/parent', signupParent);
router.post('/login', login);

router.get('/chapter', getAllChapter);
router.get('/chapters/:chapterId/quizzes', getQuizzesByChapterId);
router.get('/quizzes/:quizId/questions', getQuestionsByQuizId);
router.get('/quizzes/:quizId/chapterId', getChapterIdForQuiz);
router.get('/check-suicide/:userId', checkSuicideCases);


router.post('/reclamation', submitReclamation);
router.post('/questionnaire', submitQuestionnaire); 
router.post('/saveQuizResult', saveQuizResult);


router.put('/historique', submitQuizHistory);

router.get('/historique-enfants/:parentId', getHistoriqueEnfants);
router.get('/historiqueadmin', getHistoriqueEnfantsByAdmin);
router.get('/historique-enfant/:parentId', getHistoriqueEnfantById);


router.post('/check-robot-permission', checkRobotPermission);
module.exports = router;
