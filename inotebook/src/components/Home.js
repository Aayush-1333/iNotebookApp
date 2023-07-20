import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NotesContext'
import CreateNoteForm from './CreateNoteForm'
import NoteItem from './NoteItem'

export default function Home() {
  const { theme, notes, getNotes } = useContext(NoteContext)

  useEffect(() => {
    getNotes();
  }, [])

  let noteboxStyle = {
    backgroundColor: theme.backgroundColor,
    color: theme.color,
    border: theme.border
  }

  return (
    <div className='fbox-col'>
      <h1 style={{color: noteboxStyle.color}}>Create a Note</h1>
      <CreateNoteForm />
      <hr />
      <div>
        <h1 style={{textAlign: 'center', color: noteboxStyle.color}}>Your Notes</h1>
        <div className='fbox wrap justify-content-around'>
          {notes.map((element) => {
                return <NoteItem key={element._id} id={element._id} style={noteboxStyle} 
                title={element.title} description={element.description} tag={element.tag} />
          })}
        </div>
      </div>

    </div>
  )
}
