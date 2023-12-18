import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";

import { Route, Switch } from "react-router-dom";
import { HomePage } from "./HomePage";
import { DeckPage } from "./DeckPage";
import { CreateDeckPage } from "./CreateDeckPage";
import { EditDeckPage } from "./EditDeckPage";
import { StudyDeck } from "./StudyDeck";
import { AddCard } from "./AddCard";
import { EditCard } from "./EditCard";

// Study	/decks/:deckId/study	Allows the user to study the cards from a specified deck
// Create Deck	/decks/new	Allows the user to create a new deck
// Deck	/decks/:deckId	Shows all of the information about a specified deck with options to edit or add cards to the deck, navigate to the study screen, or delete the deck
// Edit Deck	/decks/:deckId/edit	Allows the user to modify information on an existing deck
// Add Card	/decks/:deckId/cards/new	Allows the user to add a new card to an existing deck
// Edit Card	/decks/:deckId/cards/:cardId/edit

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/decks/new">
            <CreateDeckPage />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckPage />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeckPage />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
