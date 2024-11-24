import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import toast from "react-hot-toast";

export const useUpdateUser = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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
            setError(json.error || 'Failed to update user');
            setIsLoading(false);
            toast.error('Failed to update user', {
                duration: 4000,
            });
            return;
        }

        if (response.ok) {
            // Update local storage with the new user data
            const updatedUser = { ...JSON.parse(localStorage.getItem('user')), userData: json };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            // Update auth context
            dispatch({ type: 'LOGIN', payload: updatedUser });

            setIsLoading(false);
            toast.success('User updated successfully', {
                duration: 4000,
            });
        }
    };

    return { updateUser, isLoading, error };
};
