import React, { useState } from 'react';
import '../assets/Quizhadd.css';

const QuestionnairePage = () => {
  const [email, setEmail] = useState('');
  const [anxietyScore, setAnxietyScore] = useState(0);
  const [depressionScore, setDepressionScore] = useState(0);

    const questions = [
        {
          question: "Je me sens tendu(e) ou énervé(e) :",
          answers: ["Jamais", "La_plupart_du_temps", "Souvent", "De_temps_en_temps_souvent"],
          anxietyIndex: true
        },
        
        {
          question: "Je prends plaisir aux mêmes choses qu'autrefois :",
          answers: ["Oui_tout_autant", "Pas_autant", "Un_peu_seulement", "Presque_plus_du_tout"],
          anxietyIndex: false
        },
        {
          question: "J’ai une sensation de peur comme si quelque chose d’horrible allait m’arriver :",
          answers: ["Pas_du_tout", "Un_peu_mais_cela_ne_m’inquiète_pas", "Oui,_mais_ce_n’est_pas_trop_grave", "Oui_très_nettement"],
          anxietyIndex: true
        },
        {
          question: "Je ris facilement et vois le bon côté des choses :",
          answers: ["Autant_que_par_le_passé", "Plus_autant_qu’avant", "Vraiment_moins_qu’avant", "Plus_du_tout"],
          anxietyIndex: false
        },
        {
          question: "Je me fais du souci :",
          answers: ["Très_occasionnellement", "Occasionnellement", "Assez_souvent", "Très_souvent"],
          anxietyIndex: true
        },
        {
          question: "Je suis de bonne humeur :",
          answers: ["La_plupart_du_temps", "Assez_souvent", "Rarement", "Jamais"],
          anxietyIndex: false
        },
        {
          question: "Je peux rester tranquillement assis(e) à ne rien faire et me sentir décontracté :",
          answers: ["Oui_quoi_qu’il_arrive", "Oui,_en_général", "Rarement", "Jamais"],
          anxietyIndex: true
        },
        {
          question: "J’ai l’impression de fonctionner au ralenti :",
          answers: ["Jamais", "Parfois", "Très_souvent", "Presque_toujours"],
          anxietyIndex: false

        },
        {
          question: "J’éprouve des sensations de peur et j’ai l’estomac noué :",
          answers: ["Jamais", "Parfois", "Assez_souvent", "Très_souvent"],
          anxietyIndex: true
        },
        {
          question: "Je ne m’intéresse plus à mon apparence :",
          answers: ["J’y_prête_autant_d’attention_que_par_le_passé", "Il_se_peut_que_je_n’y_fasse_plus_autant_attention", "Je_n’y_accorde_pas_autant_d’attention_que_je_le_devrais", "Plus_du_tout"],
          anxietyIndex: false
       },
        {
          question: "J’ai la bougeotte et n’arrive pas à tenir en place :",
          answers: ["Pas_du_tout", "Pas_tellement", "Un_peu", "Oui_c’est_tout_à_fait_le_cas"],
          anxietyIndex: true
        },
        {
          question: "Je me réjouis d’avance à l’idée de faire certaines choses :",
          answers: ["Autant_qu’avant", "Un_peu_moins_qu’avant", "Bien_moins_qu’avant", "Presque_jamais"],
          anxietyIndex: false
        },
        {
          question: "J’éprouve des sensations soudaines de panique :",
          answers: ["Jamais", "Pas_très_souvent", "Assez_souvent", "Vraiment_très_souvent"],
          anxietyIndex: true
        },
        {
          question: "Je peux prendre plaisir à un bon livre ou à une bonne émission de radio ou de télévision :",
          answers: ["Souvent", "Parfois", "Rarement", "Très_rarement"],
          anxietyIndex: false 
        },
      ];
      

  const [responses, setResponses] = useState(Array(questions.length).fill(null));

  const handleResponseChange = (index, response) => {
    const newResponses = [...responses];
    newResponses[index] = response;
    setResponses(newResponses);
  };

  const renderQuestions = () => {
    return questions.map((question, index) => (
      <div key={index} className="question">
        <p>{question.question}</p>
        <div className="answers">
          {question.answers.map((answer, answerIndex) => (
            <label key={answerIndex} className="answer-option">
              <input
                type="radio"
                value={answer}
                checked={responses[index] === answer}
                onChange={() => handleResponseChange(index, answer)}
                className="radio-input"
                required 
              />
              {answer}
            </label>
          ))}
        </div>
      </div>
    ));
  };
  
  


// Calcul du score d'anxiété
const calculateAnxietyScore = () => {
    let anxietyScore = 0;
    questions.forEach((question, index) => {
      if (question.anxietyIndex) {
        const selectedAnswerIndex = question.answers.indexOf(responses[index]);
        anxietyScore += selectedAnswerIndex ; 
      }
    });
    return anxietyScore;
  };

  // Calcul du score de dépression
  const calculateDepressionScore = () => {
    let depressionScore = 0;
    questions.forEach((question, index) => {
      if (!question.anxietyIndex) { 
        const selectedAnswerIndex = question.answers.indexOf(responses[index]);
        depressionScore += selectedAnswerIndex ; 
      }
    });
    return depressionScore;
  };

  const handleSubmit = async () => {
    if (!email) {
      alert('Veuillez saisir votre adresse e-mail.');
      return; // Arrêter la soumission du formulaire si l'e-mail est vide
    }
    if (responses.includes(null)) {
      alert('Veuillez répondre à toutes les questions.');
      return;
    }
    // Calculer les scores d'anxiété et de dépression
    const calculatedAnxietyScore = calculateAnxietyScore();
    const calculatedDepressionScore = calculateDepressionScore();
  
    // Mettre à jour les états des scores
    setAnxietyScore(calculatedAnxietyScore);
    setDepressionScore(calculatedDepressionScore);
  
    try {
      // Envoyer les scores au backend
      const response = await fetch('http://localhost:3005/questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          anxietyScore: calculatedAnxietyScore,
          depressionScore: calculatedDepressionScore
        })
      });
  
      if (response.ok) {
        console.log('Scores envoyés avec succès.');
        // Rediriger ou afficher un message de succès si nécessaire
      } else {
        console.error('Échec de l\'envoi des scores.');
        // Gérer les erreurs si nécessaire
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de l\'envoi des scores :', error);
      // Gérer les erreurs si nécessaire
    }
  };
  


  return (
    <div>
    <div className="container">
      <div className="left-part">
        {renderQuestions().slice(0, 7)} 
      </div>
      <div className="right-part">
        {renderQuestions().slice(7, questions.length)} 
      </div>
      
     
    </div>
     <div className="submit-container">
      <div>
     <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Entrez votre email..."
                    className="email-input"
                    required 
                />
                </div>
      
        <button className="submit-button" onClick={handleSubmit} disabled={anxietyScore !== 0 && depressionScore !== 0}>Soumettre</button>
   </div>
   </div>
  );
};


export default QuestionnairePage;
