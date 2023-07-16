import React, { useEffect, useState } from 'react'
import NotesDetails from '../components/NotesDetails'

export default function Home(props) {

  const [notes, setNotes] = useState(null)

  let homeBodyStyle = {
    backgroundColor: props.mode === 'light' ? 'white' : '#373434',
    color: props.mode === 'light' ? 'black' : 'white',
  } 

  // useEffect will fire only once when the component gets mounted re-rendering the page
  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch('/api/notes')
      const jsonData = await response.json()

      if(response.ok)
        setNotes(jsonData)
    }
    fetchNotes()
  }, [])


  return (
    <div style={homeBodyStyle}>
      <p className='title-bar'>My Notes</p>
      <div className='notes-container'>
        {notes && notes.map((element) => {
            return <NotesDetails key={element._id} tag={element.tag} noteid={element._id} note={element} mode={props.mode} />
          })}
      </div>
    </div>
  )
}
