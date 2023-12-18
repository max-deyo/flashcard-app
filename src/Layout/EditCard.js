import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateCard, readCard } from "../utils/api";

import { CardForm } from "./CardForm";
import { BreadCrumb } from "./Breadcrumb";

export const EditCard = () => {
    const { deckId, cardId } = useParams();
    const history = useHistory();

    const [deck, setDeck] = useState({});
    const [cardData, setCardData] = useState({
        front: "",
        back: "",
    });

    const handleChange = (event) => {
        setCardData({
            ...cardData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateCard(cardData);
            history.push(`/decks/${deckId}`);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        async function loadData() {
            try {
                setCardData(await readCard(cardId));
                setDeck(await readDeck(deckId));
            } catch (error) {
                console.log(error);
            }
        }
        loadData();
    }, [deckId, cardId]);

    return (
        <div>
            <BreadCrumb data={[deck.name, "Edit Deck"]} />
            <h1>{deck.name}: Edit Card</h1>
            <div>
                <CardForm
                    cardData={cardData}
                    deckId={deckId}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}/>
            </div>
        </div>
    );
}