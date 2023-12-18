import React from "react";
import { deleteCard, readDeck } from "../utils/api";
import { useRouteMatch, Link } from "react-router-dom";

export const CardCard = ({ card, setDeck }) => {
    const { url, params } = useRouteMatch();
    const modalMsg = "Delete this card?\nYou will not be able to recover it.";

    async function modal() {
        try {
        const result = window.confirm(modalMsg);
        if (result) {
            await deleteCard(card.id);
            setDeck(await readDeck(params.deckId));
        }
        } catch (error) {
        throw error;
        }
    }

    return (
        <div className="card" key={card.id}>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                <p className="card-text mr-5">{card.front}</p>
                <p className="card-text ml-5">{card.back}</p>
                </div>
                <div className="d-flex justify-content-end">
                <Link to={`${url}/cards/${card.id}/edit`} className="card-link mr-1">
                    <button className="btn btn-secondary">Edit</button>
                </Link>
                <button className="btn btn-danger" onClick={modal}>
                    Delete
                </button>
                </div>
            </div>
        </div>
    );
}