import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import '../assets/Histoetatpsychique.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const HistoriqueEnfant = () => {
  const [historique, setHistorique] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const userIdFromURL = new URLSearchParams(location.search).get('userId');

  useEffect(() => {
    const fetchHistorique = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/historique-enfant/${userIdFromURL}`);
        setHistorique(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique de l\'état psychique de l\'enfant:', error);
      }
    };

    fetchHistorique();

    // Vérification de la présence de cas de suicide pour cet enfant
    const checkSuicideCases = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/check-suicide/${userIdFromURL}`);
        console.log('Réponse du serveur :', response.data); // Afficher la réponse dans la console du navigateur

        if (response.data.exists) {
          alert("Votre enfant présente des signes de suicide. Veuillez consulter immédiatement.");
        }
      } catch (error) {
        console.error('Erreur lors de la vérification des cas de suicide aa:', error);
      }
    };

    checkSuicideCases();

    return () => {
      setHistorique([]);
      setLoading(true);
    };
  }, [userIdFromURL]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  const dates = historique.map(item => formatDate(item.date));
  const anxietyScores = historique.map(item => item.anxiete);
  const depressionScores = historique.map(item => item.depression);

  const anxietyChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Score d\'anxiété',
        data: anxietyScores,
        fill: false,
        borderColor: 'rgba(255, 99, 132, 0.7)',
      },
    ],
  };

  const depressionChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Score de dépression',
        data: depressionScores,
        fill: false,
        borderColor: 'rgba(54, 162, 235, 0.7)',
      },
    ],
  };

  return (
    <div>
      <h2 className="historique-title">Historique de l'état psychique de l'enfant</h2>
      <table className="historique-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Anxiété</th>
            <th>Dépression</th>
          </tr>
        </thead>
        <tbody>
          {historique.map((item, index) => (
            <tr key={index} className={(item.anxiete > 8 || item.depression > 8) ? 'red-row' : ''}>
              <td>{formatDate(item.date)}</td>
              <td>{item.anxiete}</td>
              <td>{item.depression}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="chart-container">
        <h3>Graphique d'anxiété</h3>
        <Line data={anxietyChartData} />
      </div>

      <div className="chart-container">
        <h3>Graphique de dépression</h3>
        <Line data={depressionChartData} />
      </div>
    </div>
  );
};

export default HistoriqueEnfant;
