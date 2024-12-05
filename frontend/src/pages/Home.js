import { useState } from "react"
import Resumes from "../components/Resumes"
import ResumeForm from "../components/ResumeForm"
import logo from '../assets/logo-favicon.png'

// imgs
import info from "../assets/info.svg"
import react from "../assets/react.svg"
import node from "../assets/node.svg"
import express from "../assets/express2.svg"
import mongodb from "../assets/mongodb.svg"
import callejas from "../assets/me-black.jpg"
import sangalang from "../assets/sangalang2.jpg"
import meta from "../assets/meta.png"

const Home = () => {
  // Modal
  const [toggleModal, setToggleModal] = useState({display: "none"})
  const [count, setCount] = useState(2)

  const handleToggleModal = () => {
    if (count%2 === 1){
      setToggleModal(prev => ({...prev, display: "none"}))
      setCount(prev => (prev + 1))
    }else{
      setToggleModal(prev => ({...prev, display: "block"}))
      setCount(prev => (prev + 1))
    }
  } 

  return (
    <div className="home" >
      <div className="darkbg" style={toggleModal} onClick={handleToggleModal}></div>
      <Resumes />
      <ResumeForm />
      <div className="nightmode" onClick={handleToggleModal}>
        <img src={info} alt="moon"/>
      </div>

      {/* Information Modal */}
      <div className='info-modal' style={toggleModal}>
        <p className="top">In Partial Fulfillment of the Requirements for the Subject Web Programming</p>
        <div className="logo-container">
                    <img src={logo} className="logo" alt="logo" />
        </div>
        <p className="title">CV Drive</p>
        <p className="top">Presented To:</p>
        <p className="name">Sir Aaron L. Batac, MIT</p>
        <p className="nametag">WEBPROG Instructor</p>
        <br/>
        <p className="top">Presented By:</p>
        <div className="img-container">
          <img src={callejas} alt="callejas" className="profile" />
        </div>
        <p className="name">Mark Daniel V. Callejas</p>
        <a href="https://www.credly.com/badges/84e6444a-1f9b-4ecc-8c1a-ea8d253da3ec" rel="noopener noreferrer" target="_blank" className="to-certificate">
          <p className="nametag"> 
          <img src={meta} alt="meta" style={{width: "25px", marginRight: "5px"}}/>
          META Front-End Development Professional</p>
        </a>
        <div className="img-container">
              <img src={sangalang} alt="sangalang" className="profile"/>
        </div>
        <p className="name">Markedrei T. Sangalang</p>
        <p className="nametag">🍦🧋 Tagabili ng Ice Cream and MilkTea</p>
        <br/>
        <p className="name">Stack</p>
        <p className="top">MERN</p>
        <div className="stack-container">
          <div className="tech">
            <img src={mongodb} alt="mongodb" />
            <span>MongoDB</span>
          </div>
          <div className="tech">
              <img src={express} alt="express" />
              <span>Express</span>
          </div>
          <div className="tech">
            <img src={react} alt="react" className="react"/>
            <span>React</span>
          </div>
          <div className="tech">
            <img src={node} alt="node" />
            <span>Node</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home