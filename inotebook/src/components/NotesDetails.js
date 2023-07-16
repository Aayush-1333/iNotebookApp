import React, { useState } from 'react'

export default function NotesDetails(props) {

  let noteboxStyle = {
    backgroundColor: props.mode === 'light' ? '#b1ebb6' : '#242424',
    border: props.mode === 'light' ? '2px solid black' : '2px solid purple'
  }

  let viewBtnStyle = {
    backgroundImage: props.mode === 'light' ? 'linear-gradient(to right, rgb(113 183 111), green)' : 'linear-gradient(to right, rgb(177 96 197), purple)'
  }

  const [error, setError] = useState(null)
  const [noteboxid, setNoteboxid] = useState(props.noteid)

  const DeleteNote = async () => {
    const response = await fetch(`/api/notes/${props.noteid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const jsonData = await response.json()

    if(!response.ok) {
      setError({error: jsonData.error})
    }

    else {
      setError(null)
      console.log("Note deleted!")
      setNoteboxid(null)
    }
  }

  return (
    noteboxid && <div className='notebox' style={noteboxStyle}>
      <div className='top-content-bar'>
        <h2>{props.note.title} </h2>
        <span className='title-tag'>{props.tag}</span>
      </div>
      <hr />
      <br />
      <p><strong>{props.note.description.substring(0, 20)}...</strong></p>
      <br />
      <p>Date: <em>{props.note.date.substring(0, 10)}</em></p>

      {/* buttons */}
      <div className='btn-holder'>
        <button className='view-btn' style={viewBtnStyle}>View Note</button>
        <button className='view-btn' style={viewBtnStyle} onClick={DeleteNote}>Delete Note</button>
        {error && <p> { error } </p>}
      </div>
    </div>
  )
}
