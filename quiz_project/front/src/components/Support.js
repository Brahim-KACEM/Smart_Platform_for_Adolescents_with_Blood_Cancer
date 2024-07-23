import React from 'react';
import { Link } from 'react-router-dom'; 

import '../assets/Support.css'; 

function CourseSupport() {
  return (
    <div className="course-support">
      <div className="box">
        <Link to="/support1" className="box-link">
          <h2 className="box-title">Chapitre 1 : Compréhension du Cancer du Sang</h2>
          <p className="box-description">Définition du cancer du sang, facteurs de risque, processus de développement et types de cancer.</p>
        </Link>
      </div>
      <div className="box">
        <Link to="/support2" className="box-link">
          <h2 className="box-title">Chapitre 2 : Diagnostic et Stades du Cancer du Sang</h2>
          <p className="box-description">Symptômes, processus de diagnostic, stades du cancer du sang et leur importance.</p>
        </Link>
      </div>
      <div className="box">
        <Link to="/support3" className="box-link">
          <h2 className="box-title">Chapitre 3 : Traitements et Gestion du Cancer du Sang</h2>
          <p className="box-description">Options de traitement, effets secondaires, gestion de la vie quotidienne et soutien émotionnel.</p>
        </Link>
      </div>
    </div>
  );
}

export default CourseSupport;
