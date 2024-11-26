import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useResumesContext } from '../hooks/useResumeContext';
import { useAuthContext } from '../hooks/useAuthContext';

// imgs
import pdf from '../assets/pdf.svg'
import doc from '../assets/doc.svg'
import ppt from '../assets/ppt.svg'
import imgIcon from '../assets/image-icon.svg'
import question from '../assets/question.svg'

const ResumeForm = () => {
    const { user } = useAuthContext()
    const {dispatch} = useResumesContext()
    const [file, setFile] = useState();
    const [toggleDisable, setToggleDisable] = useState({
        background: 'rgb(66, 66, 66)', cursor: 'not-allowed', opacity: '0.3'
    });
    const [show, setShow ] = useState(false)
    const [height, setHeight] = useState({height: "auto"})

    
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

    const changeHeight = () => {
        if (show === false){
            setShow(true)
        } else{
            setShow(false)
        }

        if (show === false){
            setHeight(prev => ({
                ...prev,
                height: "0px"
            }))
        } else{
            setHeight(prev => ({
                ...prev,
                height: "auto"
            }))
        }
        
    }
    return(
        <div className="resumeForm">
            <h1>Upload File</h1>
            <div className='small-icons-container'>
                <div className='small-icons'>
                    <img 
                        src={pdf}
                        alt='pdf'
                    />
                    <img 
                        src={doc}
                        alt='doc'
                    />
                    <img 
                        src={ppt}
                        alt='ppt'
                    />
                    <img 
                        src={imgIcon}
                        alt='image'
                    />
                </div>
                
                <img 
                    src={question}
                    alt='question'
                    className='question'
                    onClick={changeHeight}
                />
            </div>

            <div className='message-container' style={height}>
                <span>Can Upload:</span><br/>
                <ul>
                    <li>Image</li>
                    <li>PDF</li>
                    <li>DOC</li>
                    <li>docx</li>
                    <li>PPT</li>
                    <li>PPTx</li>
                </ul>
            </div>
            <input 
                type="file" 
                onChange={e => setFile(e.target.files[0])} 
                required
                ref={fileInputRef}  // Attach ref here
                accept="image/*,.pdf,.doc,.docx,.ppt,.pptx"/>
            <button style={toggleDisable} className='green-btn' onClick={handleUpload}>Upload</button>
        </div>
    )
}

export default ResumeForm;
