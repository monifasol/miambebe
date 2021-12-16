import React from 'react'

import defaultBabyPic from "../../images/default-avatar.png"

const CurrentBabyNav = ( {currentBaby, currentUser} ) => {

    return (

        <div className="current-logged">
            <img className="baby-avatar-header" src={currentBaby.imageUrl || defaultBabyPic} alt="avatar baby" />
            <div className="text">
                <span>Hello, {currentUser && currentUser.name}!</span>
                <span className="baby">{currentBaby.name}, {currentBaby.age} months</span>
            </div>
        </div>
    )
}

export default CurrentBabyNav
