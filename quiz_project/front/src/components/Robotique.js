import React from 'react';
import '../assets/Robotique.css';
const CASES = [
  {
    title: 'Quiz Educatifs',
    blurb: 'Apprenez sur votre maladie à travers des quiz éducatifs interactifs.'
  },
  {
    title: 'Chatbot de Soutien',
    blurb: 'Interagissez avec notre chatbot qui vous soutiendra et détectera vos émotions.'
  },
  {
    title: 'Consultation Historique',
    blurb: 'Consultez l\'historique de votre enfant pour suivre son progrès et son bien-être.'
  },
  {
    title: 'Téléchargement de NFS',
    blurb: 'Téléchargez le NFS de votre enfant pour surveiller son état de santé.'
  }
];

const ReactComponent = () => {
  return (
    <div className="grid gap-6 grid-cols-2">
      {CASES.map((item, index) => (
        <div key={index} className="grid__item item w-56 text-white relative">
          <div className="item__contentt h-full w-full p-4 relative border-2 flex flex-col">
            <div className="font-bold mb-2">{item.title}</div>
            <p className="flex-grow mb-2">{item.blurb}</p>
            <a href="#" className="text-blue-500">Learn More</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReactComponent;
