import React from 'react'
import spinner from "../../images/spinner.png"
import spinner2 from "../../images/spinner2.png"
import spinner3 from "../../images/spinner3.png"


const LoadingSpinner = ( {msg} ) => {

    const arraySpinners = [spinner, spinner2, spinner3]
    var randomSpinner = arraySpinners[Math.floor(Math.random()*arraySpinners.length)];

    return (
        <div className="loading">
            {msg}
            <img src={randomSpinner} className="spinner" alt="spinner"/>
        </div>
    )
}

export default LoadingSpinner
