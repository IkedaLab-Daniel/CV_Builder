import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import toast from "react-hot-toast";
export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch} = useAuthContext() 

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok){
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth contect
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
            toast.success('Login Successful', {
                duration: 4000,  // 4 seconds
              });
        }
    }

    return { login, isLoading, error }
}