/*
  This is the Home Page of the webapp where all the user's notes
  will be displayed, It includes a create form for creating new notes
  an each note will be rendered here on the home page fetching from the 
  database via API call.
*/
import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NotesContext'
import CreateNoteForm from './CreateNoteForm'
import NoteItem from './NoteItem'
import { useNavigate } from 'react-router-dom'

export default function Home() {

  const { theme, notes, getNotes } = useContext(NoteContext)

  // This is to navigate the page programmatically
  const navigate = useNavigate();

  // React Hook
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (localStorage.getItem('authToken'))
      getNotes();
    else
      navigate('/login');
  }, []) 


  // for styling of notebox
  let noteboxStyle = {
    backgroundColor: theme.backgroundColor,
    color: theme.color,
    border: theme.border
  }

  return (
    <div className='fbox-col'>
      <CreateNoteForm />
      <hr />
      <div>
        <h1 style={{ textAlign: 'center', color: noteboxStyle.color, marginTop: '5px' }}>Your Notes</h1>
        <br />
        <div className='fbox wrap justify-content-around'>
          {notes.length === 0 ?
            <h3 style={{ color: noteboxStyle.color }}>No notes to display!</h3> :
            notes.map((element) => {
              return <NoteItem style={noteboxStyle} key={element._id} id={element._id} title={element.title}
                description={element.description} tag={element.tag} />
            })
          }
        </div>
      </div>
    </div>
  )
}
