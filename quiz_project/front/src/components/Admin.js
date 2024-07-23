import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/Admin.css'

const AdminPage = () => {
  const [chapters, setChapters] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [updateChapterForm, setUpdateChapterForm] = useState({
    id: '',
    name: '',
  });

  const [updateQuizForm, setUpdateQuizForm] = useState({
    id: '',
    name: '',
  });

  const [updateQuestionForm, setUpdateQuestionForm] = useState({
    id: '',
    text: '',
    option1: '',
    option2: '',
    option3: '',
    correctAnswer: '',
  });

  const [addChapterForm, setAddChapterForm] = useState({
    name: '',
  });

  const [addQuizForm, setAddQuizForm] = useState({
    name: '',
  });

  const [addQuestionForm, setAddQuestionForm] = useState({
    text: '',
    option1: '',
    option2: '',
    option3: '',
    correctAnswer: '',
  });

  useEffect(() => {
    fetchChapters();
    fetchQuizzes();
    fetchQuestions();
  }, []);

  const fetchChapters = () => {
    axios.get('http://localhost:3005/chapters')
      .then((response) => {
        setChapters(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchQuizzes = () => {
    axios.get('http://localhost:3005/quizzes')
      .then((response) => {
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchQuestions = () => {
    axios.get('http://localhost:3005/questions')
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteChapter = (id) => {
    axios.delete(`http://localhost:3005/chapters/${id}`)
      .then(() => {
        fetchChapters();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteQuiz = (id) => {
    axios.delete(`http://localhost:3005/quizzes/${id}`)
      .then(() => {
        fetchQuizzes();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteQuestion = (id) => {
    axios.delete(`http://localhost:3005/questions/${id}`)
      .then(() => {
        fetchQuestions();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChapterFormChange = (event) => {
    setUpdateChapterForm({
      ...updateChapterForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleQuizFormChange = (event) => {
    setUpdateQuizForm({
      ...updateQuizForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleQuestionFormChange = (event) => {
    setUpdateQuestionForm({
      ...updateQuestionForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddChapterFormChange = (event) => {
    setAddChapterForm({
      ...addChapterForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddQuizFormChange = (event) => {
    setAddQuizForm({
      ...addQuizForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddQuestionFormChange = (event) => {
    setAddQuestionForm({
      ...addQuestionForm,
      [event.target.name]: event.target.value,
    });
  };

  const updateChapter = (id) => {
    const chapter = chapters.find((chapter) => chapter.id === id);
    setUpdateChapterForm({
      id: chapter.id,
      name: chapter.name,
    });
  };

  const updateQuiz = (id) => {
    const quiz = quizzes.find((quiz) => quiz.id === id);
    setUpdateQuizForm({
      id: quiz.id,
      name: quiz.name,
    });
  };

  const updateQuestion = (id) => {
    const question = questions.find((question) => question.id === id);
    setUpdateQuestionForm({
      id: question.id,
      text: question.text,
      option1: question.option1,
      option2: question.option2,
      option3: question.option3,
      option4: question.option4,
      correctAnswer: question.correctAnswer,
    });
  };

  const addChapter = () => {
    const { name } = addChapterForm;

    axios.post('http://localhost:3005/chapters', { name })
      .then(() => {
        fetchChapters();
        setAddChapterForm({
          name: '',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addQuiz = () => {
    const { name } = addQuizForm;

    axios.post('http://localhost:3005/quizzes', { name })
      .then(() => {
        fetchQuizzes();
        setAddQuizForm({
          name: '',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addQuestion = () => {
    const { text, option1, option2, option3,option4, correctAnswer } = addQuestionForm;

    axios.post('http://localhost:3005/questions', { text, option1, option2, option3, correctAnswer })
      .then(() => {
        fetchQuestions();
        setAddQuestionForm({
          text: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          correctAnswer: '',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const submitChapterUpdate = (event) => {
    event.preventDefault();

    const { id, name } = updateChapterForm;

    axios.put(`http://localhost:3005/chapters/${id}`, { name })
      .then((response) => {
        console.log(response.data);
        fetchChapters();
        setUpdateChapterForm({
          id: '',
          name: '',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const submitQuizUpdate = (event) => {
    event.preventDefault();

    const { id, name } = updateQuizForm;

    axios.put(`http://localhost:3005/quizzes/${id}`, { name })
      .then((response) => {
        console.log(response.data);
        fetchQuizzes();
        setUpdateQuizForm({
          id: '',
          name: '',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const submitQuestionUpdate = (event) => {
    event.preventDefault();

    const { id, text, option1, option2, option3,option4, correctAnswer } = updateQuestionForm;

    axios.put(`http://localhost:3005/questions/${id}`, { text, option1, option2, option3, option4, correctAnswer })
      .then((response) => {
        console.log(response.data);
        fetchQuestions();
        setUpdateQuestionForm({
          id: '',
          text: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          correctAnswer: '',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2 className="admin-heading">Chapitres</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nom du chapitre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {chapters.map((chapter) => (
            <tr key={chapter.id}>
              <td>{chapter.name}</td>
              <td>
                <button className="delete-button" onClick={() => deleteChapter(chapter.id)}>Supprimer</button>
                <button className="update-button" onClick={() => updateChapter(chapter.id)}>Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form className="add-form" onSubmit={addChapter}>
        <input
          type="text"
          name="name"
          value={addChapterForm.name}
          onChange={handleAddChapterFormChange}
          placeholder="Nom du chapitre"
          className="add-input"
        />
        <button type="submit" className="add-submit-button">Ajouter</button>
      </form>

      {updateChapterForm.id && (
        <form className="update-form" onSubmit={submitChapterUpdate}>
          <input
            type="text"
            name="name"
            value={updateChapterForm.name}
            onChange={handleChapterFormChange}
            className="update-input"
          />
          <button type="submit" className="update-submit-button">Valider</button>
        </form>
      )}

      <h2 className="admin-heading">Quizzes</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nom du quiz</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.id}>
              <td>{quiz.name}</td>
              <td>
                <button className="delete-button" onClick={() => deleteQuiz(quiz.id)}>Supprimer</button>
                <button className="update-button" onClick={() => updateQuiz(quiz.id)}>Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form className="add-form" onSubmit={addQuiz}>
        <input
          type="text"
          name="name"
          value={addQuizForm.name}
          onChange={handleAddQuizFormChange}
          placeholder="Nom du quiz"
          className="add-input"
        />
        <button type="submit" className="add-submit-button">Ajouter</button>
      </form>

      {updateQuizForm.id && (
        <form className="update-form" onSubmit={submitQuizUpdate}>
          <input
            type="text"
            name="name"
            value={updateQuizForm.name}
            onChange={handleQuizFormChange}
            className="update-input"
          />
          <button type="submit" className="update-submit-button">Valider</button>
        </form>
      )}

      <h2 className="admin-heading">Questions</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Texte de la question</th>
            <th>Option 1</th>
            <th>Option 2</th>
            <th>Option 3</th>
            <th>Option 4</th>
            <th>Réponse de la question</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <td>{question.text}</td>
              <td>{question.option1}</td>
              <td>{question.option2}</td>
              <td>{question.option3}</td>
              <td>{question.option4}</td>
              <td>{question.correctAnswer}</td>
              <td>
                <button className="delete-button" onClick={() => deleteQuestion(question.id)}>Supprimer</button>
                <button className="update-button" onClick={() => updateQuestion(question.id)}>Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form className="add-form" onSubmit={addQuestion}>
        <input
          type="text"
          name="text"
          value={addQuestionForm.text}
          onChange={handleAddQuestionFormChange}
          placeholder="Texte de la question"
          className="add-input"
        />
        <input
          type="text"
          name="option1"
          value={addQuestionForm.option1}
          onChange={handleAddQuestionFormChange}
          placeholder="Option 1"
          className="add-input"
        />
        <input
          type="text"
          name="option2"
          value={addQuestionForm.option2}
          onChange={handleAddQuestionFormChange}
          placeholder="Option 2"
          className="add-input"
        />
        <input
          type="text"
          name="option3"
          value={addQuestionForm.option3}
          onChange={handleAddQuestionFormChange}
          placeholder="Option 3"
          className="add-input"
        />
          <input
          type="text"
          name="option4"
          value={addQuestionForm.option4}
          onChange={handleAddQuestionFormChange}
          placeholder="Option 4"
          className="add-input"
        />
        <input
          type="text"
          name="correctAnswer"
          value={addQuestionForm.correctAnswer}
          onChange={handleAddQuestionFormChange}
          placeholder="Réponse de la question"
          className="add-input"
        />
        <button type="submit" className="add-submit-button">Ajouter</button>
      </form>

      {updateQuestionForm.id && (
        <form className="update-form" onSubmit={submitQuestionUpdate}>
          <input
            type="text"
            name="text"
            value={updateQuestionForm.text}
            onChange={handleQuestionFormChange}
            className="update-input"
          />
          <input
            type="text"
            name="option1"
            value={updateQuestionForm.option1}
            onChange={handleQuestionFormChange}
            className="update-input"
          />
          <input
            type="text"
            name="option2"
            value={updateQuestionForm.option2}
            onChange={handleQuestionFormChange}
            className="update-input"
          />
          <input
            type="text"
            name="option3"
            value={updateQuestionForm.option3}
            onChange={handleQuestionFormChange}
            className="update-input"
          />
            <input
            type="text"
            name="option4"
            value={updateQuestionForm.option4}
            onChange={handleQuestionFormChange}
            className="update-input"
          />
          <input
            type="text"
            name="correctAnswer"
            value={updateQuestionForm.correctAnswer}
            onChange={handleQuestionFormChange}
            className="update-input"
          />
          <button type="submit" className="update-submit-button">Valider</button>
        </form>
      )}
    </div>
  );
};

export default AdminPage;
