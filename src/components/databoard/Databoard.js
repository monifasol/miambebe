import { React, useContext, useState, useEffect } from 'react'
import LoadingSpinner from "../layout-elements/LoadingSpinner";
import GraphicBars from "./GraphicBars.js"
import { DataContext } from '../../context/data.context';


const Databoard = ( { goals } ) => {

    const { currentBaby } = useContext(DataContext)
    const [ isDataLoading, setIsDataLoading ] = useState(true)          // first time Databoard loads

    const [ dataChart, setDataChart ] = useState(null)   
    const [ labelsChart, setLabelsChart ] = useState(null) 

    // Calls "buildGoalsArrObj" on component mount, to use in Victory Chart.
    useEffect( ()=> { 
        goals && buildDataObj(goals) 
    }, [goals]);


    // Build labels for the graphics. 
    // This is needed, to make match the BAR with the LABEL in the graphic!
    useEffect( ()=> {
        dataChart && setLabelsChart(dataChart.map( item => item.labelFoodgroup))
    }, [dataChart]);

    const buildDataObj = () => {
                    
        let buildData = []
        let counter = 1

        goals.forEach( (goal, i) => {

            //console.log(`${i}: lets see in which order im iterating over the goals: ${goal.foodgroup.name}`)

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
            setIsDataLoading(false)         // show spinner first time it loads
        },1000) 

    }


    const areGoalQuantiesEmpty = () => {
        let empty = true
       if (goals) goals.forEach((goal) => { if (goal.quantityGoal !== 0) empty = false })
       return empty
    }
    

    return (

        <div className="databoard-component comp">
        
            { !isDataLoading && goals && goals.length > 0 && dataChart && 
                <>
                    <span className="graphics-label-foodgroup">Foodgroup</span>
                    <span className="graphics-label-given">Given</span>

                </>
            }

            <h2 className="h2-comp">Databoard</h2>
                
            { (!currentBaby || (!isDataLoading && areGoalQuantiesEmpty())) 
            
                &&
                
                <p className="no-data-databoard">       
                    There is no data to show at the moment. 
                    <br/>Please, first, set a first goal.
                </p>
            }

            {   (isDataLoading ) 
                && 
                (currentBaby && goals && goals.length > 0 )
                &&
                <LoadingSpinner msg="Loading data for graphics..."/> 
            }

            { !isDataLoading && goals && goals.length > 0 &&
                <>
                    <div className="databoard-graphics">
                        { dataChart && 
                            <GraphicBars dataGoals={dataChart} labelsFoodgroups={labelsChart} /> 
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default Databoard