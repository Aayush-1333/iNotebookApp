/*
    This is the sidebar component of the web app
    It displays all the Links to other components including,
    Login. Logout, About Page and name of the user
*/
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NoteContext from '../context/notes/NotesContext'
import UserContext from '../context/users/UsersContext'

export default function Sidebar(props) {

    // Using state variables and functions from the NoteContext.js and UserContext.js
    const { theme, triggerAlert } = useContext(NoteContext)
    const { userData, setUserData, getUser } = useContext(UserContext)

    // clears the localStorage containing the authToken
    const ClearUserData = () => {
        localStorage.clear();
        setUserData(null);
        triggerAlert('danger', 'Logged out successfully');
    }

    // works like componentDidUpdate() method - React Hook
    useEffect(() => {
        if(localStorage.getItem('authToken'))
            getUser();
    }, [])

    return (
        <div className='fbox-col sidebar' style={{
            backgroundColor: theme.backgroundColor,
            color: theme.color
        }}>
            <div className='close-btn'>
                <button className='cross' type='button' onClick={props.sidebarclose}><h1>&#10006;</h1></button>
            </div>
            <h1>User Dashboard</h1>
            <hr />
            <br />
            {userData && <h3>User: {userData.name}</h3>}
            <br />
            {userData && <Link className='nav-link' to='/'><h2 className='my-10'>Home</h2></Link>}
            {userData ? <Link className='nav-link' onClick={ClearUserData} to='/login'><h2 className='my-10'>Logout</h2></Link>
             : <Link className='nav-link' to='/login'><h2 className='my-10'>Login</h2></Link>}
            <Link className='nav-link' to='/about'><h2 className='my-10'>About</h2></Link>
        </div>
    )
}
