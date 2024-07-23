import React, { useState, useEffect } from 'react';
import '../assets/Statiques.css';

const StatistiquesRobotique = () => {
  const [stats, setStats] = useState({
    robotsEnService: 0,
    marcheRobotsMedicaux: 0,
    tempsEconomiseParRobots: 0,
    robotsDeServiceEn2025: 0,
  });

  const seuils = {
    robotsEnService: 2700000,
    marcheRobotsMedicaux: 36000000000,
    tempsEconomiseParRobots: 3,
    robotsDeServiceEn2025: 7500000,
  };

  useEffect(() => {
    const intervalle = setInterval(() => {
      setStats(statsPrecedents => ({
        robotsEnService: statsPrecedents.robotsEnService < seuils.robotsEnService ? statsPrecedents.robotsEnService + 5000 : statsPrecedents.robotsEnService,
        marcheRobotsMedicaux: statsPrecedents.marcheRobotsMedicaux < seuils.marcheRobotsMedicaux ? statsPrecedents.marcheRobotsMedicaux + 50000000 : statsPrecedents.marcheRobotsMedicaux,
        tempsEconomiseParRobots: statsPrecedents.tempsEconomiseParRobots < seuils.tempsEconomiseParRobots ? statsPrecedents.tempsEconomiseParRobots + 0.5 : statsPrecedents.tempsEconomiseParRobots,
        robotsDeServiceEn2025: statsPrecedents.robotsDeServiceEn2025 < seuils.robotsDeServiceEn2025 ? statsPrecedents.robotsDeServiceEn2025 + 5000 : statsPrecedents.robotsDeServiceEn2025,
      }));
    }, 50);

    // Nettoyage de l'intervalle lors du démontage du composant
    return () => clearInterval(intervalle);
  }, []);

  return (
    <div className="stats-container">
      <div className="stat-item">
        <h2>{stats.robotsEnService.toLocaleString()}</h2>
        <p>Robots Industriels en Service</p>
      </div>
      <div className="stat-item">
        <h2>${stats.marcheRobotsMedicaux.toLocaleString()}</h2>
        <p>Taille du Marché des Robots Médicaux</p>
      </div>
      <div className="stat-item">
        <h2>{stats.tempsEconomiseParRobots} heures</h2>
        <p>Temps Économisé Quotidiennement par les Robots Domestiques</p>
      </div>
      <div className="stat-item">
        <h2>{stats.robotsDeServiceEn2025.toLocaleString()}</h2>
        <p>Robots de Service prévus en 2025</p>
      </div>
    </div>
  );
};

export default StatistiquesRobotique;
