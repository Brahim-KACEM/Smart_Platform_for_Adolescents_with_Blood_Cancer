import React, { useEffect, useState } from 'react';
import '../assets/Header.css'; 
import header from '../images/header.png';

const ScrollingHeader = () => {
  const [curveValue, setCurveValue] = useState(350);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const defaultCurveValue = 350;
      const curveRate = 3;

      if (scrollPos >= 0 && scrollPos < defaultCurveValue) {
        const newCurveValue = defaultCurveValue - parseFloat(scrollPos / curveRate);
        setCurveValue(newCurveValue);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="scrolling-header">
      <div className="svg-container">
        <svg viewBox="0 0 800 400" className="svg">
          <path id="curve" fill="#50c6d8" d={`M 800 300 Q 400 ${curveValue} 0 300 L 0 0 L 800 0 L 800 300 Z`} />
        </svg>
      </div>

      <header className="tete">
        <div className="header-content">
          <div className="text-content">
            <h1>Bienvenue sur notre plateforme dédiée au soutien des adolescents atteints de cancers du sang</h1>
            <p>Explorez nos ressources et soutenez la santé mentale des adolescents en lutte contre le cancer.</p>
          </div>
          <div className="image-content">
            <img src={header} alt="Image de soutien aux adolescents atteints de cancers du sang" />
          </div>
        </div>
      </header>
      <div className="button-container">
  <div className="our-work-text">Quels sont les services que nous mettons à disposition ? </div>
</div>

    </div>
  );
}

export default ScrollingHeader;
