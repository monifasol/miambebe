import { React, useState, useContext } from 'react'
import axios from "axios";
import { CurrentDataContext } from '../../context/currentData.context'

const API_URI = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("authToken");

const FormNewBaby = () => {

    const [formState, setFormState] = useState({})
    const { currentUser } = useContext(CurrentDataContext)


    function handleSubmit(e) {
        e.preventDefault()

        let tooltipEl = document.querySelector('.tooltip-form.info')
        let tooltipErr = document.querySelector('.tooltip-form.error')
        
        const requestBody = formState    
    
        console.log("modal to hide ===> ", e.target.parentElement)

        if ( Object.keys(formState).length === 0 ) {

            tooltipErr.classList.add('show')
            tooltipErr.innerText = `All fields are empty!`
            setTimeout(()=>{ tooltipErr.classList.remove('show')}, 1000)

        } else if (formState.name === "")  {
            
            tooltipErr.classList.add('show')
            tooltipErr.innerText = `Name should not be empty!`
            setTimeout(()=>{ tooltipErr.classList.remove('show')}, 1000)
        } else {

            axios
                .post(`${API_URI}/babies/${currentUser._id}`, requestBody, {        
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    tooltipEl.classList.add('show')
                    tooltipEl.innerText = `Baby successfully saved!`


                    setTimeout(()=>{ 
                        tooltipEl.classList.remove('show')
                        e.target.parentElement.classList.remove('show')
                        document.getElementById('overlayModals').classList.remove('show')
                    }, 1000)
                })
                .catch((error) => {
                    console.log(error)
                })
        
        } 

        setFormState({})    // reset the form
    }

    function handleInput(e){
        let {name, value } = e.target
        setFormState(Object.assign({}, formState, {[name]: value}))
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
