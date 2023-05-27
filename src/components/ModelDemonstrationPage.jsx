import React from 'react'
import { Link } from 'react-router-dom'

export default function ModelDemonstrationPage() {
    return (
        <div>
            <h2>Виберіть модель:</h2>
            <br />
            <ul>
                <li>
                    <Link to="/discretionary">Дискреційна модель</Link>
                </li>
                <li>
                    <Link to="/mandatory">Мандатна модель</Link>
                </li>
            </ul>
        </div>
    )
}
