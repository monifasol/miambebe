import { React, useState } from 'react'
import axios from "axios";
import env from "react-dotenv";
import { CurrentDataContext } from '../../context/currentData.context'

const API_URI = env.SERVER_API_URL;
const token = localStorage.getItem("authToken");

const FormNewBaby = () => {

    const [formState, setFormState] = useState({})

    function handleSubmit(e) {
        e.preventDefault()

        // CREATE NEW BABY!!!!


        setFormState({})    // reset the form
    }

    function handleInput(event){
        let {name, value } = event.target
        setFormState(Object.assign({}, formState, {[name]: value}))
    }

    return (
        <>
            <form class="form" onSubmit={handleSubmit}>
           
                <span className="tooltip-form info"></span>

                <p className="field-row">
                    <label htmlFor="name">Baby's name: </label>
                    <input type="text" 
                            name="title" 
                            value={formState.name || ""} 
                            onChange={(e) => handleInput(e) } />
                    <span className="tooltip-form error"></span>
                </p>

                <p className="field-row">
                    <label htmlFor="age">Age in months: </label>
                    <input type="number" 
                            name="age" 
                            value={formState.age || ""} 
                            onChange={(e) => handleInput(e) } />
                    <span className="tooltip-form error"></span>
                </p>

                <p className="field-row">
                    <label htmlFor="weight">Weight (kg): </label>
                    <input type="number" 
                            name="weight" 
                            value={formState.weight || ""} 
                            onChange={(e) => handleInput(e) } />
                    <span className="tooltip-form error"></span>
                </p>

                <button type="submit" className="btn">Save baby</button>
            </form>
        </>
    )
}

export default FormNewBaby
