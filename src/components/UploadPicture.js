import { React, useState, useContext } from 'react'
import axios from "axios";
import { DataContext } from '../context/data.context'
import defaultBabyPic from "../images/default-avatar.png"

const API_URI = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const token = localStorage.getItem("authToken");


export const UploadPicture = () => {


    const [ picBaby, setPicBaby ] = useState()
    const { currentBaby } = useContext(DataContext)


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
            .post(url, requestBody, {         
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


    return (
        <div className="pic-upload">

            <form className="form">
                <label>Baby's picture: </label>

                <div className="wrapper-upload-pic">
                    <img className="preview-pic" src={ picBaby || (currentBaby && currentBaby.imageUrl) || defaultBabyPic } alt="baby_avatar" />
                    <input type="file" name="imageUrl" 
                            onChange={ (e) => { handleSubmitPicture(e, currentBaby._id) } } />
                    <span className="tooltip-form info"></span>
                    <span className="tooltip-form error"></span>
                </div>
            </form>
        </div>
    )
}


