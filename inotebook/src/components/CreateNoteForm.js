import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NotesContext'

export default function CreateNoteForm() {

    // using variables and funxctions fron NoteContext.js
    const { theme, createNote } = useContext(NoteContext);

    // state variable to control input box values
    const [inputVal, setInputVal] = useState({ title: '', description: '', tag: '' });

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
        await createNote({ ...inputVal });

        // set all input box values to empty string
        document.getElementById('title').value = ''
        document.getElementById('description').value = ''
        document.getElementById('tag').value = ''
    }

    // ====== function to clear all the notes =====
    const ClearNote = (e) => {
        e.preventDefault();

        // set all inputVals to empty string
        setInputVal({
            title: '',
            description: '',
            tag: ''
        })

        // set all input box values to empty string
        document.getElementById('title').value = ''
        document.getElementById('description').value = ''
        document.getElementById('tag').value = ''
    }

    const onChange = (e) => {
        setInputVal({ ...inputVal, [e.target.id]: e.target.value })
    }

    return (
        <div className='fbox justify-content-center'>
            <div style={{ flexGrow: '0.7' }}>
                <form className='note-form' style={style}>

                    <label htmlFor="note-title"><h1>Title</h1></label>
                    <br />
                    <input id='title' className='form-input' type="text" style={{
                        width: '550px',
                        ...inpBoxStyle
                    }} onChange={onChange} />

                    <label htmlFor="note-desc"><h1>Description</h1></label>
                    <br />
                    <textarea style={inpBoxStyle} id='description' className='form-input' name="note-desc" cols="50" rows="10" onChange={onChange}></textarea>

                    <label htmlFor="note-tag"><h1>Tags</h1></label>
                    <br />
                    <input style={inpBoxStyle} id='tag' className='form-input' type="text" onChange={onChange} />

                    <div className='fbox justify-content-around' style={{ margin: '10px' }}>
                        <div><button style={{
                            background:
                                theme.mode === 'dark' ? 'linear-gradient(145deg, rgb(161, 161, 161), rgb(44, 43, 43))' :
                                    'linear-gradient(145deg, green, lightgreen)'
                        }} type='submit' className='note-box-btn' onClick={SubmitForm}>Save Note</button></div>
                        <div><button style={{
                            background:
                                theme.mode === 'dark' ? 'linear-gradient(145deg, rgb(161, 161, 161), rgb(44, 43, 43))' :
                                    'linear-gradient(145deg, green, lightgreen)'
                        }} className='note-box-btn' onClick={ClearNote}>Clear Note</button></div>
                    </div>

                </form>

            </div>
        </div>
    )
}
