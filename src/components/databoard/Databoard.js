import { React, useContext, useState, useEffect } from 'react'
import LoadingSpinner from "../layout-elements/LoadingSpinner";
import GraphicBars from "./GraphicBars.js"
import { DataboardContext } from "../../context/databoard.context";
import { CurrentDataContext } from '../../context/currentData.context';


const Databoard = () => {

    const { currentWeek } = useContext(CurrentDataContext)
    const { goalsDataboard, isDataUpdating } = useContext(DataboardContext);
    
    const [ isDataLoading, setIsDataLoading ] = useState(true)     
    const [ dataChart, setDataChart ] = useState(null)               

    // isDataUpdating ==> when user edited the goals
    // isDataLoading ==> when this component builds the object to show in VictoryChart

    // Builds data object for Victory Chart, when data is loaded, or when goalsDataboard.length changes
    useEffect(()=> {
    
        if (currentWeek && goalsDataboard ) {                 
            buildDataObj()
        }

    }, [currentWeek, goalsDataboard, (goalsDataboard && goalsDataboard.length)])


    const buildDataObj = () => {

        console.log("We are going to build the object to show in Victory Chart")
        
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
        
    
        setTimeout( () => {
            setDataChart(buildData)
            setIsDataLoading(false)
        }, 800)

        console.log("We just built the Object to be used in Victory Chart ===> ", buildData)
    }


    console.log("isDataUpdating???? ===> ", isDataUpdating.toString())
    console.log("isDataLoading???? ===> ", isDataLoading.toString())
    console.log("goalsDataboard length ===> ", (goalsDataboard && goalsDataboard.length))

    return (

        <div className="databoard-component comp">
            <h2 className="h2-comp">Databoard</h2>


            { ((isDataLoading || isDataUpdating)
                &&
                (currentWeek && goalsDataboard && goalsDataboard.length > 0 )) 
                &&
                <LoadingSpinner msg="Loading data for graphics..."/> 
            }

            { (goalsDataboard && goalsDataboard.length === 0 && !isDataLoading && !isDataUpdating) 
                
                &&
                        <p className="no-data-databoard">       
                            There is no data to show at the moment. 
                            <br/>Please, set the goals for the week first.
                        </p>
            }

                <>
                    <p>{isDataLoading.toString()}</p>
                    <p>{isDataUpdating.toString()}</p>
                    <p>{goalsDataboard && goalsDataboard.length}</p>
                    
                </>

            { !isDataLoading && !isDataUpdating && goalsDataboard && goalsDataboard.length > 0 &&
                <>
                    <p>HOLAAAA I ENTER!!</p>
                    <div className="databoard-graphics">
                        { dataChart && <GraphicBars dataGoals={dataChart} /> }
                    </div>
                </>
            }
        </div>

    )
}

export default Databoard