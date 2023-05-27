import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';

const Login = ({users}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    const user = users.find(user => user.username === username);
    if (user && user.password === password) {
      setIsAuthenticated(true);
      setCurrentUser(username);
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const loginSuccessful = handleLogin(username, password);
    if (!loginSuccessful) {
      setError("Неправильне ім'я користувача або пароль");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className='login-container'>
      <h2>Вхід</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className='username'>
          <label>
            Ім'я користувача:
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
        </div>
        <div className='password'>
          <label>
            Пароль:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
        </div>
        <div className="submit-btn">
          <button type="submit">Увійти</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
