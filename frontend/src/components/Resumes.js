import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useResumesContext } from '../hooks/useResumeContext';
import deleteSVG from '../assets/delete.svg'
import { useAuthContext } from '../hooks/useAuthContext'

const Resumes = () => {
    const { resumes, dispatch } = useResumesContext();
    const { user } = useAuthContext()
    useEffect(() => {

        const fetchResumes = () => {
            fetch('/api/resumes/getResumes',{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();  // Parse the JSON from the response
            })
            .then(data => {
                console.log(data); // Optionally log the response to verify the structure
                dispatch({ type: 'SET_RESUMES', payload: data });
                
            })
            .catch(err => console.log(err));  // Handle errors  
        }

        if (user){
            fetchResumes()
        }      
    }, [dispatch, user]);

    const reversedResumes = [...resumes].reverse();

    const handleClick = async (id) => {

        if (!user){
            console.log('Cant delete if no user logged in');
            return
        }
        const response = await fetch('/api/resumes/delete/'+id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (response.ok){
            dispatch({type: 'DELETE_RESUME', payload: json})            
        }
        
    }

    return (
        <div>
            <h1>My Resumes</h1>

            {/* Render all images in reverse order */}
            <div className='resume-container'>
                {reversedResumes.length > 0 ? (
                    reversedResumes.map((resume, index) => (
                        <div className='resume-wrapper' key={index}>
                            <img  
                                src={deleteSVG}
                                alt='delete'
                                className='delete-svg'
                                onClick={() => handleClick(resume._id)}
                            />
                            <img 
                                src={`http://localhost:4000/images/${resume.image}`} 
                                alt={`resume-${index}`} 
                                className='resume-image'
                            />
                            <span>{resume._id}</span>
                        </div>
                    ))
                ) : (
                    <p>No resumes found.</p>  // Message when no resumes are available
                )}
            </div>
            <Toaster position="bottom-right" />
        </div>
    );
};

export default Resumes;
