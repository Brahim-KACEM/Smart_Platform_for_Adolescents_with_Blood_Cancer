import React, { useState } from 'react';
import axios from 'axios';
import '../assets/Footer.css';
import facebookIcon from '../images/facebook.png';
import twitterIcon from '../images/twitter.png';
import instagramIcon from '../images/insta.png';

const PiedDePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setSubmitting(true);

    try {
      await axios.post('/reclamation', { name, email, message });

      setName('');
      setEmail('');
      setMessage('');

      alert('Réclamation envoyée avec succès.');
    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue lors de l\'envoi de la réclamation.');
    }

    setSubmitting(false);
  };

  return (
    <footer className="footer-container">
      <div className="footer-info">
        <h2 className="info-title">Contactez-nous sur les Réseaux Sociaux</h2>
        <div className="social-media-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={facebookIcon} alt="Icône Facebook" className="social-media-icon" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={twitterIcon} alt="Icône Twitter" className="social-media-icon" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Icône Instagram" className="social-media-icon" />
          </a>
        </div>
        <div className="other-info">
          <p className="info-text">Adresse : 123 rue Principale, Ville, Pays</p>
          <p className="info-text">Téléphone : +216 99 999 999</p>
          <p className="info-text">E-mail : blablabla@gmail.com</p>
        </div>
      </div>
      <div className="footer-form">
  <h2 className="form-title">Contactez-nous</h2>
  <form onSubmit={handleSubmit} method="post">
    <div className="brahim">
      <div className="left-section">
        <div className="form-group">
          <label htmlFor="name">Nom :</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail :</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <div className="right-section">
        <div className="form-group">
          <label htmlFor="message" className="label-message">Message :</label>
          <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        </div>
        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </div>
    </div>
  </form>
</div>


    </footer>
  );
};

export default PiedDePage;
