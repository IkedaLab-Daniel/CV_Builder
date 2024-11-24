import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'
import toast, {Toaster} from 'react-hot-toast'
import { useUpdateUser } from '../hooks/useUpdateUser'
// imgs
import logoLong from '../assets/logo-long.png'
import profileLogo from '../assets/profile-logo.svg'
import logoutLogo from '../assets/logout.svg'
import defaultProfile from '../assets/default.svg'

const Navbar = () => {
  const {updateUser, isLoading, error} = useUpdateUser()

  const [toggleMenu, setToggleMenu] = useState(false) // Tracks whether the menu is open
  const [isAnimating, setIsAnimating] = useState(false) // Tracks if the reverse animation is running
  const [toggleModal, setToggleModal] = useState({display: "none"})
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [suffix, setSuffix] = useState('')
  const [username, setUsername] = useState('')
  const [dateofbirth, setDateofbirth] = useState('')

  const [editmode, setEditmode] = useState(false)
  const [isClosing, setIsClosing] = useState(false);

  const handleToggleModal = () => {
    if (toggleModal.display === "block") {
      setIsClosing(true);
      setTimeout(() => {
        setToggleModal({ display: "none" });
        setIsClosing(false);
      }, 500);
    } else {
      setToggleModal({ display: "block" });
    }
  };

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

  const handleEdit = () => {
    setEditmode(true)
  }

  const handleCancelEdit = () => {
    setEditmode(false)
  }

  const handleUpdateUser = async () => {
    const updatedData = {
        firstName,
        middleName,
        lastName,
        suffix,
        username,
        email,
        dateofbirth,
    };
    await updateUser(user.userData._id, updatedData, user.token);
    if (error == null){
      setFirstName('')
      setMiddleName('')
      setLastName('')
      setSuffix('')
      setEmail('')
      setUsername('')
      setDateofbirth('')
      setEditmode(false)
    }
};

  return (
    <header>
      <div className={`darkbg ${isClosing ? 'closing' : ''}`} style={toggleModal} onClick={handleToggleModal}></div>
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
                  <span className='btn' onClick={handleToggleModal}>
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

      {/* Profile Modal */}
      {user && (

        <div
          className={`profile-modal ${isClosing ? 'closing' : ''}`}
          style={toggleModal}
        >
          <h2>
            {editmode ? 'Edit Profile' : 'Profile'}
          </h2>

          {editmode ? (

              <div className='modal-context'>
                          
                            
              <div className='left'>
                {!user.userData.profileImg && (
                  <img src={defaultProfile} alt='user' />
                )}
                <input
                  type='file'
                  accept='image/*'
                  className='custom-input'
                />
              </div>

              <div className='right'>
                  <label className='label-editing'>First Name:</label>
                  <input 
                    type='text'
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    placeholder={user.userData.firstName}
                  />

                  <label className='label-editing'>Middle Name:</label>
                  <input 
                    type='text'
                    onChange={(e) => setMiddleName(e.target.value)}
                    value={middleName}
                    placeholder={user.userData.middleName}

                  />

                  <label className='label-editing'>Last Name:</label>
                  <input 
                    type='text'
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    placeholder={user.userData.lastName}

                  />

                  <label className='label-editing'>Suffix:</label>
                  <input 
                    type='text'
                    onChange={(e) => setSuffix(e.target.value)}
                    value={suffix}
                    placeholder={user.userData.suffix}

                  />  
                  <label className='label-editing'>Username:</label>
                  <input 
                    type='text'
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    placeholder={user.userData.username}

                  />  

                  <label className='label-editing'>Email:</label>
                  <input 
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder={user.userData.email}

                  />  

                  <label className='label-editing'>Birthday:</label>
                  <input 
                    type='date'
                    onChange={(e) => setDateofbirth(e.target.value)}
                    value={dateofbirth}
                    placeholder={user.userData.dateofbirth}

                  />  
              </div>
              </div>

            
          ) : (
            <div className='modal-context'>
            
            <div className='left'>
              {!user.userData.profileImg && (
                <img src={defaultProfile} alt='user' />
              )}
            </div>
            
            <div className='right'>
                <label>Name:</label>
                <span>{user.userData.firstName} {user.userData.middleName} {user.userData.lastName} {user.userData.suffix}</span>

                <label>Username:</label>
                <span>@{user.userData.username}</span>

                <label>Email:</label>
                <span>{user.userData.email}</span>

                <label>Birthday:</label>
                <span>{user.userData.dateofbirth}</span>

                <label>Account ID</label>
                <span>{user.userData._id}</span>
            </div>
          </div>
          )}

          

          
          
          
          
          <div className='btn-container'>
            <span className='edit' onClick={editmode ? handleUpdateUser : handleEdit}>
              {editmode ? 'Save' : 'Edit'}
            </span>
            <span className='close-profile' onClick={editmode ? handleCancelEdit : handleToggleModal}>
              {editmode ? 'Cancel' : 'Close'}
            </span>
          </div>
        </div>
      )}
      

      <Toaster position="bottom-right" />
    </header>
  )
}

export default Navbar
