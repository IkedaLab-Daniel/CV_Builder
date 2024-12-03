import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useResumesContext } from '../hooks/useResumeContext';
import deleteSVG from '../assets/delete.svg';
import { useAuthContext } from '../hooks/useAuthContext';

// imgs
import noFile from '../assets/no-file.png';
import doc from '../assets/doc.svg'
import pdf from '../assets/pdf.svg'
import ppt from '../assets/ppt.svg'
import downloadSVG from '../assets/download.svg'

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

    // download file
const handleDownload = async (id) => {
        if (!user) {
            console.log('Cannot download if no user is logged in');
            return;
        }

        try {
            // Find the resume by ID
            const resume = resumes.find((resume) => resume._id === id);
            if (!resume) {
                console.error('Resume not found');
                return;
            }

            const filename = resume.image; // Assuming `image` holds the filename
            const response = await fetch(`api/resumes/download/${filename}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to download file');
            }

            // Convert the response to a blob
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Create a temporary link to download the file
            const a = document.createElement('a');
            a.href = url;
            a.download = filename; // Set the filename
            document.body.appendChild(a);
            a.click(); // Trigger the download
            a.remove(); // Clean up the element

            // Optionally, revoke the object URL after some delay
            setTimeout(() => window.URL.revokeObjectURL(url), 1000);
        } catch (error) {
            console.error('Error downloading file:', error);
            toast.error('Failed to download file');
        }
};


    // Helper function to extract file extension
    const getFileExtension = (filename) => {
        return filename.split('.').pop().toLowerCase();
    };

    return (
        <div>
            <h1>My Files:</h1>

            {/* Render all files in reverse order */}
            <div className="resume-container">
                {reversedResumes.length > 0 ? (
                    reversedResumes.map((resume, index) => {
                        const fileExtension = getFileExtension(resume.image);

                        return (
                            <div className="resume-wrapper" key={index}>
                                {fileExtension.match(/(jpg|jpeg|png|gif|bmp|webp|svg)$/) ? (
                                    <div className='resume-image-container'>
                                        <div className='btn-container-photos'>
                                            <div className='another'>
                                                <img
                                                    src={downloadSVG}
                                                    alt='download'
                                                    className="delete-svg"
                                                    onClick={() => handleDownload(resume._id)}
                                                />
                                                <img
                                                        src={deleteSVG}
                                                        alt="delete"
                                                        className="delete-svg"
                                                        onClick={() => handleClick(resume._id)}
                                                />  
                                            </div>
                                           
                                        </div>
                                        <img
                                            src={`http://localhost:4000/images/${resume.image}`}
                                            alt={`resume-${index}`}
                                            className="resume-image"
                                        />
                                    </div>
                                    
                                    
                                ) : (   
                                    <div className={`file-preview file-${fileExtension}`}>
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

                                        <div className='file-btns'>
                                            <img
                                                src={downloadSVG}
                                                alt='download'
                                                className="download-svg"
                                                onClick={() => handleDownload(resume._id)}
                                            />
                                            <img
                                                src={deleteSVG}
                                                alt="delete"
                                                className="delete-svg"
                                                onClick={() => handleClick(resume._id)}
                                            />
                                        </div>
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
        </div>
    );
};

export default Resumes;
