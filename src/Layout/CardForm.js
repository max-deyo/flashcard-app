import React from "react";
import { Link } from "react-router-dom";

export const CardForm = ({ cardData, handleSubmit, deckId, handleChange }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label for="card-front">Front</label>
                <textarea
                    id="card-front"
                    value={cardData.front}
                    name="front"
                    placeholder="Front side of card"
                    className="form-control"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label for="card-back">Back</label>
                <textarea
                    id="card-back"
                    value={cardData.back}
                    name="back"
                    placeholder="Back side of card"
                    className="form-control"
                    onChange={handleChange}
                />
            </div>
            <div>
                <Link to={`/decks/${deckId}`}>
                    <button className="btn btn-secondary">Done</button>
                </Link>
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
            </div>
        </form>
    )
}