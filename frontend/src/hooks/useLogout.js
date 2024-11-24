import { useAuthContext } from "./useAuthContext"
import { useResumesContext } from "./useResumeContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: resumeDispatch } = useResumesContext()
    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatc logout action
        dispatch({type: 'LOGOUT'})
        resumeDispatch({type: 'SET_RESUMES', payload: []})
    }

    return {logout}
}