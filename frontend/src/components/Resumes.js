import { useEffect, useState, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { useResumesContext } from '../hooks/useResumeContext';

const Resumes = () => {
    const { resumes, dispatch } = useResumesContext();
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);  // Ref to access the file input element

    const handleUpload = () => {
        if (!file) {
            return;  // If no file is selected, do nothing
        }

        const formData = new FormData();
        formData.append('file', file);

        fetch('/uploadResume', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Log the response to see if the upload was successful
            dispatch({ type: 'ADD_RESUME', payload: data });  // Update the context with the new resume
            setFile(null);  // Reset file state
            fileInputRef.current.value = '';  // Clear the input field
        })
        .catch(err => {
            console.error('Error uploading file:', err);
        });
    };

    useEffect(() => {
        fetch('/getResumes')
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
    }, [dispatch]);

    // Reverse the resumes array before rendering
    const reversedResumes = [...resumes].reverse();

    return (
        <div>
            <h1>My Resumes</h1>

            {/* Render all images in reverse order */}
            <div className='resume-container'>
                {reversedResumes.length > 0 ? (
                    reversedResumes.map((resume, index) => (
                        <div key={index}>
                            <img 
                                src={`http://localhost:4000/images/${resume.image}`} 
                                alt={`resume-${index}`} 
                                className='resume-image'
                            />
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
