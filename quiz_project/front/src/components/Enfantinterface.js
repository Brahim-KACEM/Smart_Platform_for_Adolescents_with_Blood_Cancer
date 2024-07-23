import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/Admindashbord.css';

const EnfantInterface = () => {
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get('userId');

  useEffect(() => {
    const urlsToClearToken = ['/enfantinterface'];

    if (!urlsToClearToken.some(url => location.pathname.startsWith(url))) {
      localStorage.removeItem('token');
    }
  }, [location]);

  // Afficher userId dans la console lors de chaque rendu du composant
  useEffect(() => {
    console.log("userId:", userId);
  }, [userId]);

  return (
    <div className="admin-dashboard">
     
      <div className="admin-block">
        <h2>Répondre au Quiz Educatif</h2>
        <p>Participer au quiz éducatif.</p>
        <Link to={`/quizchapter?userId=${userId}`} className="link-style admin-link">Voir l'historique de mon enfant</Link>
      </div>
      <div className="admin-block">
        <h2>Chatbot</h2>
        <p>Utiliser le chatbot pour des interactions.</p>
        <a href={`http://127.0.0.1:5000/?userId=${userId}`} className="link-style admin-link" target="_blank" rel="noopener noreferrer">Ouvrir le Chatbot</a>
      </div>
    </div>
  );
};

export default EnfantInterface;
