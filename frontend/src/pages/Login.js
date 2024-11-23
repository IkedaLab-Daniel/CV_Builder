import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Toaster } from "react-hot-toast"

const Login = () => {
    const {login, isLoading, error} = useLogin()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)        
    }

    return(
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Log In</h3>
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

            <button disabled={isLoading}>Log In</button>

            {error && <div className="error">{error}</div>}
            <Toaster position="bottom-right" />
        </form>
    )
}

export default Login