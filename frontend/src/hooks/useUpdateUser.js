import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import toast from "react-hot-toast";

export const useUpdateUser = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [usernameTaken, setUsernameTaken] = useState(false)
    const { dispatch } = useAuthContext();

    const updateUser = async (userId, updatedData, token) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/user/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData),
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setIsLoading(false);
            toast.error(json.error, {
                duration: 4000,
            });

            if (json.error === "Username already taken"){
                setUsernameTaken(true);
            }
            setError(true)
            return
        }

        if (response.ok) {
            // Update local storage with the new user data
            const updatedUser = { ...JSON.parse(localStorage.getItem('user')), userData: json };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            // Update auth context
            dispatch({ type: 'LOGIN', payload: updatedUser });

            setIsLoading(false);
            setError(false)
            setUsernameTaken(false)
            toast.success('User updated successfully', {
                duration: 4000,
            });
            return ('Success')
        }
    };

    return { updateUser, isLoading, error, setUsernameTaken, usernameTaken };
};
