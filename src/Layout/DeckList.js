import React from 'react';
import { DeckCard } from './DeckCard';

export const DeckList = ({ decks, setDecks }) => {
    return(
        decks.map((deck) => {
            return <DeckCard deck={deck} setDecks={setDecks} />
        })
    )
}