/*
    This is the file where all the note operations aere handled including updating states
    and fetching, creation, deletion, ediitng as well as trggerring operation
    specific alerts  
*/
import { useState } from "react";
import NoteContext from "./NotesContext";

const NoteState = (props) => {

    const URL = 'http://127.0.0.1:4000';
    const initial_notes = []

    // ============= State Variables ===============
    const [notes, setNotes] = useState(initial_notes)
    const [editNote_id, setEditNote_id] = useState(null);
    const [alert, setAlert] = useState({
        visibility: 'hidden',
        msg: 'Alert',
        status: 'success'
    });
    const [theme, setTheme] = useState({
        mode: 'light',
        backgroundColor: '#a39e9e',
        color: 'black',
        btnName: String.fromCharCode(9789) + ' Dark Mode',
        background: 'linear-gradient(145deg, green, lightgreen)',
        border: '2px solid black'
    })

    // ======================== Functions ========================
    // Toggles the theme of the web app (light mode - dark mode)
    const toggleTheme = () => {
        if (theme.mode === 'light') {
            setTheme({
                mode: 'dark',
                backgroundColor: '#282727',
                color: 'white',
                btnName: String.fromCharCode(9728) + ' Light Mode',
                background: 'linear-gradient(145deg, purple, #8c6bb7)',
                border: '2px solid white'

            })

            document.body.style.backgroundColor = 'black';
        }

        else {
            setTheme({
                mode: 'light',
                backgroundColor: '#a39e9e',
                color: 'black',
                btnName: String.fromCharCode(9789) + ' Dark Mode',
                background: 'linear-gradient(145deg, green, lightgreen)',
                border: '2px solid black'
            })

            document.body.style.backgroundColor = 'white';
        }
    }

    // triggers the alert based on type of operation which passed by using status parameter
    const triggerAlert = (alertType, message) => {
        setAlert({
            visibility: 'visible',
            msg: message,
            status: alertType
        });

        setTimeout(() => {
            setAlert({
                visibility: 'hidden',
                msg: 'Alert',
                status: 'success'
            });
        }, 1500)
    }

    // Fetches all the notes of a specific user from the database by API call
    const getNotes = async () => {
        const response = await fetch(`${URL}/api/notes/fetchallnotes`, {
            method: 'get',
            headers: {
                'auth-token': localStorage.getItem('authToken')
            }
        })

        const fetched_notes = await response.json()
        setNotes(fetched_notes);
    }

    // Fetches the note of a partiular id
    const fetchNote = (id) => {
        try {
            const fetchedNote = notes.filter((element) => { return element._id === id })
            return fetchedNote;
        } catch (error) {
            console.log("No note found!");
        }
    }

    // Adding a note
    const createNote = async (user_note) => {
        try {
            const response = await fetch(`${URL}/api/notes/createnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('authToken')
                },
                'body': JSON.stringify(user_note)
            });


            const newNote = await response.json();
            setNotes(notes.concat(newNote));
            triggerAlert('success', 'Note created successfully!');

        } catch (error) {
            console.log({ error: error.message })
        }
    }

    // Deletes a note
    const deleteNote = async (id) => {

        try {
            await fetch(`${URL}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'auth-token': localStorage.getItem('authToken')
                }
            });

            triggerAlert('danger', 'Note deleted successfully!');
            getNotes();
        } catch (error) {
            console.log({error: error.message});
        }
    }

    // Edits a note
    const editNote = async (user_note) => {

        try {
            await fetch(`${URL}/api/notes/updatenote/${user_note._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('authToken')
                },
                body: JSON.stringify({ ...user_note })
            });

            triggerAlert('success', 'Note updated successfully!');


        } catch (error) {
            console.error(error.message)
        }

    }

    return (
        <NoteContext.Provider value={{
            theme, toggleTheme, notes, getNotes, fetchNote,
            setNotes, createNote, deleteNote, editNote, editNote_id, setEditNote_id, alert, setAlert, triggerAlert
        }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
