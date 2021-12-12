import React from 'react'

const CurrentBabyNav = ( {currentBaby} ) => {
    return (
        <div className="current-baby">
            <span>{currentBaby.name}, {currentBaby.age} months.</span>
        </div>
    )
}

export default CurrentBabyNav
