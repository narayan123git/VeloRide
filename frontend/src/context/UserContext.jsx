import axios from 'axios'
import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
export const UserDataContext = createContext()

const UserContext = ({ children }) => {

    const [user, setUser] = useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        },
    })

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => {
                setUser(res.data.user)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [])

    return (
        <div>
            <UserDataContext.Provider value={{user, setUser}}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext