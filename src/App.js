import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css'
import { DUser, DFile, defineAccessMatrixRandomly } from './modules/discretionaryAccessControl'
import { MUser, MFile, defineFileSecurityLevelRandomly, defineUserAccessLevelRandomly } from './modules/mandatoryAccessControl';

import { AuthContext } from './context';
import Login from './components/Login';
import ModelDemonstrationPage from './components/ModelDemonstrationPage';
import DiscretionaryModel from './components/discretionary/DiscretionaryModel';
import DiscretionaryUserPage from './components/discretionary/DiscretionaryUserPage';
import MandatoryModel from './components/mandatory/MandatoryModel';
import MandatoryUserPage from './components/mandatory/MandatoryUserPage';

const users1 = [
    new DUser('user1', 'pass1', true),
    new DUser('user2', 'pass2', false),
    new DUser('user3', 'pass3', false),
    new DUser('user4', 'pass4', false),
    new DUser('user5', 'pass5', false),
    new DUser('user6', 'pass6', false),
    new DUser('user7', 'pass7', false),
    new DUser('user8', 'pass8', false),
    new DUser('user9', 'pass9', false),
    new DUser('user10', 'pass10', false),
];

const files1 = [
    new DFile('file1.txt', 'content of file1'),
    new DFile('file2.txt', 'content of file2'),
    new DFile('file3.txt', 'content of file3'),
    new DFile('file4.txt', 'content of file4'),
    new DFile('file5.txt', 'content of file5'),
];

for (const file of files1) {
    defineAccessMatrixRandomly(file, users1);
}

const users2 = [
    new MUser('user21', 'pass21'),
    new MUser('user22', 'pass22'),
    new MUser('user23', 'pass23'),
    new MUser('user24', 'pass24'),
];

const files2 = [
    new MFile('file21.txt', 'content of file21'),
    new MFile('file22.txt', 'content of file22'),
    new MFile('file23.txt', 'content of file23'),
    new MFile('file24.txt', 'content of file24'),
    new MFile('file25.txt', 'content of file25'),
];

defineUserAccessLevelRandomly(users2);
defineFileSecurityLevelRandomly(files2);


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
                        <Route path="/mandatory/login" element={<Login users={users2} />}></Route>
                        {isAuthenticated &&
                            <Route path="/mandatory/users/:username" element={
                                <MandatoryUserPage userAccessLevel={ users2.find(u => u.username === currentUser).accessLevel } files={files2} />} />
                        }
                        <Route path='/*' element={<Navigate to="/" />}></Route>
                    </Routes>
                </Router>
            </AuthContext.Provider>
        </div>
    );
};

export default App;
