import React from 'react';
import { Link } from 'react-router-dom';
import { DeckList } from './DeckList';
import { listDecks } from '../utils/api/index';

export const HomePage = () => {
    const [decks, setDecks] = React.useState([]);

    React.useEffect(() => {
        async function fetchData(){
            try {
                setDecks(await listDecks());
            } catch (error) {
                throw error;
            }
        }
        fetchData();
    }, []);

    return(
        <div>
            <Link to="/decks/new">
                <button className='btn btn-primary'>Create Deck</button>
            </Link>
            <DeckList decks={decks} setDecks={setDecks} />
        </div>
    )
}