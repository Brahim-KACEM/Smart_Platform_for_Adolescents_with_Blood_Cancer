import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Quizhadd from './components/Quizhadd';
import Signupparent from './components/Signupparent';
import Signupkid from './components/Signupkid';
import Parentinterface from './components/Parentinterface';
import QuizChapter from './components/Quizchapter';
import Admindashbord from './components/Admindashbord';
import Admin from './components/Admin';
import Adminuser from './components/Adminuser';
import QuizDetailsPage from './components/QuizDetailsPage';
import QuestionPage from './components/QuestionPage';
import ResultPage from './components/ResultPage';
import ChaptersComponent from './components/ChaptersComponent';
import Statiques from './components/Statiques';
import Support from './components/Support';
import Support1 from './components/Support1';
import Support2 from './components/Support2';
import Support3 from './components/Support3';
import Histoetatpsychique from './components/Histoetatpsychique';
import History from './components/History';
import Adminhistorique from './components/Adminhistorique';
import { QuizContextProvider } from './components/QuizContext';
import Enfantinterface from './components/Enfantinterface';


function App() {
  return (
    <Router>
      <QuizContextProvider>
        <InnerApp />
      </QuizContextProvider>
    </Router>
  );
}

function InnerApp() {
  const location = useLocation();
  const [canNavigate, setCanNavigate] = useState(true);

  useEffect(() => {
    const urlsToClearToken = [
      '/signupparent', '/home', '/login', '/signupkid', '/chapterscomponent', '/support', '/support1', '/support2', '/support3'
    ];

    if (urlsToClearToken.some(url => location.pathname.startsWith(url))) {
      localStorage.removeItem('token');
    }

    if (!localStorage.getItem('token')) {
      setCanNavigate(false);
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signupparent" element={<Signupparent />} />
        <Route path="/signupkid" element={<Signupkid />} />
        <Route path="/quizchapter" element={canNavigate ? <QuizChapter /> : <Navigate to="/login" />} />
        <Route path="/admindashbord" element={canNavigate ? <Admindashbord /> : <Navigate to="/login" />} />
        <Route path="/adminusers" element={canNavigate ? <Adminuser /> : <Navigate to="/login" />} />
        <Route path="/admin" element={canNavigate ? <Admin /> : <Navigate to="/login" />} />
        <Route path="/quizzes/:chapterId" element={canNavigate ? <QuizDetailsPage /> : <Navigate to="/login" />} />
        <Route path="/questions/:quizId" element={canNavigate ? <QuestionPage /> : <Navigate to="/login" />} />
        <Route path="/chapterscomponent" element={<ChaptersComponent />} />
        <Route path="/statiques" element={<Statiques />} />
        <Route path="/support" element={<Support />} />
        <Route path="/support1" element={<Support1 />} />
        <Route path="/support2" element={<Support2 />} />
        <Route path="/support3" element={<Support3 />} />
        <Route path="/history" element={canNavigate ? <History /> :<Navigate to="/login" /> } />
        <Route path="/adminhistorique" element={ canNavigate ? < Adminhistorique /> :<Navigate to="/login" />} />
        <Route path="/quizhadd" element={<Quizhadd />} />
        <Route path="/histoetatpsychique" element={canNavigate ? <Histoetatpsychique /> :<Navigate to="/login" /> } />
        <Route path="/parentinterface" element={<Parentinterface />} />
        <Route path="/enfantinterface" element={<Enfantinterface />} />
    
      </Routes>
    </>
  );
}

export default App;
