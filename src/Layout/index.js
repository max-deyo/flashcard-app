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
