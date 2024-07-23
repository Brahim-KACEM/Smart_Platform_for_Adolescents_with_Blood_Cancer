import React, { useState } from 'react';
import '../assets/Signup.css';
import axios from 'axios';

export default function KidSignUpForm() {
  const [childName, setChildName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let formValid = true;
    let newErrors = {};

    if (!childName) {
      formValid = false;
      newErrors.childName = 'Veuillez saisir le nom de votre enfant';
    }

    if (!email) {
      formValid = false;
      newErrors.email = 'Veuillez saisir l\'adresse e-mail de votre enfant';
    }

    if (!password) {
      formValid = false;
      newErrors.password = 'Veuillez saisir un mot de passe pour votre enfant';
    }

    if (password !== confirmPassword) {
      formValid = false;
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (!parentEmail) {
      formValid = false;
      newErrors.parentEmail = 'Veuillez saisir votre adresse e-mail de parent';
    }

    if (!formValid) {
      setErrors(newErrors);
      return;
    }

    const formData = {
      childName: childName,
      email: email,
      password: password,
      parentEmail: parentEmail, // Ajoutez le champ parentEmail pour le formulaire de signup pour le kid
      role: 'kid', // Ajoutez le rôle "kid" au formulaire de signup pour le kid
    };

    axios.post('http://localhost:3005/signup/kid', formData)
      .then(response => {
        console.log(response.data);
        window.location.href = '/login'; // Redirigez vers la page de login après l'inscription réussie
      })
      .catch(error => {
        if (error.response) {
          const errorMessage = error.response.data.message;
          setErrors({ ...newErrors, apiError: errorMessage });
        } else {
          console.error(error);
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: '' });

    if (name === 'childName') {
      setChildName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else if (name === 'parentEmail') {
      setParentEmail(value);
    }
  };

  return (
    <div className="bg-img">
      <div className="content">
        <header>Formulaire d'inscription pour les enfants</header>
        {errors.apiError && <div className="error-message">{errors.apiError}</div>}
        <form action="post" onSubmit={handleSubmit}>
          <div className={`field ${errors.childName && 'error'}`}>
            <span className="fa fa-user"></span>
            <input
              type="text"
              required
              placeholder="Nom de l'enfant"
              name="childName"
              value={childName}
              onChange={handleChange}
            />
            {errors.childName && <div className="error-message">{errors.childName}</div>}
          </div>
          <div className={`field ${errors.email && 'error'}`}>
            <span className="fa fa-envelope"></span>
            <input
              type="text"
              required
              placeholder="E-mail"
              name="email"
              value={email}
              onChange={handleChange}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          <div className={`field space ${errors.password && 'error'}`}>
            <span className="fa fa-lock"></span>
            <input
              type="password"
              className="pass-key"
              required
              placeholder="Mot de passe"
              name="password"
              value={password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          <div className={`field space ${errors.confirmPassword && 'error'}`}>
            <span className="fa fa-lock"></span>
            <input
              type="password"
              className="pass-key"
              required
              placeholder="Confirmez le mot de passe"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>
          <div className={`field ${errors.parentEmail && 'error'}`}>
            <span className="fa fa-envelope"></span>
            <input
              type="text"
              required
              placeholder="E-mail du parent"
              name="parentEmail"
              value={parentEmail}
              onChange={handleChange}
            />
            {errors.parentEmail && <div className="error-message">{errors.parentEmail}</div>}
          </div>
          <div className="field">
            <input type="submit" value="S'INSCRIRE" />
          </div>
        </form>
       
        <div className="signup">
          Vous avez déjà un compte ?
          <a href="/login">Connectez-vous maintenant</a>
        </div>
      </div>
    </div>
  );
}
