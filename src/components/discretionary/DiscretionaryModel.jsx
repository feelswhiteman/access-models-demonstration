import React from "react";

import Navbar from "./Navbar";
import HomePage from "../HomePage";

function DiscretionaryModel() {
    return (
        <div className="discretionary-model">
            <Navbar/>
            <HomePage></HomePage>
            <h3>Демонстрація дискреційної моделі доступу</h3>
        </div>
    );
}

export default DiscretionaryModel;