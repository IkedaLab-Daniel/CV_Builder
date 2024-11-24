import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useResumesContext } from '../hooks/useResumeContext';
import { useAuthContext } from '../hooks/useAuthContext';

const ResumeForm = () => {
    const { user } = useAuthContext()
    const {dispatch} = useResumesContext()
    const [file, setFile] = useState();
    const [toggleDisable, setToggleDisable] = useState({
        background: 'rgb(66, 66, 66)', cursor: 'not-allowed', opacity: '0.3'
    });

    
    // Use a ref for the input element to reset it
    const fileInputRef = useRef(null);

    const handleUpload = (e) => {
        e.preventDefault()

        const formdata = new FormData();
        formdata.append('file', file);

        if (!user){
            console.log('error');
            return
        }

        fetch('/api/resumes/upload', {
            method: 'POST',
            body: formdata,
            headers: {
                'Authorization': `Bearer ${user.token}`
            }

        })
        .then(res => res.json())  // Assuming the server responds with JSON
        .then(data => {
            console.log(data);
            // Success toast
            toast.success('Upload successful!', {
                duration: 4000,  // 4 seconds
            });
            // Clear file state and input after successful upload
            setFile(null);
            fileInputRef.current.value = '';  // Clear the file input field
            dispatch({type:'CREATE_RESUME', payload: data})
        })  
        .catch(err => {
            console.log(err);
            toast.error('No file uploaded.', {
                duration: 4000,  // 4 seconds
            });
        });
    }

    useEffect(() => {
        if (file) {
            setToggleDisable(prev => ({
                ...prev,
                background: '#1aac83',
                cursor: 'pointer',
                opacity: '1'
            }));
        } else {
            setToggleDisable(prev => ({
                ...prev,
                background: 'rgb(66, 66, 66)',
                cursor: 'not-allowed',
                opacity: '0.3'
            }));
        }
    }, [file]);

    return(
        <div className="resumeForm">
            <h1>Upload IMG Resume</h1>
            <input 
                type="file" 
                onChange={e => setFile(e.target.files[0])} 
                required
                ref={fileInputRef}  // Attach ref here
                accept="image/*" 
            />
            <button style={toggleDisable} className='green-btn' onClick={handleUpload}>Upload</button>
        </div>
    )
}

export default ResumeForm;
