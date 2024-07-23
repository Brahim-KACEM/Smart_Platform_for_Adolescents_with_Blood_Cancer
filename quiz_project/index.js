// index.js

const express = require('express');
const cors = require('cors');
const sequelize = require('./Sequelize');
const authRoutes = require('./Routes/AuthRoutes');
const adminRoutes = require('./Routes/Adminrouters');


const app = express();
const port = 3005;
app.use(cors());
// Middleware pour parser les données JSON
app.use(express.json());

// Connexion à la base de données
sequelize
  .sync()
  .then(() => {
    console.log('Connexion à la base de données réussie.');
  })
  .catch((error) => {
    console.error('Erreur lors de la connexion à la base de données:', error);
  });

// Routes d'authentification
app.use( authRoutes);

app.use(adminRoutes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
