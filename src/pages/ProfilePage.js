import { React, useContext, useState, useEffect } from 'react'
import axios from "axios";
import { UploadPicture } from '../components/UploadPicture';
import { DataContext } from '../context/data.context'
import FormNewBaby from "../components/babies/FormNewBaby";

import editIcon from "../images/edit-icon.png"

const API_URI = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const token = localStorage.getItem("authToken");


const ProfilePage = () => {
    

    const { currentUser, currentBaby } = useContext(DataContext)
    const [ user, setUser ] = useState()


    useEffect( () => {
        if (currentUser) setUser(currentUser)
    }, [currentUser])


    // Fetch again currentUser, so that it reflects the New baby from child component FormNewBaby
    const babyIsUpdated = () => {

        axios
            .get(`${API_URI}/users/${currentUser._id}`, {      
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                let foundUser = response.data.data
                setUser(foundUser)
            })
            .catch((error) => console.log(error));
    }

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


    const openModalNewBaby = () => {
        let overlay = document.getElementById("overlayModals")
        let modalNewBaby = document.getElementById('modalNewBaby')
        modalNewBaby.classList.add("show")
        overlay.classList.add("show")

    }

    const closeModalNewBaby = () => {
        let overlay = document.getElementById("overlayModals")
        let modalNewBaby = document.getElementById('modalNewBaby')
        modalNewBaby.classList.remove("show")
        overlay.classList.remove("show")
    }


    return (
        <div className="profile-page">
            <h1>Your profile</h1>

            <div className="modal" id="modalNewBaby">
                <span className="close-modal" onClick={ ()=> closeModalNewBaby()}></span>
                <FormNewBaby babyIsUpdated={babyIsUpdated} /> 
            </div>


            <div className="profile-page-form form">

            { user && 
            
                <>

                    <p className="field-row edit-user-name">
                        <label>Your name: </label>
                        <span contentEditable 
                                onBlur={(e) => submitUserName(e) }
                                onMouseOver={ (e) => toggleEditIcon(e, 'show') }
                                onMouseOut={ (e) => toggleEditIcon(e, 'hide') }
                                className="content-editable"
                                suppressContentEditableWarning={true}>

                                {user.name || ""}
                            <img src={editIcon} alt="edit icon" className="edit-icon" />
                        </span>
                        <span className="tooltip-form info"></span>
                        <span className="tooltip-form error"></span>
                    </p>

                    <h3> Your babies </h3>

                    <div className="user-babies">

                        { (!user.babies || user.babies.length === 0 ) 
                            &&
                            <span className="btn" onClick={ ()=> openModalNewBaby() }>Register a baby</span>
                        }


                        { user.babies && user.babies.map( (baby) => (

                            <div key={baby._id}>

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

                                <UploadPicture baby={currentBaby} />

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

