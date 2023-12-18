import React from 'react';
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

export const DeckCard = ({ deck, setDecks }) => {
    const modalMsg = "Delete this Deck?\nYou will not be able to recover it.";

    async function modal() {
        try {
            const result = window.confirm(modalMsg);
        if (result) {
            await deleteDeck(deck.id);
            setDecks(await listDecks());
        }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="card" key={deck.id}>
            <div className="card-body">
                <div className="d-flex justify-content-between">

                <h4 className="card-title">{deck.name}</h4>
                    <p className="text-secondary">{deck.cards.length} cards</p>
                </div>

                <p className="card-text">{deck.description}</p>
                <Link to={`/decks/${deck.id}`} className="card-link">
                    <button className="btn btn-secondary">View</button>
                </Link>
                <Link to={`/decks/${deck.id}/study`} className="card-link">
                    <button className="btn btn-primary">Study</button>
                </Link>
                <button className="btn btn-danger float-right" onClick={modal}>
                    Delete
                </button>
            </div>
        </div>
    );
}