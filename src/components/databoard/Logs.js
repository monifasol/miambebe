import { React, useContext } from 'react'
import { DataContext } from "../../context/data.context";
import Moment from 'react-moment';

const Logs = () => {

  const { currentWeek } = useContext(DataContext);

  return (
    <div className="logs-component comp">
        <h2 className="h2-comp">Latest food you gave to Dahlia</h2>

        { currentWeek && currentWeek.goals && currentWeek.goals.map((goal) => 

          <div key={goal._id}>
            
          { goal.quantityGoal !== 0 
            &&
            
              <p className="log"> 
                  You gave {goal.quantityAccomplished} portions of {goal.foodgroup.name}, <Moment fromNow>{goal.updatedAt}</Moment>.
              </p>
          }

          </div>
        
        )}

    </div>
  )
}

export default Logs;
