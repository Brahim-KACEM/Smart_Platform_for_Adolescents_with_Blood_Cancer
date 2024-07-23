import React, { useState } from 'react';
import '../assets/Slideshow.css';

const parentReviews = [
  "Je suis ravi d'avoir découvert cette application de quiz en ligne sur la robotique. Mon fils Lucas adore les robots, et cette plateforme lui permet d'apprendre en s'amusant. Les cours sont bien expliqués et adaptés à son âge, ce qui le rend encore plus enthousiaste à en apprendre davantage sur la robotique. En tant que parent, j'apprécie la fonction de contrôle qui me permet de suivre ses progrès et de voir les sujets sur lesquels il travaille. Bravo pour cette initiative éducative !",
  "Nos deux enfants sont fans de technologie et de robots, et cette application est devenue leur préférée ! L'interface est ludique et captivante, et ils aiment participer aux quiz pour tester leurs connaissances en robotique. Le support de cours est bien conçu, ce qui les aide à approfondir leurs compétences dans ce domaine. En tant que parents, nous sommes impressionnés par le contenu éducatif et la facilité de suivi de leurs progrès. Merci d'avoir créé un espace d'apprentissage interactif aussi enrichissant pour nos enfants !",
  "En tant que parent, je suis toujours à la recherche d'outils éducatifs qui allient plaisir et apprentissage pour ma fille. Votre application de quiz sur la robotique est exactement ce que je recherchais ! Maram est captivée par les différents sujets et les quiz interactifs. Elle aime tellement ça qu'elle ne réalise même pas à quel point elle apprend. Les explications sont faciles à comprendre pour un enfant de son âge, et le fait que je puisse suivre son activité me rassure en tant que parent. Je la recommande vivement à tous les parents qui souhaitent encourager leurs enfants à s'intéresser à la science et à la technologie.",
  "Cette application est un véritable trésor pour ma fille, qui rêve de devenir ingénieure en robotique un jour. Les quiz et les cours sont parfaitement adaptés à son niveau et l'encouragent à en apprendre davantage sur le sujet. C'est fantastique de voir à quel point elle est motivée pour répondre à chaque quiz et obtenir de meilleurs scores. Quant à moi, j'apprécie vraiment la fonction de contrôle parental, car elle me permet de laisser Khadija explorer ce monde fascinant en toute sécurité. Merci beaucoup pour cette initiative éducative !"
];

const parentImages = [
    require('../images/insta.png'),
    require('../images/insta.png'),
    require('../images/insta.png'),
    require('../images/insta.png')
  ];

export default function Slideshow() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  function previous() {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % parentReviews.length);
  }

  function next() {
    setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + parentReviews.length) % parentReviews.length);
  }

  return (
    <section className="slideshow slideshow-centered">
      <h2>Parents' Reviews</h2>
      <section className="slideshow">
        <div className="slide-holder">
          <section className="slide previous-slide">
            <div className="slide-text">
              <img src={parentImages[(currentReviewIndex - 1 + parentImages.length) % parentImages.length]} alt="Parent" />
              <p>  {parentReviews[(currentReviewIndex - 1 + parentReviews.length) % parentReviews.length]}</p> 
            </div>
          </section>
          <section className="slide current-slide">
            <div className="slide-text">
              <img src={parentImages[currentReviewIndex]} alt="Parent" />
             <p>{parentReviews[currentReviewIndex]}</p> 
            </div>
          </section>
          <section className="slide next-slide">
            <div className="slide-text">
              <img src={parentImages[(currentReviewIndex + 1) % parentImages.length]} alt="Parent" />
            <p>  {parentReviews[(currentReviewIndex + 1) % parentReviews.length]}</p>
            </div>
          </section>
        </div>

        <div className="slideshow-controller">
          <span onClick={previous}>Previous</span>
          <span onClick={next}>Next</span>
        </div>
      </section>
    </section>
  );
}

