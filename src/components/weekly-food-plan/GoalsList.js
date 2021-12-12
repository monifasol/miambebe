import { React, render, ReactDOM, useEffect, useState, useContext, useRef, createElement } from 'react'
import GoalForm from './GoalForm';
import GoalFormExtra from './GoalFormExtra';
import { CurrentDataContext } from '../../context/currentData.context';


const GoalsList = () => {

    const { currentWeek } = useContext(CurrentDataContext);

    const elementRef = useRef(null);

    const addNewGoalInput = () => {

      const divElement = elementRef.current;

      //const JSXelement = <GoalFormExtra />;
      //ReactDOM.render(
      //  JSXelement,
      //  divElement
      //);

      const JSXelement = createElement('div', null, <GoalFormExtra />);
      divElement.innerHTML = "Hola Moni, it works"
      divElement.append(JSXelement)

      console.log("My React Comp: ", JSXelement)
      console.log("what to append: " , JSXelement.props.children)
      console.log("Container looks like: ", divElement); 
    }


    return (
        <div> 

              <>
                { currentWeek.goals.map(( goal ) => ( <GoalForm goal={goal} key={goal._id}/> )) }
                <div className='btn' onClick={addNewGoalInput}>Add another food goal!</div>
                <div id="aqui" ref={elementRef}></div> 
              </>
            
        </div>
    )
}



export default GoalsList

