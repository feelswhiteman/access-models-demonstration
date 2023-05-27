import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context";
import { useContext } from "react";

function Navbar() {

    const { isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser } = useContext(AuthContext);

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
    };

    return <ul>
        <br />
        <li>
            <Link to="/mandatory">Домашня сторінка</Link>
        </li>
        {isAuthenticated && <li>
            <Link to={`/mandatory/users/${currentUser}`}>Моя сторінка</Link>
        </li>}
        {isAuthenticated ? <li>
            <button onClick={handleLogout}>
                <Link to="/mandatory">Вийти</Link>
            </button>
        </li> : <li>
            <button>
                <Link to="/mandatory/login">Увійти</Link>
            </button>
        </li>}
        <li>{currentUser}</li>
        <hr />
    </ul>;
}

export default Navbar;