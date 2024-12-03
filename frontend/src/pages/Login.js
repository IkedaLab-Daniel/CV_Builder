import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Toaster } from "react-hot-toast"
import { Link } from 'react-router-dom'

// imgs
import userSVG from '../assets/user.svg'
import key from '../assets/key.svg'
import eyeClose from '../assets/eye-close.svg'
import eyeOpen from '../assets/eye-open.svg'

const Login = () => {
    const {login, isLoading, error} = useLogin()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showpassword, setShowpassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)        
    }

    const handleShowpass = () => {
        if (showpassword === false){
            setShowpassword(true)
        } else{
            setShowpassword(false)

        }
    }

    return(
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log In</h3>
            <label>
                <img src={userSVG} alt="user" className="input-icon" />
                Email:
            </label>
            <input 
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />
            <label>
                <img src={key} alt="key" className="input-icon" />
                Password:
            </label>
            <input 
            type={showpassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
            <div className="showpass-container">
                {showpassword ? (
                    <img className='showpass input-icon' src={eyeOpen} alt='close' onClick={handleShowpass} />
                ) : (
                    <img className='showpass input-icon' src={eyeClose} alt='open' onClick={handleShowpass} />
                )}
                <span className="showpass" onClick={handleShowpass}>{showpassword ? '| Hide' : '| Show'}</span>
            </div>

            <button disabled={isLoading}>Log In</button>

            <div className="director-container">
                <Link to="/signup" className="link-to-other-form">
                    <span>Don't have an account? Sign Up</span>
                </Link>
            </div>
            
            {error && <div className="error">{error}</div>}
            <Toaster position="bottom-right" />
        </form>
    )
}

export default Login