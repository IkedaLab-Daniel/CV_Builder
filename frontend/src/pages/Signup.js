import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Toaster } from "react-hot-toast"

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
    const {signup, error, isloading} = useSignup('')

    const handleSubmit = async (e) => {
        e.preventDefault()

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
            placeholder="username"
            />

            <label>Password:</label>
            <input 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Must be atleast 8 characters, include one uppercase, lowercase, number, and symbol"
            />
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
            <Toaster position="bottom-right" />
        </form>
    )
}

export default Signup