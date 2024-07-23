import React , {useState} from 'react';
import '../assets/Login.css';
import axios from 'axios';

const Login = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);


  
const handleSubmit = (e) => {
  e.preventDefault();
  let newErrors = {};
  const formData = {
 
    email: mail,
   password:password
  };
  setMail('');
  setPassword('');

  axios.post('http://localhost:3005/login', formData)
  .then(response => {
    console.log(response.data);
    window.location.href = '/quizchapter';
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
        <header>Login Form</header>
        {error.apiError && <div className="error-message">{error.apiError}</div>}
        <form action="post" onSubmit={handleSubmit}>
        <div className={`field ${error ? 'error' : ''}`}>
  <span className="fa fa-user"></span>
  <input type="text" required placeholder="Email or Phone" onChange={(e) => setMail(e.target.value)} value={mail} />
</div>
<div className={`field space ${error ? 'error' : ''}`}>
  <span className="fa fa-lock"></span>
  <input type="password" className="pass-key" required placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="new-password" />
  <span className="show">SHOW</span>
</div>
          <div className="pass">
            <a href="#">Forgot Password?</a>
          </div>
          <div className="field">
            <input type="submit" value="LOGIN"  />
          </div>
        </form>
        <div className="login">
          Or login with
        </div>
        <div className="links">
          <div className="facebook">
            <i className="fab fa-facebook-f"><span>Facebook</span></i>
          </div>
          <div className="instagram">
            <i className="fab fa-instagram"><span>Instagram</span></i>
          </div>
        </div>
        <div className="signup">
          Don't have an account?
          <a href="#">Signup Now</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
