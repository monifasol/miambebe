import React from 'react'

import defaultBabyPic from "../../images/default-avatar.png"

const CurrentBabyNav = ( {currentBaby} ) => {
    return (
        <div className="current-baby">
            <img className="baby-avatar-header" src={currentBaby.imageUrl || defaultBabyPic} alt="avatar baby" />
            <span>{currentBaby.name}, {currentBaby.age} months.</span>
        </div>
    )
}

export default CurrentBabyNav
