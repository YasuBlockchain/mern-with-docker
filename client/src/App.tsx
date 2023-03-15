import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

function App() {
    const [decks, setDecks] = useState<{ loading: boolean, error: string | false, data: { title: string }[] }>({
        loading: false,
        data: [],
        error: false
    })

    useEffect(() => {
        setDecks(prev => ({...prev, loading: true, error: false}))
        axios.get<{ title: string }[]>(`${process.env.REACT_APP_API_ENDPOINT}/decks`).then(r => {
            setDecks(prev => ({...prev, data: r.data, loading: false}))
        }).catch(e => {
            console.error(e)
            setDecks(prev => ({...prev, loading: false, error: "An error occurred while fetching decks."}))
        })
    }, [])

    return <>
        {decks.loading && "Loading decks"}
        {decks.error && decks.error}

        {!decks.loading && !decks.error && <>
            {decks.data.length > 0 ?
                <>
                    <h3>Decks</h3>
                    <ul>
                        {decks.data.map((item, index) => (
                            <li key={index}>{item.title}</li>
                        ))}
                    </ul>

                </> :
                "No deck created yet ..."}


        </>}

    </>
}

export default App;
