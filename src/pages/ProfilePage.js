import { React, useContext } from 'react'
import axios from "axios";

import editIcon from "../images/edit-icon.png"
import { CurrentDataContext } from '../context/currentData.context'

const API_URI = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("authToken");


const ProfilePage = () => {
    
    const { currentUser, currentBaby } = useContext(CurrentDataContext)

    const toggleEditIcon = (e, action) => {
        let iconEl = e.target.querySelector('.edit-icon')

        if (iconEl) {
            if (action === 'show') iconEl.classList.add("show")
            else if (action === 'hide') iconEl.classList.remove("show")
        }
    }


    const submitUserName = (e) => {

        let tooltipEl = e.target.nextSibling
        let tooltipErr = e.target.nextSibling.nextSibling

        let value = e.target.innerText
        let field = e.target.id
                
        if (value !== "") {
            const requestBody = { name: value }          

            axios
                .put(`${API_URI}/users/${currentUser._id}`, requestBody, {     // updates user info     
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    tooltipEl.classList.add('show')
                    tooltipEl.innerText = `${field} saved!`
                    setTimeout(()=>{ tooltipEl.classList.remove('show')}, 1000)
                })
                .catch((error) => console.log(error));
        } else {
            tooltipErr.classList.add('show')
            tooltipErr.innerText = `${field} empty`
            setTimeout(()=>{ tooltipErr.classList.remove('show')}, 1000)
        }
    }    


    const submitBabyField = (e) => {

        let tooltipEl = e.target.nextSibling
        let tooltipErr = e.target.nextSibling.nextSibling
 
         // We submit one by one, when user unBlur
         let field = e.target.attributes.fieldtoedit.value  // custom attribute  
         let value = e.target.innerText

        if (value !== "") {
            const requestBody = { [field]: value }   
            const putURL = `${API_URI}/babies/${currentBaby._id}`

            console.log("Im about to call this url", putURL)
            console.log("and this is my body: ", requestBody)

            axios
                .put(putURL, requestBody, {     // updates baby info    
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    tooltipEl.classList.add('show')
                    tooltipEl.innerText = `${field} saved!`
                    setTimeout(()=>{ tooltipEl.classList.remove('show')}, 1000)
                })
                .catch((error) => console.log(error));
        } else {
            tooltipErr.classList.add('show')
            tooltipErr.innerText = `${field} empty`
            setTimeout(()=>{ tooltipErr.classList.remove('show')}, 1000)
        }
    }    


    return (
        <div className="profile-page">
            <h1>Your profile</h1>

            <div className="profile-page-form form">

            { currentUser && 
            
                <>

                    <p className="field-row edit-user-name">
                        <label>Your name: </label>
                        <span contentEditable 
                                onBlur={(e) => submitUserName(e) }
                                onMouseOver={ (e) => toggleEditIcon(e, 'show') }
                                onMouseOut={ (e) => toggleEditIcon(e, 'hide') }
                                className="content-editable"
                                suppressContentEditableWarning={true}>

                                {currentUser.name || ""}
                            <img src={editIcon} alt="edit icon" className="edit-icon" />
                        </span>
                        <span className="tooltip-form info"></span>
                        <span className="tooltip-form error"></span>
                    </p>


                    <h3> Your babies </h3>

                    <div className="user-babies">
                        { currentUser.babies && currentUser.babies.map( (baby) => (

                            <>

                                <p className="field-row">
                                    <label>Baby's name: </label>
                                    <span contentEditable 
                                            onBlur={(e) => submitBabyField(e) }
                                            onMouseOver={ (e) => toggleEditIcon(e, 'show') }
                                            onMouseOut={ (e) => toggleEditIcon(e, 'hide') }
                                            fieldtoedit="name"
                                            className="content-editable complementary"
                                            suppressContentEditableWarning={true}>

                                        { (baby && baby.name) || ""}
                                        <img src={editIcon} alt="edit icon" className="edit-icon" />
                                    </span>
                                    <span className="tooltip-form info"></span>
                                    <span className="tooltip-form error"></span>
                                </p>

                                <p className="field-row">
                                    <label>{ baby ? baby.name : "Baby" }'s age: </label>
                                    <span contentEditable 
                                            onBlur={(e) => submitBabyField(e) }
                                            onMouseOver={ (e) => toggleEditIcon(e, 'show') }
                                            onMouseOut={ (e) => toggleEditIcon(e, 'hide') }
                                            fieldtoedit="age"
                                            className="content-editable complementary"
                                            suppressContentEditableWarning={true}>

                                        { (baby && baby.age) || ""} 
                                        <img src={editIcon} alt="edit icon" className="edit-icon" />
                                    </span>
                                    <span className="tooltip-form info"></span>
                                    <span className="tooltip-form error"></span>
                                    <span className="extra-text">months</span>
                                </p>

                                <p className="field-row">
                                    <label>{ baby ? baby.name : "Baby" }'s weight: </label>
                                    <span contentEditable 
                                            onBlur={(e) => submitBabyField(e) }
                                            onMouseOver={ (e) => toggleEditIcon(e, 'show') }
                                            onMouseOut={ (e) => toggleEditIcon(e, 'hide') }
                                            fieldtoedit="weight"
                                            className="content-editable complementary"
                                            suppressContentEditableWarning={true}>

                                        { (baby && baby.weight) || ""} 
                                        <img src={editIcon} alt="edit icon" className="edit-icon" />
                                    </span>
                                    <span className="tooltip-form info"></span>
                                    <span className="tooltip-form error"></span>
                                    <span className="extra-text">Kgs</span>
                                </p>

                            </>
                            
                        )) }
                    </div>
                </>
            
            }
            </div>


        </div>
    )
}

export default ProfilePage

