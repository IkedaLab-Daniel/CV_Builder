import {useState} from 'react'

const WorkoutForm = () => {
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)

    // functions
    const handleSubmit = async (e) => {
        e.preventDefault()
        // Create object passing the values to be submitted
        const workout = {title, load, reps}

        const response = await fetch('/api/workouts/', {
            // options
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json() // parse response to json

        if (!response.ok){
            setError(json.error)
        }
        if (response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError('')
            console.log('New workout added', json);
        }
    }

    return (
        <form className='create' on onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input 
                type='text'
                onChange={(e) => {setTitle(e.target.value)} }
                value={title}
            />

            <label>Load (in kg):</label>
            <input 
                type='number'
                onChange={(e) => {setLoad(e.target.value)} }
                value={load}
            />

            <label>Reps:</label>
            <input 
                type='number'
                onChange={(e) => {setReps(e.target.value)} }
                value={reps}
            />
            <button>Add Workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default WorkoutForm