import { useState } from "react";
import NoteContext from "./NotesContext";

const NoteState = (props) => {

    const URL = 'http://localhost:4000';

    const initial_notes = []

    const [notes, setNotes] = useState(initial_notes)

    const [theme, setTheme] = useState({
        mode: 'light',
        backgroundColor: '#a39e9e',
        color: 'black',
        btnName: String.fromCharCode(9789) + ' Dark Mode',
        background: 'linear-gradient(145deg, green, lightgreen)',
        border: '2px solid black'
    })


    const getNotes = async () => {
        const response = await fetch(`${URL}/api/notes/fetchallnotes`, {
            method: 'get',
            headers: {
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNGRjY2Q0NmUxNzMyMDNlMjc4NGI4In0sImlhdCI6MTY4OTU3NDg0NX0.YQUlGiVqsbFMOd021XVrJ3NLeTavw3t9zIjYCVGzELg'
            }
        })

        const fetched_notes = await response.json()
        setNotes(fetched_notes)
    }

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

    // Adiing a note
    const createNote = async (user_note) => {
        try {
            const response = await fetch(`${URL}/api/notes/createnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNGRjY2Q0NmUxNzMyMDNlMjc4NGI4In0sImlhdCI6MTY4OTg0ODk1OX0.U3UFBwDA7dtLpxkbLQKPrrsb--SOjF_vp21Ev194ckM', 
                },
                'body': JSON.stringify(user_note)
            });


            const newNote = await response.json();
            setNotes(notes.concat(newNote));

        } catch (error) {
            console.log({ error: error.message })
        }
    }

    // Deletes a note
    const deleteNote = async (id) => {
        await fetch(`${URL}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNGRjY2Q0NmUxNzMyMDNlMjc4NGI4In0sImlhdCI6MTY4OTU3NDg0NX0.YQUlGiVqsbFMOd021XVrJ3NLeTavw3t9zIjYCVGzELg'
            }
        });
        getNotes();
    }

    // Edits a note
    const editNote = (id) => {
        console.log("Editing Note")
    }

    return (
        <NoteContext.Provider value={{ theme, toggleTheme, notes, getNotes, setNotes, createNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
