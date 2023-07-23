import React, { useContext } from 'react'
import NoteContext from '../context/notes/NotesContext'

export default function Alert() {

    const { alert } = useContext(NoteContext);

    return (
        <div style={{ visibility: alert.visibility }} className={`alert-${alert.status}`}><h3>{alert.msg}</h3></div>
    )
}
