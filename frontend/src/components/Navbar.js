import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'
import toast, {Toaster} from 'react-hot-toast'
// imgs
import logoLong from '../assets/logo-long.png'
import profileLogo from '../assets/profile-logo.svg'
import logoutLogo from '../assets/logout.svg'
import defaultProfile from '../assets/default.svg'

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false) // Tracks whether the menu is open
  const [isAnimating, setIsAnimating] = useState(false) // Tracks if the reverse animation is running

  const { user } = useAuthContext()
  const { logout } = useLogout()

  const handleClick = () => {
    setToggleMenu(false)
    logout()
    toast.success('User logged-out', {
      duration: 4000,  // 4 seconds
    });
  }

  const handleMenu = () => {
    if (toggleMenu) {
      // Start reverse animation
      setIsAnimating(true)
      // Delay hiding the menu until the animation ends
      setTimeout(() => {
        setToggleMenu(false)
        setIsAnimating(false)
      }, 1000) // Match the animation duration in CSS
    } else {
      // Show the menu
      setToggleMenu(true)
    }
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img 
            src={logoLong}
            alt='logo-long'
            id='logo-long'
          />
        </Link>
        <nav>
          {user && (
            <div>
              <div className='profile-name' onClick={handleMenu}>
                  <img 
                      src={defaultProfile}
                      alt='user'
                      id='user-profile-logo'
                    />
                  <span>
                      
                    {user.userData.firstName} {user.userData.lastName} 
                  </span>
              </div>
              

              {toggleMenu && (
                <div
                  className={`hidden ${isAnimating ? 'closing' : ''}`}
                >
                  <span className='btn'>
                    <img src={profileLogo} alt='profile' />
                    Profile
                  </span>
                  <span className='btn' onClick={handleClick}>
                    <img src={logoutLogo} alt='logout' />
                    Logout
                  </span>
                  <span className='btn-close' onClick={handleMenu}>close</span>
                </div>
              )}
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
          
        </nav>
      </div>
      <Toaster position="bottom-right" />
    </header>
  )
}

export default Navbar
