import React from 'react';
import footerImage from '../images/besoinaide.jpg';
import { Link } from 'react-router-dom';
import '../assets/Footerimage.css';

const Footerimage = () => {
  return (
    <div className="footer-image-container">
      <img src={footerImage} alt="Footer Image" className="footer-image" />
      <div className="footer-image-content">
    <p>Prêt à démarrer une aventure d'apprentissage ?</p>
    <Link to="/signupparent" className="create-account-button">
        Créer un compte
    </Link>
</div>

    </div>
  );
};

export default Footerimage;
