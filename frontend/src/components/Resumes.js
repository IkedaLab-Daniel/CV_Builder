import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useResumesContext } from '../hooks/useResumeContext';
import deleteSVG from '../assets/delete.svg';
import { useAuthContext } from '../hooks/useAuthContext';

// imgs
import noFile from '../assets/no-file.png';
import doc from '../assets/doc.svg'
import pdf from '../assets/pdf.svg'
import ppt from '../assets/ppt.svg'
const Resumes = () => {
    const { resumes, dispatch } = useResumesContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchResumes = () => {
            fetch('/api/resumes/getResumes', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // Parse the JSON from the response
                })
                .then((data) => {
                    console.log(data); // Optionally log the response to verify the structure
                    dispatch({ type: 'SET_RESUMES', payload: data });
                })
                .catch((err) => console.log(err)); // Handle errors
        };

        if (user) {
            fetchResumes();
        }
    }, [dispatch, user]);

    const reversedResumes = [...resumes].reverse();

    const handleClick = async (id) => {
        if (!user) {
            console.log('Cannot delete if no user logged in');
            return;
        }
        const response = await fetch('/api/resumes/delete/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_RESUME', payload: json });
            toast.success('File Deleted', {
                duration: 4000, // 4 seconds
            });
        }
    };

    // Helper function to extract file extension
    const getFileExtension = (filename) => {
        return filename.split('.').pop().toLowerCase();
    };

    return (
        <div>
            <h1>My Resumes</h1>

            {/* Render all files in reverse order */}
            <div className="resume-container">
                {reversedResumes.length > 0 ? (
                    reversedResumes.map((resume, index) => {
                        const fileExtension = getFileExtension(resume.image);

                        return (
                            <div className="resume-wrapper" key={index}>
                                <img
                                    src={deleteSVG}
                                    alt="delete"
                                    className="delete-svg"
                                    onClick={() => handleClick(resume._id)}
                                />
                                {fileExtension.match(/(jpg|jpeg|png|gif|bmp|webp)$/) ? (
                                    <img
                                        src={`http://localhost:4000/images/${resume.image}`}
                                        alt={`resume-${index}`}
                                        className="resume-image"
                                    />
                                ) : (
                                    <div className={`file-preview file-${fileExtension}`}>
                                        {/* <span className={`file-icon file-icon-${fileExtension}`}>
                                            {fileExtension === 'pdf' && '📄 PDF'}
                                            {fileExtension === 'doc' || fileExtension === 'docx' ? '📄 DOC' : ''}
                                            {fileExtension === 'ppt' || fileExtension === 'pptx' ? '📊 PPT' : ''}
                                        </span> */}
                                        {fileExtension === 'pdf' && (
                                            <img className={`file-icon file-icon-${fileExtension}`}
                                                src={pdf}
                                                alt={fileExtension}
                                            />
                                        )}
                                        {fileExtension === 'doc' && (
                                            <img className={`file-icon file-icon-${fileExtension}`}
                                                src={doc}
                                                alt={fileExtension}
                                            />
                                        )}
                                        {fileExtension === 'docx' && (
                                            <img className={`file-icon file-icon-${fileExtension}`}
                                                src={doc}
                                                alt={fileExtension}
                                            />
                                        )}
                                        {fileExtension === 'ppt' && (
                                            <img className={`file-icon file-icon-${fileExtension}`}
                                                src={ppt}
                                                alt={fileExtension}
                                            />
                                        )}
                                        {fileExtension === 'pptx' && (
                                            <img className={`file-icon file-icon-${fileExtension}`}
                                                src={ppt}
                                                alt={fileExtension}
                                            />
                                        )}
                                        
                                        <span className="file-name">{resume.image}</span>
                                    </div>  
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="no-file">
                        <img src={noFile} alt="no-file" />
                        <p>No file found</p>
                    </div>
                )}
            </div>
            <Toaster position="bottom-right" />
        </div>
    );
};

export default Resumes;
