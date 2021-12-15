import { React, useContext, useState } from 'react'
import axios from "axios";
import defaultBabyPic from "../images/spinner.png"

import editIcon from "../images/edit-icon.png"
import { CurrentDataContext } from '../context/currentData.context'

const API_URI = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const token = localStorage.getItem("authToken");


const ProfilePage = () => {
    
    const { currentUser, currentBaby } = useContext(CurrentDataContext)
    const [ picBaby, setPicBaby ] = useState()

    const toggleEditIcon = (e, action) => {
        let iconEl = e.target.querySelector('.edit-icon')

        if (iconEl) {
            if (action === 'show') iconEl.classList.add("show")
            else if (action === 'hide') iconEl.classList.remove("show")
        }
    }

    const handleSubmitPicture = (e, babyId) => {

        e.preventDefault()

        let tooltipEl = e.target.nextSibling
        let tooltipErr = e.target.nextSibling.nextSibling

        console.log("tooltipEl", tooltipEl)
        console.log("tooltipErr",tooltipErr )

        const requestBody = new FormData();
        requestBody.append("imageUrl", e.target.files[0]);
        let url = `${API_URI}/babies/${babyId}/uploadPic`

        axios
            .post(url, requestBody, {     // updates user info     
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                tooltipEl.classList.add('show')
                tooltipEl.innerText = "Picture saved!"

                let babyPic = response.data.data
                console.log("is this an image? ==>", babyPic)
                setPicBaby(babyPic)
                setTimeout(()=>{ tooltipEl.classList.remove('show')}, 1000)
            })
            .catch((error) => {
                tooltipErr.classList.add('show')
                tooltipErr.innerText = "Sorry, picture not saved"
                setTimeout(()=>{ tooltipErr.classList.remove('show')}, 1000)
            });

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


                                <div className="pic-upload">

                                    <form className="form">
                                        <label>Baby's picture: </label>

                                        <div className="wapper-upload-pic">
                                            <img className="preview-pic" src={ baby.imageUrl || picBaby || defaultBabyPic } alt="baby_avatar" />
                                            <input type="file" name="imageUrl" 
                                                    onChange={ (e) => { handleSubmitPicture(e, baby._id) } } />
                                            <span className="tooltip-form info"></span>
                                            <span className="tooltip-form error"></span>
                                        </div>
                                    </form>

                                </div>
                                

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

