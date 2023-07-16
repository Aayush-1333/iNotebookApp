import React, { useState } from 'react'

export default function NoteForm(props) {
    let noteformStyle = {
        backgroundColor: props.mode === 'light' ? 'beige' : '#4a2449',
        color: props.mode === 'light' ? 'black' : 'white',
        border: props.mode === 'light' ? '2px solid lightgreen' : '2px solid purple'
    }

    let submitBtnStyle = {
        backgroundColor: props.mode === 'light' ? 'lightgreen' : 'purple',
        color: props.mode === 'light' ? 'black' : 'white'
    }

    let inpBoxStyle = {
        backgroundColor: props.mode === 'light' ? '#dbdbdb' : '#202020',
        color: props.mode === 'light' ? 'black' : 'white'
    }

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tag, setTag] = useState('')
    const [error, setError] = useState(null)

    const SubmitForm = async (event) => {
        event.preventDefault()
        const note = {title, description, tag}
        console.log(note)
        console.log(JSON.stringify(note))

        const response = await fetch('/api/notes', {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const jsonData = await response.json()

        if(!response.ok) {
            setError(jsonData.error)
        }

        else if(response.ok) {
            setError(null)
            setTitle('')
            setDescription('')
            setTag('')

            console.log("Newe note added!", jsonData)
        }
    }

    const ResetForm = () => {
        setTitle('')
        setDescription('')
        setTag('')
    }

  return (
    <div className='container note-form-body'>
      <form className='note-form' style={noteformStyle} onSubmit={SubmitForm}>

        <div>
            <h1>iNotebook - Create a Note</h1>
            <br />

            <h3 className='form-label'>Note Title</h3>
            <input className='form-input' type="text" onChange={(event) => {setTitle(event.target.value)}} value={title} style={inpBoxStyle} />        

            <h3 className='form-label'>Note Description</h3>
            <textarea className='form-input' type="text" rows={20} cols={65} onChange={(event) => {setDescription(event.target.value)}} value={description} style={inpBoxStyle}></textarea>

            <h3 className='form-label'>Note Tag</h3>
            <input className='form-input' type="text" onChange={(event) => {setTag(event.target.value)}} value={tag} style={inpBoxStyle} />
 
            <div className='btn-holder'>
                <button className='submit-btn' type='submit' style={submitBtnStyle}>Save Note</button>
                <button className='submit-btn' type='reset' style={submitBtnStyle} onClick={ResetForm}>Clear Note</button>
            </div>
                {error && <div>{error}</div>}
        </div>
 
      </form>
    </div>
  )
}
