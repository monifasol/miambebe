import { React, useContext } from 'react'
import { DataContext } from "../../context/data.context";
import Moment from 'react-moment';

const Logs = () => {

  const { currentBaby } = useContext(DataContext);

  const sortByUpdatedDate = (a, b) => {
    if (a.updatedAt < b.updatedAt) return 1
    if (a.updatedAt > b.updatedAt) return -1
    else return 0
  }


  return (
    <div className="logs-component comp">
        <h2 className="h2-comp">Latest progress </h2>

        { currentBaby && currentBaby.goals && currentBaby.goals.sort(sortByUpdatedDate).map((goal) => 

          <div key={goal._id}>
            
          { goal.quantityGoal !== 0 
            &&
            
              <p className="log"> 
                <Moment fromNow>{goal.updatedAt}</Moment>:
                  <span className="portions">{goal.quantityAccomplished} portions</span>
                   of 
                   <span className="foodgroup">{goal.foodgroup.name} </span> given.
              </p>
          }

          </div>
        
        )}

    </div>
  )
}

export default Logs;
