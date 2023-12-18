import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import { BreadCrumb } from "./Breadcrumb";

export const StudyDeck = () => {
    const { deckId } = useParams();

    const [flipped, setFlipped] = useState(false);
    const [deck, setDeck] = useState({});
    const [cardCount, setCardCount] = useState(0);
    const [index, setIndex] = useState(0);

    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();

        async function showCard() {
            const cardList = await readDeck(deckId, abortController.signal);
            setDeck(cardList);
            setCardCount(cardList.cards.length);
        }

        showCard();
        return () => abortController.abort();
    }, [deckId]);

    function toggleFlipped() {
        setFlipped(!flipped);
    }

    function next() {
        if (index < cardCount - 1) {
            setIndex(index + 1);
            setFlipped(false);
        } else {
            const modalMsg = "Restart Cards?\nClick 'cancel' to return to the home page.";
            const restart = window.confirm(modalMsg);
            if (restart) {
                setIndex(0);
                setFlipped(false);
            } else {
                history.push("/");
            }
        }
    }

    if (cardCount < 3) {
        return (
            <div>
                <BreadCrumb data={[deck.name, "Study"]} />
                <h1>{deck.name}: Study</h1>
                <h4> Not Enough Cards.</h4>
                <p>
                    You need at least 3 cards to study. There are {cardCount} cards in
                    this deck
                </p>
                <button
                    className="btn btn-primary"
                    onClick={() => history.push(`/decks/${deck.id}/cards/new`)}
                >
                    Add Cards
                </button>
            </div>
        );
    } else {
        return (
            <div>
                <BreadCrumb data={[deck.name, "Study"]} />
                <div className="card-body border rounded p-4 my-2">
                    <div className="card-title">
                        <h4>
                            Card {index + 1} of {cardCount}
                        </h4>
                        <p>{!flipped ? deck.cards[index].front : deck.cards[index].back}</p>
                    </div>
                    <div className="buttons">
                        <button className="btn btn-secondary mx-1" onClick={toggleFlipped}>
                            Flip
                        </button>
                        {flipped && (
                            <button className="btn btn-primary" onClick={next}>
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}