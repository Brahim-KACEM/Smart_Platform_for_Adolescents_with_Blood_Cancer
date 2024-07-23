
const Chapter = require('../Models/Chapter');
const Quiz = require('../Models/Quiz');
const Question = require('../Models/Question');

exports.getAllChapters = async (req, res) => {
  try {
    const chapters = await Chapter.findAll();
    res.json(chapters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des chapitres.' });
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll();
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des quizzes.' });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des questions.' });
  }
};

exports.deleteChapter = async (req, res) => {
  const id = req.params.id;
  try {
    await Chapter.destroy({ where: { id } });
    res.json({ message: 'Le chapitre a été supprimé avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du chapitre.' });
  }
};

exports.deleteQuiz = async (req, res) => {
  const id = req.params.id;
  try {
    await Quiz.destroy({ where: { id } });
    res.json({ message: 'Le quiz a été supprimé avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du quiz.' });
  }
};

exports.deleteQuestion = async (req, res) => {
  const id = req.params.id;
  try {
    await Question.destroy({ where: { id } });
    res.json({ message: 'La question a été supprimée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de la question.' });
  }
};
exports.updateChapter = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const chapter = await Chapter.findByPk(id);

    if (!chapter) {
      return res.status(404).json({ message: 'Chapitre non trouvé' });
    }

    chapter.name = name;
    await chapter.save();

    return res.status(200).json({ message: 'Chapitre mis à jour avec succès', chapter });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du chapitre :', error);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour du chapitre' });
  }
};
exports.updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const quiz = await Quiz.findByPk(id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz non trouvé' });
    }

    quiz.name = name;
    await quiz.save();

    return res.status(200).json({ message: 'Quiz mis à jour avec succès', quiz });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du quiz :', error);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour du quiz' });
  }
};
exports. updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { text, option1, option2, option3, option4, correctAnswer } = req.body;

  try {
    const question = await Question.findByPk(id);

    if (!question) {
      return res.status(404).json({ message: 'Question non trouvée' });
    }

    question.text = text;
    question.option1 = option1;
    question.option2 = option2;
    question.option3 = option3;
    question.option4 = option4;
    question.correctAnswer = correctAnswer;
    await question.save();

    return res.status(200).json({ message: 'Question mise à jour avec succès', question });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la question :', error);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour de la question' });
  }
};

exports.addChapter = async (req, res) => {
  const { name } = req.body;

  try {
    const chapter = await Chapter.create({ name });
    res.json({ message: 'Chapter added successfully', chapter });
  } catch (error) {
    console.error('Error adding chapter:', error);
    res.status(500).json({ message: 'Error adding chapter' });
  }
};

exports.addQuiz = async (req, res) => {
  const { name, chapterId } = req.body;

  try {
    const quiz = await Quiz.create({ name, ChapterId: chapterId });
    res.json({ message: 'Quiz added successfully', quiz });
  } catch (error) {
    console.error('Error adding quiz:', error);
    res.status(500).json({ message: 'Error adding quiz' });
  }
};

exports.addQuestion = async (req, res) => {
  const { text, option1, option2, option3, correctAnswer, quizId } = req.body;

  try {
    const question = await Question.create({ text, option1, option2, option3, option4, correctAnswer, QuizId: quizId });
    res.json({ message: 'Question added successfully', question });
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ message: 'Error adding question' });
  }
};










const User = require('../Models/User');

// Fonction pour récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
  }
};

// Fonction pour supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.destroy({ where: { id } });
    res.json({ message: 'L\'utilisateur a été supprimé avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'utilisateur.' });
  }
};

// Fonction pour mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, role, parent_id } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    user.email = email;
    user.password = password;
    user.role = role;
    user.parent_id = parent_id;
    await user.save();

    return res.status(200).json({ message: 'Utilisateur mis à jour avec succès', user });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
};

// Fonction pour ajouter un utilisateur
exports.addUser = async (req, res) => {
  const { email, password, role, parent_id } = req.body;

  try {
    const user = await User.create({ email, password, role, parent_id });
    res.json({ message: 'Utilisateur ajouté avec succès', user });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur' });
  }
};
