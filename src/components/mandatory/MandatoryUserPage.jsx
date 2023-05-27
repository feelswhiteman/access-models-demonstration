import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useContext } from 'react';
import { AuthContext } from '../../context';

const MandatoryUserPage = ({ userAccessLevel, files }) => {
  const { username } = useParams();

  const user = useContext(AuthContext).currentUser;

  if (!user) {
    return <div>Користувача не знайдено.</div>;
  }

  function levelAsString(level) {
    if(level === 0) return 'Відкриті дані';
    if(level === 1) return "Таємно";
    if(level === 2) return "Цілком таємно";
  }

  function readFile(file) {
    if (userAccessLevel < file.securityLevel) {
      alert(`Ви не маєте дозвoлу на читання файлу ${file.path}.`)
      return;
    }
    alert(`Контент файлу ${file.path}:\n${file.content}`)
  }

  function writeFile(file) {
    if (userAccessLevel < file.securityLevel) {
      alert(`Ви не маєте дозвoлу на запис файлу ${file.path}`)
      return;
    }
    const text = prompt(`Введіть текст щоб додати у кінець файлу:`)
    file.content += text;
  }

  return (
    <div>
      <Navbar />
      <h2>Сторінка користувача {username}</h2>
      <h2>Ваш рівень доступу: {levelAsString(userAccessLevel)}</h2>
      <h3>Список файлів:</h3>
      <table>
        <thead>
          <tr>
            <th>Назва файлу</th>
            <th>Доступ</th>
            <th>Дії над файлом</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>{file.path}</td>
              <td>{levelAsString(file.securityLevel)}</td>
              <td>
                <button onClick={() => readFile(file)}>read</button>
                <button onClick={() => writeFile(file)}>write</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default MandatoryUserPage;
