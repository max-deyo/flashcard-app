import React from 'react';
import { Link, useRouteMatch, useParams, useHistory } from "react-router-dom";
import { deleteDeck, readDeck } from "../utils/api";

import { CardCard } from './CardCard';
import { BreadCrumb } from './Breadcrumb';

export const DeckPage = () => {
    const { url } = useRouteMatch();
    const { deckId } = useParams();
    const history = useHistory();

    const [deck, setDeck] = React.useState({});

    React.useEffect(() => {
        async function loadData() {
            try {
                setDeck(await readDeck(deckId));
            } catch (error) {
                console.log(error);
            }
        }
        loadData();
    }, [deckId]);

    const modalMsg = "Delete this Deck?\nYou will not be able to recover it.";

    async function modal() {
        try {
            const result = window.confirm(modalMsg);
        if (result) {
            await deleteDeck(deckId);
            history.push("/");
        }
        } catch (error) {
            console.log(error);
        }
    }

    if (deck.cards) {
        return (
            <div>
                <BreadCrumb data={[deck.name]} />
                <div className="card border-0" key={deck.id}>
                    <div className="card-body">
                        <h5 className="card-title">{deck.name}</h5>
                        <p className="card-text">{deck.description}</p>
                        <Link to={`${url}/edit`} className="card-link">
                            <button className="btn btn-secondary">Edit</button>
                        </Link>
                        <Link to={`${url}/study`} className="card-link">
                            <button className="btn btn-primary">Study</button>
                        </Link>
                        <Link to={`${url}/cards/new`} className="card-link">
                            <button className="btn btn-primary">Add Cards</button>
                        </Link>

                        <button className="btn btn-danger float-right" onClick={modal}>
                        Delete
                        </button>
                        <h2 className="card-text mt-5">Cards</h2>
                    </div>
                    {deck.cards.map((card) => (
                        <CardCard card={card} setDeck={setDeck} />
                    ))}
                </div>
            </div>
        );
    } else {
        return <h4>Loading...</h4>;
    }
}