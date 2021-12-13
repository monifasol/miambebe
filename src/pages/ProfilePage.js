import { React, useContext, useEffect } from 'react'
import axios from "axios";
import env from "react-dotenv";
import { CurrentDataContext } from '../context/currentData.context'
import editIcon from "../images/edit-icon.png"

const API_URI = env.SERVER_API_URL;
const token = localStorage.getItem("authToken");

const ProfilePage = () => {
    
    const { currentUser } = useContext(CurrentDataContext)

    const toggleEditIcon = (e, action) => {
        let iconEl = e.target.getElementsByTagName('img')[0]

        if (iconEl) {
            if (action === 'show') {
                iconEl.classList.add("show")
            } else if (action === 'hide') {
                iconEl.classList.remove("show")
            }
        }
    }

    const submitContent = (e) => {
        let value = e.target.innerText
        let fieldName = e.target.id

        const requestBody = { name: value }
        axios
            .put(`${API_URI}/users/${currentUser._id}`, requestBody, {     // updates user info     
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                let tooltipEl = e.target.nextSibling
                tooltipEl.classList.add('show')
                tooltipEl.innerText = `${fieldName} saved!`

                setTimeout(()=>{ tooltipEl.classList.remove('show')}, 1000)
             })
            .catch((error) => console.log(error));
        
    }    

    return (
        <div className="profile-page">
            <h1>Your profile</h1>

            <div className="profile-page-form">

            { currentUser && 
            
                <>
                    <p className="field-row edit-user-name">
                        <label>Your name: </label>
                        <span contentEditable 
                                id="name"
                                //onInput={(e) => handleContent(e) }
                                onBlur={(e) => submitContent(e) }
                                onMouseOver={ (e) => toggleEditIcon(e, 'show') }
                                onMouseOut={ (e) => toggleEditIcon(e, 'hide') }
                                className="content-editable"
                                suppressContentEditableWarning={true}>

                            {currentUser.name}

                            <img className="edit-icon" src={editIcon} alt="edit icon" />
                        </span>
                        <span className="tooltip-saved"></span>
                    </p>

                    <h3> Your babies </h3>

                    <div className="user-babies">
                        { currentUser && currentUser.babies && currentUser.babies.map( (baby) => (

                            <div key={baby._id}>
                                <p className="field-row">
                                    <label>Baby's name: </label>
                                    <span contentEditable 
                                            onBlur={(e) => submitContent(e) }
                                            onMouseOver={ (e) => toggleEditIcon(e, 'show') }
                                            onMouseOut={ (e) => toggleEditIcon(e, 'hide') }
                                            className="content-editable complementary"
                                            suppressContentEditableWarning={true}>

                                        {baby.name}

                                        <img className="edit-icon" src={editIcon} alt="edit icon" />
                                    </span>
                                </p>

                                <p className="field-row">
                                    <label>{baby.name}'s age: </label>
                                    <span contentEditable 
                                            onBlur={(e) => submitContent(e) }
                                            onMouseOver={ (e) => toggleEditIcon(e, 'show') }
                                            onMouseOut={ (e) => toggleEditIcon(e, 'hide') }
                                            className="content-editable complementary"
                                            suppressContentEditableWarning={true}>

                                        {baby.age}

                                        <img className="edit-icon" src={editIcon} alt="edit icon" />
                                    </span>
                                </p>

                                <p className="field-row">
                                    <label>{baby.name}'s weight: </label>
                                    <span contentEditable 
                                            onBlur={(e) => submitContent(e) }
                                            onMouseOver={ (e) => toggleEditIcon(e, 'show') }
                                            onMouseOut={ (e) => toggleEditIcon(e, 'hide') }
                                            className="content-editable complementary"
                                            suppressContentEditableWarning={true}>

                                        {baby.weight}

                                        <img className="edit-icon" src={editIcon} alt="edit icon" />
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

