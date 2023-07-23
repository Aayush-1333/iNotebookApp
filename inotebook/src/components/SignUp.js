import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NotesContext'
import UserContext from '../context/users/UsersContext';


export default function SignUp() {
    const { theme } = useContext(NoteContext);
    const { createUser } = useContext(UserContext);

    const [creds, setCreds] = useState({
        name: '',
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
        width: '350px'
    }

    let btnStyle = {
        background: theme.mode === 'dark' ? 'linear-gradient(145deg, rgb(161, 161, 161), rgb(44, 43, 43))' :
            'linear-gradient(145deg, green, lightgreen)',
        color: 'white'
    }

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }

    const SubmitForm = (e) => {
        e.preventDefault();
        createUser({ ...creds });
    }

    return (
        <div style={formContainerStyle} className='fbox justify-content-center'>
            <div style={{ backgroundColor: theme.mode === 'light' ? 'grey' : '#2c2a2a', 
            height: '100vh', borderRadius: '20px' }} className='fbox-col alignItems-center'>
                <br />
                <h1 style={{ fontSize: '40px', color: formStyle.color }}>Welcome! Create your account</h1>
                <hr style={{ color: formStyle.color, width: '50vw' }} />
                <br />
                <h1 style={{ color: formStyle.color }}>SignUp Portal</h1>
                <br />
                <div className='fbox justify-content-center'>
                    <form className='login-form' style={formStyle} onSubmit={SubmitForm} >
                        <label htmlFor="name"><h2>Name</h2></label>
                        <br />
                        <input style={inpBoxStyle} className='form-input' name='name' type="text"
                            value={creds.name} onChange={onChange} minLength={3} maxLength={50} required />
                        <br />

                        <label htmlFor="email"><h2>Email</h2></label>
                        <br />
                        <input style={inpBoxStyle} className='form-input' name='email' type="email"
                            value={creds.email} onChange={onChange} required />
                        <br />

                        <label htmlFor="password"><h2>Password</h2></label>
                        <br />
                        <input style={inpBoxStyle} className='form-input' name='password' type="password"
                            value={creds.password} onChange={onChange} minLength={8} required />
                        <br />
                        <br />

                        <div className='fbox justify-content-around'>
                            <button className='note-box-btn' type='submit' style={btnStyle}><strong>Create Account</strong></button>
                        </div>
                        <br />

                        <input type='checkbox' required />
                        <span><strong> By creating this account you agree to our terms and conditions!</strong></span>
                    </form>
                </div>
            </div>
        </div>
    )
}
