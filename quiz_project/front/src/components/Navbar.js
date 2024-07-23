import React, { useState } from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import '../assets/Navbar.css'

const Navbar = () => {
  const [clickedButton, setClickedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setClickedButton(buttonName);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <button
          className={`navbar-button ${clickedButton === 'support' ? 'hidden_button' : ''}`}
          style={{ marginRight: '10px' }}
          onClick={() => handleButtonClick('support')}
        >
          <Link to="/support" className="nav-link">Support</Link>
        </button>
        <button
          className={`navbar-button ${clickedButton === 'home' ? 'hidden' : ''}`}
          style={{ marginRight: '10px' }}
          onClick={() => handleButtonClick('home')}
        >
          <Link to="/home" className="nav-link">Accueil</Link>
        </button>
      </div>
      <div className="navbar-right">
        <button
          className={`navbar-button navbar-button-sign ${clickedButton === 'parent' ? 'hidden_button' : ''}`}
          style={{ marginRight: '10px' }}
          onClick={() => handleButtonClick('parent')}
        >
          <Link to="/signupparent" className="nav-link">Parent</Link>
        </button>
        <button
          className={`navbar-button navbar-button-sign ${clickedButton === 'signUp' ? 'hidden_button' : ''}`}
          style={{ marginRight: '10px' }}
          onClick={() => handleButtonClick('signUp')}
        >
          <Link to="/signupkid" className="nav-link">Inscription</Link>
        </button>
        <button
          className={`navbar-button navbar-button-login ${clickedButton === 'login' ? 'hidden_button' : ''}`}
          style={{ marginRight: '10px' }}
          onClick={() => handleButtonClick('login')}
        >
          <Link to="/login" className="nav-link">Connexion</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
