import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NotesContext'

export default function EditNote() {

    // Using state variables and functions from NoteContext.js
    const { theme, editNote_id, fetchNote, editNote } = useContext(NoteContext)

    // using state variable
    const [noteData, setNoteData] = useState(fetchNote(editNote_id)[0])

    // Updates the values in input forms on an event (typing in the values..)
    const onChange = (e) => {
        // spread syntax takes noteData and updates the fields based on input data
        setNoteData({ ...noteData, [e.target.name]: e.target.value });
    }

    // Clears the form data
    const ClearNote = () => {
        setNoteData({ ...noteData, title: '', description: '', tag: 'general' })
    }

    const SubmitForm = (e) => {
        e.preventDefault();
        editNote({ ...noteData });
    }

    // ============== CSS styling =============
    let style = {
        backgroundColor: theme.mode === 'light' ? 'beige' : '#540254',
        color: theme.mode === 'light' ? 'black' : 'white'
    }

    let inpBoxStyle = {
        backgroundColor: theme.mode === 'light' ? '#e5e5e5' : '#242222',
        color: theme.mode === 'light' ? 'black' : 'white',
        fontWeight: 'bold'
    }

    let btnStyle = {
        background: theme.background,
        color: 'white'
    }

    return (
        <div>
            <div className='fbox justify-content-center'>
                <form className='note-form' style={style} onSubmit={SubmitForm}>
                    <label htmlFor="title"><h2>Title</h2></label>
                    <input style={inpBoxStyle} id='title' name='title' className='form-input' type="text" value={noteData ? noteData.title : ''} onChange={onChange} />

                    <br />
                    <label htmlFor="desc"><h2>Description</h2></label>
                    <textarea style={inpBoxStyle} className='form-input' id='description' name="description" cols="150" rows="30"
                        value={noteData ? noteData.description : ''} onChange={onChange}></textarea>
                    <br />

                    <label htmlFor="tag"><h2>Tags</h2></label>
                    <input style={inpBoxStyle} name='tag' className='form-input' type="text" id='tag' value={noteData ? noteData.tag : ''} onChange={onChange} />

                    <div className='fbox justify-content-around'>
                        <button style={btnStyle} className='note-box-btn' type='submit'>Save Note</button>
                        <button style={btnStyle} className='note-box-btn' type='button' onClick={ClearNote}>Clear Note</button>
                    </div>
                </form>
            </div>

        </div>
    )
}
