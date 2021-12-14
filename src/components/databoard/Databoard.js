import { React, useContext, useState, useEffect } from 'react'
import LoadingSpinner from "../layout-elements/LoadingSpinner";
import GraphicBars from "./GraphicBars.js"
import { CurrentDataContext } from '../../context/currentData.context';


import axios from "axios";
import env from "react-dotenv";

const token = localStorage.getItem("authToken");
const API_URI = env.SERVER_API_URL;


const Databoard = ( { goals } ) => {

    const { currentWeek, currentBaby } = useContext(CurrentDataContext)
    const [ isDataLoading, setIsDataLoading ] = useState(true)     
    const [ dataChart, setDataChart ] = useState(null)   

    
    // Calls "buildGoalsArrObj" on component mount, to use in Victory Chart.
    useEffect( ()=> {
        if (goals) {
            console.log("DATABOARD FINISHED MOUNTING, OR GOALS CHANGED. Goals: ", goals)
            buildDataObj(goals)  
        }
    }, [goals]);


    const buildDataObj = () => {
        
        setIsDataLoading(true)          // every time I build the Obj again, I setIsDataLoading = true

        console.log("About to build OBJ to show in Victory Chart: ", goals)
        
        // Sort the array first
        const sortedArray = goals.sort((a, b) => {
            if ((a.foodgroup).localeCompare(b.foodgroup) === 1) return 1
            if ((a.foodgroup).localeCompare(b.foodgroup) === -1) return -1
            else return 0
        })

        let buildData = []
        let counter = 1
        let populatedFoodgroup = null

        sortedArray.forEach( (goal, i) => {

            if (goal.quantityGoal !== 0 ) {
                axios  // Aims to populate foodgroup
                    .get(`${API_URI}/goals/${goal._id}`, {              
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((response) => {
                        const foundGoal = response.data.data
                        populatedFoodgroup = foundGoal.foodgroup.name

                        // create the Goal Object
                        
                            let givenQ = parseInt(goal.quantityAccomplished)
                            let goalQ = parseInt(goal.quantityGoal)
                            let percentageGiven = parseInt((givenQ / goalQ) * 100)
            
                            let goalObj = {
                                foodgroup: counter,        // +1, to avoid to start form 0 in the X-axis in the Graphics
                                labelFoodgroup: populatedFoodgroup,
                                given: percentageGiven || 0, 
                                goalQ,
                                givenQ
                            }
                            counter++
                            buildData.push(goalObj)     // Pushes Object to array of goals objects
                    })
                    .catch((error) => console.log(error));   
            }
        })  
        
        setDataChart(buildData)
        
        setTimeout(()=> {
            setIsDataLoading(false)         // show spinner
        },1000) 
    
        console.log("FINISH BUILDING OBJ to be used in Victory Chart ===> ", buildData)

    }


    const areGoalQuantiesEmpty = () => {
        let empty = true
       if (goals) goals.forEach((goal) => { if (goal.quantityGoal !== 0) empty = false })
       return empty
    }

    console.log("isDataLoading??? ===> ", isDataLoading.toString())
    console.log("goals length??? ===> ", (goals && goals.length))
    console.log("goals??? ===> ", (goals))
    console.log("===> DATACHART (TO SHOW IN VICTORY CHART) ---> ", dataChart)

    return (

        <div className="databoard-component comp">
            <h2 className="h2-comp">Databoard</h2>

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
                        { dataChart && <GraphicBars dataGoals={dataChart} /> }
                    </div>
                </>
            }
        </div>

    )
}

export default Databoard