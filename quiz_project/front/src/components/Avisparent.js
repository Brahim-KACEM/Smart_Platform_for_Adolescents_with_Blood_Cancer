import React from 'react';
import checkIcon from '../images/check-icon.png';
import parentImage from '../images/parent-image.png';
import '../assets/Avisparent.css'

const AvisParent = () => {
  return (
    <div>
    <div className="inter-container">
    <p className="inter-text">Our mission is to help every child in the world love robotics!</p>
  </div>
    <div className="avis-parent-container">
      
      <div className="avis-parent-content">
        
        <div className="avis-parent-left">
        <div className="avis-parent-item">
  <p className="parent-text">Parents</p>
</div>
<div className="avis-parent-item">
  <img src={checkIcon} alt="Check Icon" className="check-icon" />
  <p className="parent-description">Invest in your child's learning journey with engaging games that make learning fun!</p>
</div>
<div className="avis-parent-item">
  <img src={checkIcon} alt="Check Icon" className="check-icon" />
  <p className="parent-description">Help your child improve their skills and confidence in a fun, safe and secure environment</p>
</div>
<div className="avis-parent-item">
  <img src={checkIcon} alt="Check Icon" className="check-icon" />
  <p className="parent-description">Motivate learning, track their progress and inspire them to practice new skills</p>
</div>
        </div>
        <div className="avis-parent-right">
          <img src={parentImage} alt="Parent Image" className="parent-image" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default AvisParent;
