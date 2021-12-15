import { React, useContext, useState, useEffect } from 'react'
import LoadingSpinner from "../layout-elements/LoadingSpinner";
import GraphicBars from "./GraphicBars.js"
import { CurrentDataContext } from '../../context/currentData.context';


const Databoard = ( { goals } ) => {

    const { currentWeek, currentBaby } = useContext(CurrentDataContext)
    const [ isDataLoading, setIsDataLoading ] = useState(true)     

    const [ dataChart, setDataChart ] = useState(null)   
    const [ labelsChart, setLabelsChart ] = useState(null) 
    const [ tickValuesChart, setTickValuesChart ] = useState(null) 


    // Calls "buildGoalsArrObj" on component mount, to use in Victory Chart.
    useEffect( ()=> {
        if (goals) buildDataObj(goals)
    }, [goals]);


    useEffect( ()=> {
        if (dataChart) {

            // Build labels and tick values data
            let labelsFoodgroups = dataChart.map( item => item.labelFoodgroup)
            let arrayTickValues = dataChart.map( item => item.foodgroup) 

            setLabelsChart(labelsFoodgroups)
            setTickValuesChart(arrayTickValues)
        }
    }, [dataChart]);


    const buildDataObj = () => {
                    
        let buildData = []
        let counter = 1

        console.log("LETS SEE THIS GOALS ====> ", goals)

        goals.forEach( (goal, i) => {

            if (goal.quantityGoal !== 0 ) {

                let givenQ = parseInt(goal.quantityAccomplished)
                            let goalQ = parseInt(goal.quantityGoal)
                            let percentageGiven = parseInt((givenQ / goalQ) * 100)
            
                let goalObj = {
                    foodgroup: counter,        // +1, to avoid to start form 0 in the X-axis in the Graphics
                    labelFoodgroup: goal.foodgroup.name,
                    given: percentageGiven || 0, 
                    goalQ,
                    givenQ
                }

                counter++
                buildData.push(goalObj) 
            }
        })  

        setDataChart(buildData)

        setTimeout(()=> {        
            setIsDataLoading(false)         // show spinner
        },1000) 

    }


    const areGoalQuantiesEmpty = () => {
        let empty = true
       if (goals) goals.forEach((goal) => { if (goal.quantityGoal !== 0) empty = false })
       return empty
    }
    

    return (

        <div className="databoard-component comp">
        
            <h2 className="h2-comp">Databoard</h2>

                    <span className="graphics-label-foodgroup">Foodgroup</span>
                    <span className="graphics-label-given">Given</span>

            { (!currentBaby || !currentWeek || (!isDataLoading && areGoalQuantiesEmpty())) 
            
                &&
                
                <p className="no-data-databoard">       
                    There is no data to show at the moment. 
                    <br/>Please, set the goals for the week first.
                </p>
            }


            {   (isDataLoading ) 
                && 
                (currentBaby && currentWeek && goals && goals.length > 0 )
                &&

                <LoadingSpinner msg="Loading data for graphics..."/> 
            }

            { !isDataLoading && goals && goals.length > 0 &&
                <>
                    <div className="databoard-graphics">
                        { dataChart && <GraphicBars dataGoals={dataChart} labelsFoodgroups={labelsChart} arrayTickValues={tickValuesChart} /> }
                    </div>
                </>
            }
        </div>

    )
}

export default Databoard