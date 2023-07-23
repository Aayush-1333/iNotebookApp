/*
    This is the note creation form where users can
    fill the details according to given conditions
    and they are saved in the database.
*/
import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NotesContext'

export default function CreateNoteForm() {

    // using variables and functions fron NoteContext.js
    const { theme, createNote, triggerAlert } = useContext(NoteContext);

    // state variable to control input box values
    const [inputVal, setInputVal] = useState({ title: '', description: '', tag: 'general' });

    // =================== CSS Styling =====================
    let style = {
        backgroundColor: theme.mode === 'light' ? 'beige' : '#540254',
        color: theme.mode === 'light' ? 'black' : 'white'
    }

    let inpBoxStyle = {
        backgroundColor: theme.mode === 'light' ? '#e5e5e5' : '#242222',
        color: theme.mode === 'light' ? 'black' : 'white'
    }

    // ====== function to submit the form ======
    const SubmitForm = async (e) => {
        e.preventDefault();

        if(inputVal.title.length < 3) {
            triggerAlert('warning', 'Title length should be at least 3 characters');
            return;
        }

        else if(inputVal.description.length === 0) {
            triggerAlert('warning', 'Description should not be empty!');
            return;
        }

        await createNote({ ...inputVal });

        // set all input box values to empty string
        setInputVal({ ...inputVal, title: '', description: '', tag: 'general' })
    }

    // ====== function to clear all the notes =====
    const ClearNote = (e) => {
        e.preventDefault();
        // set all inputVals to empty string
        setInputVal({ ...inputVal, title: '', description: '', tag: 'general' })
    }

    const onChange = (e) => {
        setInputVal({ ...inputVal, [e.target.id]: e.target.value })
    }

    return (
        <div>
            <h1 style={{ color: style.color, marginLeft: '170px' }}>Create a Note</h1>
            <div className='fbox justify-content-center'>
                <div style={{ flexGrow: '0.7' }}>
                    <form className='note-form' style={style} onSubmit={SubmitForm}>

                        <label htmlFor="note-title"><h1>Title</h1></label>
                        <br />
                        <input id='title' className='form-input' type="text" style={{
                            ...inpBoxStyle
                        }} value={inputVal.title} onChange={onChange} required />

                        <label htmlFor="note-desc"><h1>Description</h1></label>
                        <br />
                        <textarea style={inpBoxStyle} id='description' className='form-input' name="note-desc" cols="100" rows="20" value={inputVal.description} onChange={onChange}></textarea>

                        <label htmlFor="note-tag"><h1>Tags</h1></label>
                        <br />
                        <input style={inpBoxStyle} id='tag' className='form-input' type="text" value={inputVal.tag} onChange={onChange} required />

                        <div className='fbox justify-content-around' style={{ margin: '10px' }}>
                            <div><button style={{
                                background:
                                    theme.mode === 'dark' ? 'linear-gradient(145deg, rgb(161, 161, 161), rgb(44, 43, 43))' :
                                        'linear-gradient(145deg, green, lightgreen)'
                            }} type='submit' className='note-box-btn'>Save Note</button></div>
                            <div><button style={{
                                background:
                                    theme.mode === 'dark' ? 'linear-gradient(145deg, rgb(161, 161, 161), rgb(44, 43, 43))' :
                                        'linear-gradient(145deg, green, lightgreen)'
                            }} className='note-box-btn' onClick={ClearNote}>Clear Note</button></div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}
