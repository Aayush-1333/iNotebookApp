/*
    This is the file where all user operations are handled 
    including, creation, login and fetching the user's details.

*/
import UserContext from '../users/UsersContext'
import { useState } from 'react';

const UserState = (props) => {

    const URL = 'http://127.0.0.1:4000';
    const [userData, setUserData] = useState(null);

    // ============= Functions ================
    // Handles user login
    const userLogin = async (creds) => {
        try {
            const response = await fetch(`${URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...creds })
            })

            const authToken = await response.json();
            if (authToken) {
                localStorage.setItem('authToken', authToken);
                getUser();
            }

        } catch (error) {
            console.log({ error: error.message });
        }
    }

    // Creates a new user and returns an authToken
    const createUser = async (creds) => {
        try {
            const response = await fetch(`${URL}/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...creds })
            })

            const authTokenData = await response.json();
            localStorage.setItem('authToken', authTokenData.authToken); // storing authToken in localStorage
        } catch (error) {
            console.log({ error: error.message });
        }
    }
    
    // Fetches user's details using the the provided authToken
    const getUser = async () => {
        try {
            const response = await fetch(`${URL}/api/auth/userdetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('authToken')
                }
            })

            const user = await response.json();

            if(user)
                setUserData({ name: user.name });
        } catch (error) {
            console.log({ error: error.message });
        }
    }

    return <UserContext.Provider value={{ userLogin, createUser, userData, setUserData, getUser }}>
        {props.children}
    </UserContext.Provider>
}

export default UserState
