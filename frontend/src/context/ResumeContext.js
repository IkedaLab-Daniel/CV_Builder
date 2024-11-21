import { createContext, useReducer } from "react";

export const ResumeContext = createContext()

export const resumesReducer = (state, action) => {
    switch(action.type){
        case 'SET_RESUMES':
            return {
                resumes: action.payload
            }
        case 'CREATE_RESUME':
            return{
                resumes: [...state.resumes, action.payload]
            }
        default:
            return state
    }
}

export const ResumeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(resumesReducer, {
        resumes: []
    })
    return(
        <ResumeContext.Provider value={{...state, dispatch}}>
            { children }
        </ResumeContext.Provider>
    )
}