import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../assets/History.css';

// Fonction pour formater la date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString(); // Formater la date en fonction des paramètres régionaux de l'utilisateur
};

const HistoriquePage = () => {
  const [quizData, setQuizData] = useState({});
  const location = useLocation();
  const userIdFromURL = new URLSearchParams(location.search).get('userId');

  useEffect(() => {
    if (!userIdFromURL) {
      console.error('userIdFromURL is undefined');
      return;
    }

    axios
      .get(`http://localhost:3005/historique-enfants/${userIdFromURL}`)
      .then((response) => {
        console.log('Historique des enfants retourné par le backend :', response.data);
        // Regrouper les données par quiz
        const groupedData = {};
        response.data.forEach(entry => {
          if (!groupedData.hasOwnProperty(entry.quizId)) {
            groupedData[entry.quizId] = [];
          }
          groupedData[entry.quizId].push({ date: formatDate(entry.date), score: entry.score });
        });
        setQuizData(groupedData);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération de l\'historique des enfants:', error);
      });
  }, [userIdFromURL]);

  useEffect(() => {
    const urlsToClearToken = ['/history'];

    if (!urlsToClearToken.some(url => location.pathname.startsWith(url))) {
      localStorage.removeItem('token');
    }
  }, [location]);

  const renderGraphs = () => {
    return Object.entries(quizData).map(([quizId, data]) => {
      console.log(`Données pour le quiz ${quizId}:`, data);
      const chartData = {
        labels: data.map(entry => entry.date),
        datasets: [
          {
            label: 'Score',
            data: data.map(entry => entry.score),
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
          },
        ],
      };

      return (
        <div key={quizId} className="quiz-container">
          <h4 className="quiz-header">Quiz {quizId}</h4>
          <div className="chart-container">
            <Line
              data={chartData}
              options={{
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Date'
                    }
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Score'
                    },
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="historique-page">
      {renderGraphs()}
    </div>
  );
};

export default HistoriquePage;
