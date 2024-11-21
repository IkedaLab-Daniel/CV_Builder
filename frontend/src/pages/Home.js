import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import Resumes from "../components/Resumes"
import ResumeForm from "../components/ResumeForm"

// imgs
import info from "../assets/info.svg"
import react from "../assets/react.svg"
import node from "../assets/node.svg"
import express from "../assets/express2.svg"
import mongodb from "../assets/mongodb.svg"
import callejas from "../assets/callejas.jpg"
import sangalang from "../assets/sangalang.jpeg"

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    fetchWorkouts()
  }, [dispatch])

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
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <WorkoutForm /> 
      <Resumes />
      <ResumeForm />
      <div className="nightmode" onClick={handleToggleModal}>
        <img src={info} alt="moon"/>
      </div>
      <div className='info-modal' style={toggleModal}>
        <p className="top">In Partial Fulfillment of the Requirements for the Subject Web Programming</p>
        <p className="title">CV Builder</p>
        <p className="top">Presented To:</p>
        <p className="name">Sir Aaron Batac, MIT</p>
        <p className="nametag">WEBPROG Instructor</p>
        <br/>
        <p className="top">Presented By:</p>
        <div className="img-container">
          <img src={callejas} alt="callejas" className="profile" />
        </div>
        <p className="name">Mark Daniel V. Callejas</p>
        <p className="nametag">Lead Dev | Full Stack</p>
        <div className="img-container">
              <img src={sangalang} alt="sangalang" className="profile"/>
        </div>
        <p className="name">Markedrei T. Sangalang</p>
        <p className="nametag">Tagabili ng Ice Cream / Cafe</p>
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