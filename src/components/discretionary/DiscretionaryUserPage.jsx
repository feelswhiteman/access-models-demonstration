import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthContext } from '../../context';

const DiscretionaryUserPage = ({ files }) => {
  const { username } = useParams();

  const user = useContext(AuthContext).currentUser;

  if (!user) {
    return <div>Користувача не знайдено.</div>;
  }

  const userPermissons = [];
  for (const file of files) {
    userPermissons.push(file.accessMatrix.get(username));
  }

  function readFile(file, userPermissons) {
    if (!userPermissons.includes('r')) {
      alert(`Ви не маєте дозвoлу на читання файлу ${file.path}.`)
      return;
    }
    alert(`Контент файлу ${file.path}:\n${file.read(username)}`)
  }

  function writeFile(file, userPermissons) {
    if (!userPermissons.includes('w')) {
      alert(`Ви не маєте дозвoлу на запис файлу ${file.path}`)
      return;
    }
    const text = prompt(`Введіть текст щоб додати у кінець файлу:`)
    file.write(username, text);
  }

  function grantFile(file, userPermissons) {
    if (!userPermissons.includes('g')) {
      alert(`Ви не маєте дозвoлу на передачу доступу до файлу ${file.path}`)
      return;
    }
    const userTo = prompt("Введіть ім'я користувача, якому хочете надати права: ");
    const permissions = prompt('Введіть права, які хочете надати (формат rwg): ');

    file.grant(username, userTo, permissions);
  }

  return (
    <div>
      <Navbar />
      <h2>Сторінка користувача {username}</h2>
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
              <td>{userPermissons[index]}</td>
              <td>
                <button onClick={() => readFile(file, userPermissons[index])}>read</button>
                <button onClick={() => writeFile(file, userPermissons[index])}>write</button>
                <button onClick={() => grantFile(file, userPermissons[index])}>grant</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default DiscretionaryUserPage;
