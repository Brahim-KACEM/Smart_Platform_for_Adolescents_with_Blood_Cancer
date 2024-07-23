import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useQuizContext } from './QuizContext';
import '../assets/Quizchapter.css';

const ChapterList = () => {
  const [chapters, setChapters] = useState([]);
  const { setUserid } = useQuizContext();
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:3005/chapter')
      .then((response) => {
        setChapters(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  
    const searchParams = new URLSearchParams(location.search);
    const userIdFromUrl = searchParams.get('userId');

    if (userIdFromUrl) {
      setUserid(parseInt(userIdFromUrl));
    }
  }, [location.search, setUserid]);
  


  return (
    <div className="ChapterList">
      <h2>Les Chapitres</h2>
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <Link to={`/quizzes/${chapter.id}`} className="ChapterLink">
              {chapter.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChapterList;
