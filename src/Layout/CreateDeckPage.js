import React from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { createDeck, updateDeck } from "../utils/api/index";

import { BreadCrumb } from './Breadcrumb';

export const CreateDeckPage = () => {

    const { deckId } = useParams();
    const history = useHistory();

    const [deckData, setDeckData] = React.useState({
        name: "",
        description: ""
    });

    const handleChange = (event) => {
        setDeckData({
            ...deckData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createDeck(deckData);
            setDeckData(deckData);
            history.push(`/`);
        } catch (error) {
            throw error;
        }
    }

    return(
        <div>
            <BreadCrumb data={["Create Deck"]} />
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label for="deck-name">Name</label>
                    <input
                    id="deck-name"
                    value={deckData.name}
                    name="name"
                    placeholder="Deck Name"
                    className="form-control"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label for="deck-description">Description</label>
                    <textarea
                    id="deck-description"
                    value={deckData.description}
                    name="description"
                    placeholder="Description of the deck"
                    className="form-control"
                    onChange={handleChange}
                    />
                </div>

                <div>
                    <Link to={"/"}>
                        <button className="btn btn-secondary mr-1">Cancel</button>
                    </Link>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}