import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NotesContext'
import UserContext from '../context/users/UsersContext';
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

    const { theme, triggerAlert } = useContext(NoteContext);
    const { userLogin } = useContext(UserContext);
    const navigate = useNavigate();

    const [creds, setCreds] = useState({
        email: '',
        password: ''
    });


    let formContainerStyle = {
        borderRadius: '10px',
        height: '100vh',
        padding: '10px'
    }

    let formStyle = {
        backgroundColor: theme.mode === 'light' ? 'beige' : 'purple',
        color: theme.mode === 'light' ? 'black' : 'white',
    }

    let inpBoxStyle = {
        backgroundColor: theme.mode === 'light' ? '#e5e5e5' : '#242222',
        color: theme.mode === 'light' ? 'black' : 'white',
        width: '250px'
    }

    let btnStyle = {
        background: theme.mode === 'dark' ? 'linear-gradient(145deg, rgb(161, 161, 161), rgb(44, 43, 43))' :
            'linear-gradient(145deg, green, lightgreen)',
        color: 'white'
    }

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }

    const SubmitForm = async (e) => {
        e.preventDefault();
        await userLogin({ ...creds });
        triggerAlert('success', 'Logged in successfully!');

        if (localStorage.getItem('authToken')) {
            navigate('/');
        }
    }

    return (
        <div style={formContainerStyle} className='fbox justify-content-center'>
            <div style={{ backgroundColor: theme.mode === 'light' ? 'grey' : '#2c2a2a', borderRadius: '20px' }} className='fbox-col alignItems-center'>
                <br />
                <h1 style={{ fontSize: '40px', color: formStyle.color }}>Welcome Back! Please Login</h1>
                <hr style={{ color: formStyle.color, width: '50vw' }} />
                <br />
                <h1 style={{ color: formStyle.color }}>Login</h1>
                <br />
                <div className='fbox justify-content-center'>
                    <form className='login-form' style={formStyle} onSubmit={SubmitForm} >
                        <label htmlFor="email"><h2>Email</h2></label>
                        <br />
                        <input style={inpBoxStyle} className='form-input' name='email' type="email"
                            value={creds.email} onChange={onChange} required />
                        <br />
                        <br />
                        <label htmlFor="password"><h2>Password</h2></label>
                        <br />
                        <input style={inpBoxStyle} className='form-input' name='password' type="password"
                            value={creds.password} onChange={onChange} required />
                        <br />
                        <br />
                        <div className='fbox justify-content-around'>
                            <button className='note-box-btn' type='submit' style={btnStyle}><strong>Login</strong></button>
                        </div>
                        <br />
                        <h4>Don't have an account?<Link className='signup-link' style={{ color: formStyle.color }} to='/signup'> Sign Up</Link></h4>
                    </form>
                </div>
            </div>
        </div>
    )
}
