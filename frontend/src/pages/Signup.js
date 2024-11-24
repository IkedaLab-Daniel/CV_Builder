import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Toaster } from "react-hot-toast"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const {signup, error, isloading} = useSignup('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password, firstName, lastName)
    }

    return(
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <label>First Name:</label>
            <input 
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            />
            <label>Last Name:</label>
            <input 
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            />
            <label>Email:</label>
            <input 
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />
            <label>Password:</label>
            <input 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />

            <button disabled={isloading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
            <Toaster position="bottom-right" />
        </form>
    )
}

export default Signup