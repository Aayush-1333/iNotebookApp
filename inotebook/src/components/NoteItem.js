import React, { useContext } from 'react'
import NoteContext from '../context/notes/NotesContext'
import { Link } from 'react-router-dom'

export default function NoteItem(props) {

    const { theme, deleteNote, setEditNote_id } = useContext(NoteContext)
    const { id, style, title, description, tag } = props

    const handleDelete = () => {
        deleteNote(id);
    }

    const handleEdit = () => {
        setEditNote_id(id)
    }

    let btnStyle = {
        background: theme.background,
        color: theme.color
    }

    return (
        <div className='note-box notes' style={style}>

            <div className='fbox justify-content-around'>

                <button className='note-box-btn'
                    style={btnStyle} type='button' onClick={handleDelete}> <h3> &#128465; delete </h3></button>

                <Link to='/editnote'><button className='note-box-btn'
                    style={btnStyle} type='button' onClick={handleEdit}> <h3> &#128394; edit </h3></button>
                </Link>
            </div>

            <h1>{title.substring(0, 11)}...</h1>
            <hr />
            <br />
            <h3 >{description.substring(0, 20)}...</h3>
            <br />
            <span className='note-tag'>{tag}</span>
        </div>
    )
}
