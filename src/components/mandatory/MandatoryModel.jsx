import React from "react";

import Navbar from "./Navbar";
import HomePage from "../HomePage";

function MandatoryModel() {
    return (
        <div className="discretionary-model">
            <Navbar/>
            <HomePage></HomePage>
            <h3>Демонстрація мандатної моделі доступу</h3>
        </div>
    );
}

export default MandatoryModel;