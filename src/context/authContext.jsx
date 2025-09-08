import React, {useContext,createContext, useEffect, useState} from 'react'
import axios from 'axios';

const userContext = createContext()

const AuthProvider =({children}) =>{
    const [user,setUser] =useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const verifyUser = async () => {
           
        try{
             const token = localStorage.getItem('token')
              const storedUser = localStorage.getItem('user');

             if (storedUser) {
            setUser(JSON.parse(storedUser));
            }

                if(token) {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
            headers : {
                "Authorization" : `Bearer ${token}` 
            }
        })
        if(response.data.success){
            setUser(response.data.user)
        }
      } else {
        setUser(null)
      }
        } catch(error){
            if(error.response && !error.response.data.error){
                setUser(null)
            }
        } finally {
            setLoading(false)
        }

    }
    verifyUser()
},[])
    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
    }
    return (
        <userContext.Provider value={{user,login,logout,loading}}>
            {children}
        </userContext.Provider>
    )
}
export const useAuth = () => useContext(userContext);
export default AuthProvider
