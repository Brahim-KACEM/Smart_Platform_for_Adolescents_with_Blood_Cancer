import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useQuizContext } from './QuizContext';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../assets/History.css';

const formatQuizResults = (results) => {
  try {
    const parsedResults = JSON.parse(results);
    return Object.keys(parsedResults).map((quizNumber) => {
      const quizData = parsedResults[quizNumber];
      return {
        quizNumber: parseInt(quizNumber),
        quizData: quizData.map(val => ({ correct: val })),
      };
    });
  } catch (error) {
    console.error('Erreur lors de la conversion des résultats du quiz:', error);
    return [];
  }
};

const HistoriquePage = () => {
  const [historiqueEnfants, setHistoriqueEnfants] = useState([]);
 

  useEffect(() => {
    axios
      .get(`http://localhost:3005/historiqueadmin/`)
      .then((response) => {
        setHistoriqueEnfants(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération de l\'historique des enfants:', error);
      });
  }, []);

  return (
    <div className="historique-page">
   
    {historiqueEnfants.map((enfant) => (
      <div className="enfant-container" key={enfant.enfantId}>
        <h3>L'email de l'enfant: {enfant.enfantId}</h3>
        <div>
          {(() => {
            try {
              const parsedHistorique = JSON.parse(enfant.historique);
              const formattedResults = formatQuizResults(parsedHistorique);

              return (
                <>
                  {formattedResults.map(result => (
                    <div className="quiz-container" key={result.quizNumber}>
                      <h4 className="quiz-header">Quiz {result.quizNumber}</h4>
                      <div className="chart-container">
                        <Bar
                          data={{
                            labels: result.quizData.map((_, index) => `Répétition ${index + 1}`),
                            datasets: [
                              {
                                label: 'Nombre de bonnes réponses',
                                data: result.quizData.map(item => item.correct),
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                              },
                            ],
                          }}
                          options={{
                            scales: {
                              y: {
                                beginAtZero: true,
                                max: Math.max(...result.quizData.map(item => item.correct)) + 1,
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </>
              );
            } catch (error) {
              console.error('Erreur lors de la conversion des résultats du quiz:', error);
              return <p>Pas de résultats</p>;
            }
          })()}
        </div>
      </div>
    ))}
  </div>
);
};


export default HistoriquePage;
