import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import NoteContext from '../context/notes/NotesContext'

export default function Sidebar(props) {

    const style = useContext(NoteContext)

    return (
        <div className='fbox-col sidebar' style={{
            backgroundColor: style.theme.backgroundColor,
            color: style.theme.color
        }}>
            <div className='close-btn'>
                <button className='cross' type='button' onClick={props.closenav}><h1>&#10006;</h1></button>
            </div>
            <h1>User Dashboard</h1>
            <hr />
            <br />
            <Link className='nav-link' to='/'><h2 className='my-10'>Home</h2></Link>
            <Link className='nav-link' to='/about'><h2 className='my-10'>About</h2></Link>
        </div>
    )
}
