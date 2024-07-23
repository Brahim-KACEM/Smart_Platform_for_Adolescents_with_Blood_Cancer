import React, { useState, useEffect } from 'react';
import '../assets/Login.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useQuizContext } from './QuizContext';

const Login = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const { setUserid, userid } = useQuizContext();
  
  useEffect(() => {
    console.log("userid updated:", userid);
  }, [userid]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    const formData = {
      email: mail,
      password: password
    };

    axios.post('http://localhost:3005/login', formData)
      .then(response => {
        const { token, role, redirectUrl } = response.data;
        localStorage.setItem('token', token);
        const decodedToken = jwt_decode(token);
        console.log(decodedToken); 
        const userIdd = decodedToken.userId;
        
        setUserid(userIdd);
       
        window.location.href = redirectUrl + `?userId=${userIdd}`;
      })
      .catch(error => {
        if (error.response) {
          const errorMessage = error.response.data.message;
          setError({ ...newErrors, apiError: errorMessage });
        } else {
          console.error(error);
        }
      });
  };

  return (
    <div className="bg-img">
      <div className="content">
        <header>Formulaire de connexion</header>
        {error.apiError && <div className="error-message">{error.apiError}</div>}
        <form action="post" onSubmit={handleSubmit}>
          <div className={`field ${error ? 'error' : ''}`}>
            <span className="fa fa-user"></span>
            <input type="text" required placeholder="E-mail ou téléphone" onChange={(e) => setMail(e.target.value)} value={mail} />
          </div>
          <div className={`field space ${error ? 'error' : ''}`}>
            <span className="fa fa-lock"></span>
            <input type="password" className="pass-key" required placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="new-password" />
          </div>
        
          <div className="field">
            <input type="submit" value="SE CONNECTER" />
          </div>
        </form>
       
        <div className="signup">
          Vous n'avez pas de compte ?
          <a href="/signup">Inscrivez-vous maintenant</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
