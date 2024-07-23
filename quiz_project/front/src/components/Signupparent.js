import React, { useState } from 'react';
import '../assets/Signup.css';
import axios from 'axios';

export default function ParentSignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let formValid = true;
    let newErrors = {};

    if (!name) {
      formValid = false;
      newErrors.name = 'Veuillez saisir votre nom';
    }

    if (!email) {
      formValid = false;
      newErrors.email = 'Veuillez saisir votre adresse e-mail';
    }

    if (!password) {
      formValid = false;
      newErrors.password = 'Veuillez saisir votre mot de passe';
    }

    if (password !== confirmPassword) {
      formValid = false;
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (!formValid) {
      setErrors(newErrors);
      return;
    }

    const formData = {
      name: name,
      email: email,
      password: password,
      role: 'parent', // Ajoutez le rôle "parent" au formulaire de signup pour le parent
    };

    axios.post('http://localhost:3005/signup/parent', formData)
      .then(response => {
        console.log(response.data);
        window.location.href = '/signupkid'; // Redirigez vers la page de login après l'inscription réussie
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

    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  return (
    <div className="bg-img">
      <div className="content">
        <header>Formulaire d'inscription pour les parents</header>
        {errors.apiError && <div className="error-message">{errors.apiError}</div>}
        <form action="post" onSubmit={handleSubmit}>
          <div className={`field ${errors.name && 'error'}`}>
            <span className="fa fa-user"></span>
            <input
              type="text"
              required
              placeholder="Nom"
              name="name"
              value={name}
              onChange={handleChange}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
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
          <div className="field">
            <input type="submit" value="S'INSCRIRE" />
          </div>
        </form>
        
        <div className="signup">
          Vous avez déjà un compte ?
          <a href="/login">Connectez-vous</a>
        </div>
      </div>
    </div>
  );
}
