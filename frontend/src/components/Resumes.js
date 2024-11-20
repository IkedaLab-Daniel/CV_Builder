import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

const Resumes = () => {
    const [resumes, setResumes] = useState([]);  // Store all resumes in an array


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
                setResumes(data);  // Store the array of resume objects
            })
            .catch(err => console.log(err));  // Handle errors            
    }, []);

    return (
        <div>
            <h1>My Resumes</h1>

            {/* Render all images */}
            <div className='resume-container'>
                {resumes.length > 0 ? (
                    resumes.map((resume, index) => (
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
            <Toaster position="bottom-right"  />
        </div>
    );
}

export default Resumes;
