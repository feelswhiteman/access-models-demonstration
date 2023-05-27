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
            <Link to="/discretionary">Домашня сторінка</Link>
        </li>
        {isAuthenticated && <li>
            <Link to={`/discretionary/users/${currentUser}`}>Моя сторінка</Link>
        </li>}
        {isAuthenticated ? <li>
            <button onClick={handleLogout}>
                <Link to="/discretionary">Вийти</Link>
            </button>
            <span>{currentUser}</span>
        </li> : <li>
            <button>
                <Link to="/discretionary/login">Увійти</Link>
            </button>
        </li>}
        <hr />
    </ul>;
}

export default Navbar;