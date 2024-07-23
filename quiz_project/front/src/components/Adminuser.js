import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';


import '../assets/Adminuser.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    role: '',
    parent_id: null
  });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3005/users');
      console.log('Utilisateurs:', response.data); 
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addUser = async () => {
    try {

      const hashedPassword = await bcrypt.hash(newUser.password, 10);
  
      let parentIdValue = newUser.parent_id;
      if (parentIdValue === '') {
        parentIdValue = null; 
      }
  
    
      const userToAdd = {
        email: newUser.email,
        password: hashedPassword,
        role: newUser.role,
        parent_id: parentIdValue
      };
  
     
      await axios.post('http://localhost:3005/users', userToAdd);
      fetchUsers();
      setNewUser({ email: '', password: '', role: '', parent_id: null });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    }
  };
  
  

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3005/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    }
  };

  const updateUser = async () => {
    try {
      await axios.put(`http://localhost:3005/users/${editUser.id}`, editUser);
      fetchUsers();
      setEditUser(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditUser(user);
  };

  const handleCancelEdit = () => {
    setEditUser(null);
  };

  return (
    <div className="user-management-container">
      <h2>Gestion des Utilisateurs</h2>
      <div className="add-user-form">
        <h3>Ajouter un Utilisateur</h3>
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
          placeholder="Mot de passe"
        />
        <input
          type="text"
          name="role"
          value={newUser.role}
          onChange={handleInputChange}
          placeholder="Rôle"
        />
        <input
          type="number"
          name="parent_id"
          value={newUser.parent_id}
          onChange={handleInputChange}
          placeholder="ID Parent"
        />
        <button onClick={addUser}>Ajouter l'Utilisateur</button>
      </div>
      <div className="user-list">
        <h3>Utilisateurs</h3>
        <ul>
          {users.map(user => (
            <li key={user.id} className="user-item">
              {user.email} - {user.role}
              <button onClick={() => handleEditUser(user)}>Modifier</button>
              <button onClick={() => deleteUser(user.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
      {editUser && (
        <div className="edit-user-form">
          <h3>Modifier l'Utilisateur</h3>
          <input
            type="email"
            name="email"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={editUser.password}
            onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
            placeholder="Mot de passe"
          />
          <input
            type="text"
            name="role"
            value={editUser.role}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
            placeholder="Rôle"
          />
          <input
            type="number"
            name="parent_id"
            value={editUser.parent_id}
            onChange={(e) => setEditUser({ ...editUser, parent_id: e.target.value })}
            placeholder="ID Parent"
          />
          <button onClick={updateUser}>Mettre à Jour l'Utilisateur</button>
          <button onClick={handleCancelEdit}>Annuler</button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
