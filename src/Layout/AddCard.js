import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";

import { CardForm } from "./CardForm";
import { BreadCrumb } from "./Breadcrumb";

export const AddCard = () => {
    const { deckId } = useParams();

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
            await createCard(deckId, cardData);
            setCardData({
                front: "",
                back: "",
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        async function loadDeck() {
            try {
                setDeck(await readDeck(deckId));
            } catch (error) {
                console.log(error)
            }
        }
        loadDeck();
    }, [deckId]);

    return (
        <div>
            <BreadCrumb data={[deck.name, "Add Card"]} />
            <h1>
                {" "}
                {deck.name}: Add Card
            </h1>
            <div>
                <CardForm
                    cardData={cardData}
                    deckId={deckId}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit} />
            </div>
        </div>
    );
}