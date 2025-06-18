import React, { createContext } from 'react'
import { useState } from 'react'
export const UserDataContext = createContext()

const userContext = ({ children }) => {

    const [user, setUser] = useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        }
    })
    const a='sjk'
    return (
        <div>
            <UserDataContext.Provider value={[user, setUser]}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default userContext