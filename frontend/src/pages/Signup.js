import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Toaster } from "react-hot-toast"
import { Link } from "react-router-dom"

// imgs
// imgs
import eyeClose from '../assets/eye-close.svg'
import eyeOpen from '../assets/eye-open.svg'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [suffix, setSuffix] = useState('')
    const [username, setUsername] = useState('')
    const [dateofbirth, setDateofbirth] = useState('')
    const {signup, error, isloading, setError} = useSignup('')
    const [showpassword, setShowpassword] = useState(false)

    const handleShowpass = () => {
        if (showpassword === false){
            setShowpassword(true)
        } else{
            setShowpassword(false)

        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword){
            return setError('Confirm password does not match.')
        }

        if (username.length > 12){
            return setError('Username must not exceed to 12 characters')
        }

        if (username.includes(" ")){
            return setError('Username must not have white space')
        }

        await signup(email, password, firstName, middleName, lastName, suffix, username, dateofbirth)
    }

    return(
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <div className="dual-input">
                <label>First Name:</label>
                <input 
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                placeholder="first name"
                />
                <label>Middle Name:</label>
                <input 
                type="text"
                onChange={(e) => setMiddleName(e.target.value)}
                value={middleName}
                placeholder="middle name"
                />
            </div>
            
            <div className="dual-input">
                <label>Last Name:</label>
                <input 
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                placeholder="last name"
                />

                <label>Suffix:</label>
                <input 
                type="text"
                onChange={(e) => setSuffix(e.target.value)}
                value={suffix}
                placeholder="(optional)"
                />
            </div>
            

             <label>Username:</label>
            <input 
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="(maximum of 12 characters, no white-space)"
            />

            <label>Password:</label>
            <input 
            type={showpassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Must be atleast 8 characters, include one uppercase, lowercase, number, and symbol"
            />
            <div className="showpass-container">
                {showpassword ? (
                    <img className='showpass input-icon' src={eyeOpen} alt='close' onClick={handleShowpass} />
                ) : (
                    <img className='showpass input-icon' src={eyeClose} alt='open' onClick={handleShowpass} />
                )}
                <span className="showpass" onClick={handleShowpass}>{showpassword ? '| Hide' : '| Show'}</span>
            </div>
            <label>Confirm Password:</label>
            <input 
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="Confirm Password"
            />

            <label>Email:</label>
            <input 
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="sample@gmail.com"
            />

            <label>Date of Birth:</label>
            <input 
            type="date"
            onChange={(e) => setDateofbirth(e.target.value)}
            value={dateofbirth}
            />
            <button disabled={isloading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
            <div className="director-container">
                <Link to="/login" className="link-to-other-form">
                    <span>Already have an account? Log in</span>
                </Link>
            </div>
            <Toaster position="bottom-right" />
        </form>
    )
}

export default Signup