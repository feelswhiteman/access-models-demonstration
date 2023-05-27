import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css'
import { User, File, defineAccessMatrix } from './modules/discretionaryAccessControl'

import { AuthContext } from './context';
import Login from './components/Login';
import ModelDemonstrationPage from './components/ModelDemonstrationPage';
import DiscretionaryModel from './components/discretionary/DiscretionaryModel';
import DiscretionaryUserPage from './components/discretionary/DiscretionaryUserPage';
import MandatoryModel from './components/mandatory/MandatoryModel';
import MandatoryUserPage from './components/mandatory/MandatoryUserPage';

const users1 = [
    new User('user1', 'pass1', true),
    new User('user2', 'pass2', false),
    new User('user3', 'pass3', false),
    new User('user4', 'pass4', false),
    new User('user5', 'pass5', false),
    new User('user6', 'pass6', false),
    new User('user7', 'pass7', false),
    new User('user8', 'pass8', false),
    new User('user9', 'pass9', false),
    new User('user10', 'pass10', false),
];

const files1 = [
    new File('file1.txt', 'content of file1'),
    new File('file2.txt', 'content of file2'),
    new File('file3.txt', 'content of file3'),
    new File('file4.txt', 'content of file4'),
    new File('file5.txt', 'content of file5'),
];

for (const file of files1) {
    defineAccessMatrix(file, users1);
}



const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <div className="container">
            <AuthContext.Provider value={{
                isAuthenticated, setIsAuthenticated,
                currentUser, setCurrentUser
            }}>
                <Router>
                    <Routes>
                        <Route path="/" element={<ModelDemonstrationPage />} />
                        <Route path="/discretionary" element={<DiscretionaryModel />} />
                        <Route path="/discretionary/login" element={<Login users={users1} />}></Route>
                        {isAuthenticated &&
                            <Route path="/discretionary/users/:username" element={<DiscretionaryUserPage files={files1} />} />
                        }

                        <Route path="/mandatory" element={<MandatoryModel />} />
                        <Route path="/mandatory/login" element={<Login users={users1} />}></Route>
                        {isAuthenticated &&
                            <Route path="/mandatory/users/:username" element={<MandatoryUserPage files={files1} />} />
                        }
                        <Route path='/*' element={<Navigate to="/" />}></Route>
                    </Routes>
                </Router>
            </AuthContext.Provider>
        </div>
    );
};

export default App;
