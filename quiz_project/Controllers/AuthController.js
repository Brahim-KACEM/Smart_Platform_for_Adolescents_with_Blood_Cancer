

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const Chapter = require('../Models/Chapter');
const Quiz = require('../Models/Quiz');
const Question = require('../Models/Question');
const Historique = require('../Models/Historique');
const HistoriqueEtatPsychique = require('../Models/HistoriqueEtatPsychique');
const QuizHistorique = require('../Models/QuizHistorique');
const Suicide_case = require('../Models/Suicide_case');
exports.signupParent = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'This email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword, role: 'parent' });
    res.status(201).json({ message: 'Parent registered successfully.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during registration.' });
  }
};

exports.signupKid = async (req, res) => {
  const { childName, email, password, parentEmail } = req.body;

  try {
    const parent = await User.findOne({ where: { email: parentEmail, role: 'parent' } });

    if (!parent) {
      return res.status(400).json({ message: 'Parent with this email does not exist or is not registered as a parent.' });
    }

    const existingKid = await User.findOne({ where: { email } });

    if (existingKid) {
      return res.status(400).json({ message: 'This email is already registered as a kid.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newKid = await User.create({ username: childName, email, password: hashedPassword, role: 'kid', parent_id: parent.id });
    res.status(201).json({ message: 'Kid registered successfully.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during registration.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Incorrect email address or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect email address or password.' });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      'secretKey'
    );

    if (user.role === 'admin') {
      res.json({ token, role: user.role, redirectUrl: '/admindashbord' });
    } else if (user.role === 'parent') {
      res.json({ token, role: user.role, redirectUrl: '/parentinterface' });
    } else if (user.role === 'kid') {
      res.json({ token, role: user.role, redirectUrl: '/enfantinterface' });
    } else {
      res.status(401).json({ message: 'Invalid role.' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during login.' });
  }
};


const createAdminUser = async () => {
  try {
 
    const existingAdmin = await User.findOne({ where: { email: 'admin@admin.com' } });
    if (existingAdmin) {
      console.log('L\'administrateur existe déjà dans la base de données.');
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('admin', saltRounds);

    await User.create({
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('L\'administrateur a été ajouté à la base de données.');
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la création de l\'administrateur :', error);
  }
};

createAdminUser();
exports.getAllChapter = async (req, res) => {
  try {
    const chapters = await Chapter.findAll();
    res.json(chapters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des chapitres.' });
  }
};
exports.getQuizzesByChapterId = async (req, res) => {
  const { chapterId } = req.params;
  try {
    const quizzes = await Quiz.findAll({ where: { chapterId } });
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des quizzes.' });
  }
};
exports.getQuestionsByQuizId = async (req, res) => {
  const { quizId } = req.params;
  try {
    const questions = await Question.findAll({ where: { quizId } });
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des questions.' });
  }
};

exports.getChapterIdForQuiz = async (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = await Quiz.findOne({ where: { id: quizId } });
    if (quiz) {
      const chapterId = quiz.ChapterId;
      res.json({ chapterId });
    } else {
      res.status(404).json({ message: `Quiz with ID ${quizId} not found.` });
    }
  } catch (error) {
    console.error(`Error fetching chapterId for Quiz ID ${quizId}`, error);
    res.status(500).json({ message: 'An error occurred while fetching chapterId.' });
  }
};
exports.submitReclamation = async (req, res) => {
  const { name, email, message } = req.body;

  try {
   
    const mailOptions = {
      from: `${email}`,
      to: 'kacembrahim499@gmail.com', 
      subject: 'Nouvelle réclamation',
      text: `Nom : ${name}\nE-mail : ${email}\nMessage : ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Réclamation envoyée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'envoi de la réclamation.' });
  }
};



exports.submitQuizHistory = async (req, res) => {
  const { userId, quizHistory } = req.body;

  try {
 

    const historique = await Historique.findOne({ where: { userId } });

    if (!historique) {
      await Historique.create({
        userId,
        quizHistory: JSON.stringify(quizHistory), // Convertir l'objet quizHistory en JSON avant de l'enregistrer
      });
      res.status(201).json({ message: 'Historique des résultats de quiz enregistré avec succès.' });
    } else {
      historique.quizHistory = JSON.stringify(quizHistory); // Mettre à jour l'objet quizHistory avec les nouvelles données
      await historique.save();
      res.status(200).json({ message: 'Historique des résultats de quiz mis à jour avec succès.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'enregistrement de l\'historique des résultats de quiz.' });
  }
};
  
exports.getHistoriqueEnfants = async (req, res) => {
  const { parentId } = req.params;
  try {
    // Rechercher l'utilisateur enfant avec le parentId
    const enfant = await User.findOne({ where: { parent_id: parentId } });
    
    if (!enfant) {
      return res.status(404).json({ message: 'Enfant non trouvé.' });
    }

    // Rechercher l'historique des quiz de l'enfant avec son userId
    const historiques = await QuizHistorique.findAll({
      where: { userId: enfant.id },
      attributes: ['date', 'score', 'quizId']
    });
    
    res.json(historiques);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique des enfants:', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'historique des enfants.' });
  }
};




exports.getHistoriqueEnfantsByAdmin = async (req, res) => {
  try {
    const enfants = await User.findAll({ where: { role: 'kid' } }); 

    const historiqueEnfants = await Promise.all(enfants.map(async (enfant) => {
      const historique = await Historique.findOne({ where: { userId: enfant.id } });
      return {
        enfantId: enfant.email,
        historique: historique ? historique.quizHistory : [],
      };
    }));

    res.json(historiqueEnfants);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique des enfants:', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'historique des enfants.' });
  }
};



const SECRET_KEY = 'edu_robot'; 

exports. checkRobotPermission = async(req, res) => {
  const { secretKey } = req.body;

  if (secretKey === SECRET_KEY) {
    res.json({ robotPermission: true });
  } else {
    res.json({ robotPermission: false });
  }
};



exports.submitQuestionnaire = async (req, res) => {
  const { email, anxietyScore, depressionScore } = req.body;

  try {
    // Recherchez l'utilisateur correspondant à l'e-mail soumis par l'enfant
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Insérez les scores dans la table HistoriqueEtatPsychique
    await HistoriqueEtatPsychique.create({
      parentId: user.parent_id, // Utilisez l'ID du parent associé à cet utilisateur
      anxiete: anxietyScore,
      depression: depressionScore,
      date: new Date() // Utilisez la date actuelle comme date d'enregistrement
    });

    res.status(201).json({ message: 'Scores insérés avec succès dans HistoriqueEtatPsychique.' });
  } catch (error) {
    console.error('Erreur lors de l\'insertion des scores dans HistoriqueEtatPsychique :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'insertion des scores.' });
  }
};


exports.getHistoriqueEnfantById = async (req, res) => {
  const { parentId } = req.params;

  try {
    // Récupérer l'historique de l'état psychique de l'enfant pour le parent spécifique
    const historique = await HistoriqueEtatPsychique.findAll({
      where: { parentId },
      attributes: ['date', 'anxiete', 'depression', ] // Sélectionner les colonnes que vous souhaitez renvoyer
    });

    res.json(historique);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique de l\'état psychique de l\'enfant:', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'historique de l\'état psychique de l\'enfant.' });
  }
};




exports.saveQuizResult = async (req, res) => {
  const { userId, quizId, score } = req.body;

  try {

    await QuizHistorique.create({ userId, quizId, score });
    res.status(201).json({ message: 'Résultat du quiz enregistré avec succès.' });

  } catch (error) {
    console.error('Erreur lors de la sauvegarde du résultat du quiz :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la sauvegarde du résultat du quiz.' });
  }
};





exports.checkSuicideCases = async (req, res) => {
  const { userId } = req.params;

  try {
    // Rechercher l'utilisateur enfant avec le parent_id correspondant
    const child = await User.findOne({ where: { parent_id: userId, role: 'kid' } });

    if (!child) {
      console.log("L'enfant n'a pas été trouvé.");
      return res.status(404).json({ message: 'L\'enfant n\'a pas été trouvé.' });
    }

    // Rechercher des cas de suicide pour l'enfant spécifié
    const suicideCases = await Suicide_case.findAll({ where: { userId: child.id } });

    if (suicideCases.length > 0) {
      console.log("Cas de suicide trouvés pour l'enfant :", suicideCases);

      // Supprimer les cas de suicide de la table
      await Suicide_case.destroy({ where: { userId: child.id } });

      res.json({ exists: true, message: 'Votre enfant présente des signes de suicide. Veuillez consulter immédiatement.' });
    } else {
      console.log("Aucun cas de suicide trouvé pour l'enfant.");
      res.json({ exists: false, message: 'Aucun cas de suicide n\'a été trouvé pour votre enfant.' });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification des cas de suicide:', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la vérification des cas de suicide.' });
  }
};

