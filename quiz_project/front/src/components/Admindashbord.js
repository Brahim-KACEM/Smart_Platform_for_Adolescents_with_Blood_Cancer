import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/Admindashbord.css';

const AdminDashboard = () => {
  const location = useLocation();

  useEffect(() => {
    const urlsToClearToken = ['/admindashbord'];

    if (!urlsToClearToken.some(url => location.pathname.startsWith(url))) {
      localStorage.removeItem('token');
    }
  }, [location]);

  return (
    <div className="admin-dashboard">
      <div className="admin-block">
        <h2>Historique</h2>
        <p>Voir l'historique de participation.</p>
        <Link to="/adminhistorique" className="admin-link">
          Accéder à l'historique
        </Link>
      </div>
      <div className="admin-block">
        <h2>Base de données de Quiz</h2>
        <p>Gérer les chapitres, les quiz et les questions.</p>
        <Link to="/admin" className="admin-link">
          Accéder à la base de données
        </Link>
      </div>
      <div className="admin-block">
        <h2>Gestion des Utilisateurs</h2>
        <p>Gérer les utilisateurs, les rôles et les permissions.</p>
        <Link to="/adminusers" className="admin-link">
          Accéder à la gestion des utilisateurs
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
