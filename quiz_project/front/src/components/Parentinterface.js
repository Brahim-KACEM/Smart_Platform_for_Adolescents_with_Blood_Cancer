import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/Admindashbord.css';

const ParentInterface = () => {
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get('userId');

  useEffect(() => {
    const urlsToClearToken = ['/parentinterface'];

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
        <h2>Historique</h2>
        <p>Voir l'historique de participation.</p>
        <Link to={`/history?userId=${userId}`} className="link-style admin-link">Voir l'historique </Link>
      </div>
      <div className="admin-block">
        <h2>État Psychique de l'Enfant</h2>
        <p>Voir l'état psychique de l'enfant.</p>
        <Link to={`/histoetatpsychique?userId=${userId}` }className="admin-link">Aller à l'État Psychique</Link>
      </div>
      <div className="admin-block">
        <h2>Téléverser un PDF</h2>
        <p>Téléverser un fichier PDF.</p>
        <a href={`http://127.0.0.1:5001/?userId=${userId}`} className="admin-link">Téléverser PDF</a>
      </div>
    </div>
  );
};

export default ParentInterface;
