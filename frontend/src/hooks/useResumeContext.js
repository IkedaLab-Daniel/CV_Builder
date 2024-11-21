import { ResumeContext } from "../context/ResumeContext";
import { useContext } from "react";

export const useResumesContext = () => {
    const context = useContext(ResumeContext)

    if (!context){
        throw Error('useResumesContext is used inside the provider only')
    }

    return context
}