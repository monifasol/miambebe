import { React, useContext, useState, useEffect } from 'react'
import LoadingSpinner from "../layout-elements/LoadingSpinner";
import GraphicBars from "./GraphicBars.js"
import { DataboardContext } from "../../context/databoard.context";
import { CurrentDataContext } from '../../context/currentData.context';


const Databoard = () => {

    const { currentWeek, currentBaby } = useContext(CurrentDataContext)
    const { goalsDataboard, isDataUpdating } = useContext(DataboardContext);
    
    const [ isDataLoading, setIsDataLoading ] = useState(true)     
    const [ dataChart, setDataChart ] = useState(null)               

    // =====================
    // Legend variables: 
    // isDataUpdating ==> when user edited the goals
    // isDataLoading ==> when this component builds the object to show in VictoryChart
    // =====================
    
    // Builds data object for Victory Chart, when data is loaded, or when goalsDataboard.length changes
    useEffect( ()=> {
    
        if (currentWeek && goalsDataboard && !isDataUpdating) {     
            
            setTimeout( () => {
                buildDataObj()
            }, 300)
        }

    }, [currentWeek, goalsDataboard, isDataUpdating])


    // For this we need the goalsDataboard loaded for sure.
    const buildDataObj = () => {
        
        console.log("We are going to build the object to show in Victory Chart: ", goalsDataboard)
        
        // Sort the array first
        const sortedArray = goalsDataboard.sort((a, b) => {
            if ((a.foodgroup).localeCompare(b.foodgroup) === 1) return 1
            if ((a.foodgroup).localeCompare(b.foodgroup) === -1) return -1
            else return 0
        })

        let buildData = []
        let counter = 1

        sortedArray.forEach( (goal, i) => {
            if (goal.quantityGoal !== 0 ) {
                let givenQ = parseInt(goal.quantityAccomplished)
                let goalQ = parseInt(goal.quantityGoal)
                let percentageGiven = parseInt((givenQ / goalQ) * 100)

                let goalObj = {
                    foodgroup: counter,        // +1, to avoid to start form 0 in the X-axis in the Graphics
                    labelFoodgroup: goal.foodgroup,
                    given: percentageGiven || 0, 
                    goalQ,
                    givenQ
                }
                counter++
                buildData.push(goalObj)
            }
        })  

        //setDataChart(buildData)
        
        setDataChart(buildData)
        setIsDataLoading(false)
    
        console.log("We just built the Object to be used in Victory Chart ===> ", buildData)

    }

    const areGoalsEmpty = () => {

        let empty = true

       if (goalsDataboard) {
            goalsDataboard.forEach((goal) => { if (goal.quantityGoal !== 0) empty = false })
       }

       return empty
    }

    //console.log("isDataUpdating??? ===> ", isDataUpdating.toString())
    //console.log("isDataLoading??? ===> ", isDataLoading.toString())
    //console.log("goalsDataboard length??? ===> ", (goalsDataboard && goalsDataboard.length))
    //console.log("goalsDataboard??? ===> ", (goalsDataboard))

    return (

        <div className="databoard-component comp">
            <h2 className="h2-comp">Databoard</h2>


            { (!currentBaby || !currentWeek || (!isDataLoading && !isDataUpdating && areGoalsEmpty())) 
            
                &&
                
                <p className="no-data-databoard">       
                    There is no data to show at the moment. 
                    <br/>Please, set the goals for the week first.
                </p>
            }


            {   (isDataLoading || isDataUpdating) 
                && 
                (currentBaby && currentWeek && goalsDataboard && goalsDataboard.length > 0 )
                &&

                <LoadingSpinner msg="Loading data for graphics..."/> 
            }

            { !isDataLoading && !isDataUpdating && goalsDataboard && goalsDataboard.length > 0 &&
                <>
                    <div className="databoard-graphics">
                        { dataChart && <GraphicBars dataGoals={dataChart} /> }
                    </div>
                </>
            }
        </div>

    )
}

export default Databoard