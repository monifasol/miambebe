import { React, useState, useContext } from 'react'
import axios from "axios";
import { DataContext } from '../../context/data.context'
import { showNotification } from '../../utils/ui.utils'

const API_URI = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("authToken");

const FormNewBaby = (props) => {

    const [ formState, setFormState ] = useState({})
    const { currentUser, updateBaby } = useContext(DataContext)

    const tooltipEl = document.querySelector('.tooltip-form.general.info')
    const tooltipErr = document.querySelector('.tooltip-form.general.error')


    function handleSubmit(e) {
        e.preventDefault()

        const requestBody = formState    
    
        if ( Object.keys(formState).length === 0 ) {
            showNotification(tooltipErr, `All fields are empty!`)

        } else if (formState.name === "")  {
            showNotification(tooltipErr, `Name should not be empty!`)

        } else {
            
            axios
                .post(`${API_URI}/babies/${currentUser._id}`, requestBody, {        
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    let updatedBaby = response.data.data 
                    updateBaby(updatedBaby)   

                    showNotification(tooltipEl, `Baby successfully saved!`)
                    setFormState({})    // reset the form

                    setTimeout(()=>{ 
                        e.target.parentElement.classList.remove('show')
                        document.getElementById('overlayModals').classList.remove('show')
                    }, 800)

                    setTimeout(()=>{ 
                        props.babyIsUpdated()
                    }, 1000)

                })
                .catch((error) => {
                    console.log(error)
                })
        } 
    }

    function handleInput(e){
        let {name, value } = e.target
        setFormState(Object.assign({}, formState, {[name]: value}))

        console.log(formState)
    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
           
                <span className="tooltip-form general info"></span>
                <span className="tooltip-form general error"></span>

                <p className="field-row">
                    <label htmlFor="name">Baby's name: </label>
                    <input type="text" 
                            name="name" 
                            value={formState.name || ""} 
                            onChange={(e) => handleInput(e) } />
                </p>

                <p className="field-row">
                    <label htmlFor="age">Age in months: </label>
                    <input type="number" 
                            name="age" 
                            value={formState.age || ""} 
                            onChange={(e) => handleInput(e) } />
                </p>

                <p className="field-row">
                    <label htmlFor="weight">Weight (kg): </label>
                    <input type="number" 
                            name="weight" 
                            value={formState.weight || ""} 
                            onChange={(e) => handleInput(e) } />
                </p>

                <button type="submit" className="btn">Save baby</button>
            </form>
        </>
    )
}

export default FormNewBaby
