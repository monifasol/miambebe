import { React, useContext, useEffect } from 'react'
import axios from "axios";
import env from "react-dotenv";
import { CurrentDataContext } from '../context/currentData.context'

const API_URI = env.SERVER_API_URL;
const token = localStorage.getItem("authToken");

const ProfilePage = () => {
    
    const { currentUser } = useContext(CurrentDataContext)
    
    const handleContent = (e) => {
        let value = e.target.innerText
        console.log("====> I'm typing this, live:", value)
    }    

    const submitContent = (e) => {
        let value = e.target.innerText
        let fieldName = e.target.id

        const requestBody = { name: value }

        console.log("my request body is: ", requestBody)

        axios
            .put(`${API_URI}/users/${currentUser._id}`, requestBody, {     // updates user info     
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                let message = `${fieldName} saved!`
                console.log(message)
                // Create tooltip!!! show message input saved!!!
            })
            .catch((error) => console.log(error));
        
    }    

    return (
        <div className="profile-page">
            <h1>Your profile</h1>

            <div className="profile-page-form">

            { currentUser && 
            
                <>
                    <p className="field-row">
                        <label>Your name: </label>
                        <span contentEditable 
                                id="name"
                                onInput={(e) => handleContent(e) }
                                onBlur={(e) => submitContent(e) }
                                className="content-editable"
                                suppressContentEditableWarning={true}>
                            {currentUser.name}
                        </span>
                    </p>

                    <h3> Your babies </h3>

                    <div className="user-babies">
                        { currentUser && currentUser.babies && currentUser.babies.map( (baby) => (

                            <div key={baby._id}>
                                <p className="field-row">
                                    <label>Baby's name: </label>
                                    <span contentEditable 
                                            onChange={(e) => {handleContent(e.target.value)}}
                                            className="content-editable"
                                            suppressContentEditableWarning={true}>
                                        {baby.name}
                                    </span>
                                </p>

                                <p className="field-row">
                                    <label>{baby.name}'s age: </label>
                                    <span contentEditable 
                                            onChange={(e) => {handleContent(e.target.value)}}
                                            className="content-editable"
                                            suppressContentEditableWarning={true}>
                                        {baby.age}
                                    </span>
                                </p>

                                <p className="field-row">
                                    <label>{baby.name}'s weight: </label>
                                    <span contentEditable 
                                            onChange={(e) => {handleContent(e.target.value)}}
                                            className="content-editable"
                                            suppressContentEditableWarning={true}>
                                        {baby.weight}
                                    </span>
                                </p>
                            </div>
                        )) }
                    </div>
                </>
            
            }
            </div>


        </div>
    )
}

export default ProfilePage

