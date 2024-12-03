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
  const {updateUser, usernameTaken, setUsernameTaken} = useUpdateUser()

  const [toggleMenu, setToggleMenu] = useState(false) 
  const [isAnimating, setIsAnimating] = useState(false) 
  const [toggleModal, setToggleModal] = useState({display: "none"})
  const [toggleModalLogout, setToggleModalLogout] = useState({display: "none"})
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [suffix, setSuffix] = useState('')
  const [username, setUsername] = useState('')
  const [dateofbirth, setDateofbirth] = useState('')
  const [selectedImage, setSelectedImage] = useState(null);
  const [editmode, setEditmode] = useState(false)
  const [isClosing, setIsClosing] = useState(false);
  const [toggleLogout, setToggleLogout] = useState(false)
  const [address, setAddress] = useState('')
  const [sex, setSex] = useState('')

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
    setToggleModalLogout({display: "none"})
    setToggleLogout(false)
    logout()
    toast.success('User logged-out', {
      duration: 4000,  // 4 seconds
    });
  }

  const handleMenu = () => {
    if (toggleMenu) {
      setIsAnimating(true)
      setTimeout(() => {
        setToggleMenu(false)
        setIsAnimating(false)
      }, 1000) 
    } else {
      setToggleMenu(true)
    }
  }

  const handleEdit = () => {
    setEditmode(true)
  }

  const handleCancelEdit = () => {
      setEditmode(false)
      setFirstName('')
      setMiddleName('')
      setLastName('')
      setSuffix('')
      setDateofbirth('')
      setUsername('')
      setAddress('')
      setSex('')
      setUsernameTaken(false)
  }

  const handleUpdateUser = async () => {
    if (!firstName.trim() || !lastName.trim() || !username.trim() || !dateofbirth.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (username.length > 15){
      return toast.error('Username must not exceed to 15 characters')
    }

    if (username.includes(" ")){
        return toast.error('Username must not have white space')
    }

    const updatedData = {
        firstName,
        middleName,
        lastName,
        suffix,
        username,
        dateofbirth,
        address,
        sex,
    };

    const action = await updateUser(user.userData._id, updatedData, user.token)
    if (action){
        if (action === 'success'){          
        setEditmode(false)
        setFirstName('')
        setMiddleName('')
        setLastName('')
        setSuffix('')
        setDateofbirth('')
        setUsername('')
        setAddress('')
        setSex('')
        setUsernameTaken(false)
      }else{
        setEditmode(true)
      }
    }
    
};

const handleUploadImage = async () => {
  if (!selectedImage) {
    toast.error("Please select an image.");
    return;
  }

  const formData = new FormData();
  formData.append('profileImage', selectedImage);

  try {
    const response = await fetch(`/api/user/profile/${user.userData._id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const updatedUser = await response.json();
      toast.success("Profile image updated successfully.");
      setSelectedImage(null);
      user.userData.profileImage = updatedUser.profileImage;
    } else {
      const errorData = await response.json();
      toast.error(errorData.message || "Failed to upload image.");
    }
  } catch (error) {
    toast.error("An error occurred while uploading the image.");
  }
};

const handleConfirmLogout = () =>{
  if (toggleLogout === false){
    setToggleLogout(true)
    setToggleModalLogout({display: "block"})
  } else{
    setIsClosing(true);
    setToggleLogout(false)
    setTimeout( () => {
      setToggleModalLogout({display: "none"})
      setIsClosing(false)
    }, 500)
    
  }
}

  return (
    <header>
      <div className={`darkbg ${isClosing ? 'closing' : ''}`} style={toggleModal} onClick={handleToggleModal}></div>
      <div className={`darkbg ${isClosing ? 'closing' : ''}`} style={toggleModalLogout} onClick={handleConfirmLogout}></div>
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
                      src={
                        user.userData.profileImage
                          ? `http://localhost:4000/images/${user.userData.profileImage}`
                          : defaultProfile
                      }
                      alt='user'
                      id='user-profile-logo'
                  />
                  <span style={{marginLeft: "15px"}}>
                    {user.userData.firstName} {user.userData.lastName} {user.userData.suffix}
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
                  <span className='btn' onClick={handleConfirmLogout}>
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
              <Link to="/login" className='button'>Login</Link>
              <Link to="/signup" className='button'>Signup</Link>
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
                  <img
                      src={
                        user.userData.profileImage
                          ? `http://localhost:4000/images/${user.userData.profileImage}`
                          : defaultProfile
                      }
                      alt='user'
                      id='user-profile-logo-big'
                  />
                <input
                    type='file'
                    accept='image/*'
                    className='custom-input'
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                  />
                   <span className='upload-profile' onClick={handleUploadImage} style={selectedImage ? { } : {background: "gray", cursor: "not-allowed", opacity: "0.6"}}>
                    {selectedImage ? 'Upload and Update' : 'Select an image first'}
                   </span>
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

                  <div className='dual-entry'>
                    <div className='an-input'>
                      <label className='label-editing'>Suffix:</label>
                      <input 
                        type='text'
                        onChange={(e) => setSuffix(e.target.value)}
                        value={suffix}
                        placeholder={user.userData.suffix}
                      />  
                    </div>
                    <div className='an-input'>
                      <label className='label-editing'>Sex:</label>
                      <select id="dropdown" className="custom-dropdown" value={sex} onChange={(e) => setSex(e.target.value)}>
                        <option value="">Select an option</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                  
                  <label className='label-editing'>Username:</label>
                  <input 
                    type='text'
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    placeholder={user.userData.username}
                    style={usernameTaken ? {border: "2px solid red"} : {}}
                  />  

                  <label className='label-editing'>Birthday:</label>
                  <input 
                    type='date'
                    onChange={(e) => setDateofbirth(e.target.value)}
                    value={dateofbirth}
                    placeholder={user.userData.dateofbirth}
                  />  
                  <label className='label-editing'>Address:</label>
                  <input 
                    type='text'
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    placeholder={user.userData.address}
                  />
              </div>
              </div>

            
          ) : (
            <div className='modal-context'>
            
            <div className='left'>
            <img
                      src={
                        user.userData.profileImage
                          ? `http://localhost:4000/images/${user.userData.profileImage}`
                          : defaultProfile
                      }
                      alt='user'
                      id='user-profile-logo-big'
                  />
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
                
                {user.userData.address ? (
                  <>
                    <label>Address:</label>
                    <span>{user.userData.address}</span>
                  </>
                ) : (
                  <></>
                )}

                {user.userData.sex ? (
                  <>
                    <label>Sex:</label>
                    <span>{user.userData.sex}</span>
                  </>
                ) : (
                  <></>
                )}
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
      
      <div className='logout-modal' style={toggleLogout ? {display: "block"} : {display: "none"}}>
          <span className='heading'>Confirm Logout</span>
          <span className='message'>Are you sure you want to logout?</span>
          <div  className='logout-btns'>
              <span onClick={handleClick} className='confirm'>Confirm</span>
              <span onClick={handleConfirmLogout} className='cancel'>Cancel</span>
          </div>
      </div>

      <Toaster position="bottom-right" containerId="bottom-right-toaster"/>
    </header>
  )
}

export default Navbar
