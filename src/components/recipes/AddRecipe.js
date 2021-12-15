import { React } from 'react'
//import axios from "axios";
//import { DataContext } from '../../context/data.context'
//import { UploadPicture } from '../UploadPicture';

//const API_URI = process.env.REACT_APP_API_URL || 'http://localhost:5000';
//const token = localStorage.getItem("authToken");

const AddRecipe = () => {

    /*
    const [formState, setFormState] = useState({})
    const { currentUser, foodgroups } = useContext(DataContext)

    function handleSubmit(e) {
        e.preventDefault()

        let tooltipEl = document.querySelector('.tooltip-form.info')
        let tooltipErr = document.querySelector('.tooltip-form.error')
        
        const requestBody = formState    
    
        if ( Object.keys(formState).length === 0 ) {

            tooltipErr.classList.add('show')
            tooltipErr.innerText = `All fields are empty!`
            setTimeout(()=>{ tooltipErr.classList.remove('show')}, 1000)

        } else if (formState.title === "" || formState.content === "")  {
            
            tooltipErr.classList.add('show')
            tooltipErr.innerText = `Title and content can't be empty`
            setTimeout(()=>{ tooltipErr.classList.remove('show')}, 1000)
        } else {
            
            axios
                .post(`${API_URI}/recipes/${currentUser._id}`, requestBody, {        
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    tooltipEl.classList.add('show')
                    tooltipEl.innerText = `Baby successfully saved!`


                    setTimeout(()=>{ 
                        tooltipEl.classList.remove('show')
                        e.target.parentElement.classList.remove('show')
                        document.getElementById('overlayModals').classList.remove('show')
                    }, 1000)
                })
                .catch((error) => {
                    console.log(error)
                })
        
        } 

        setFormState({})    // reset the form
    }

    function handleInput(e){
        let {name, value } = e.target
        setFormState(Object.assign({}, formState, {[name]: value}))
    }

    */
    return (
        <>

            <div className="not-available">
                <p> This functionality is not available yet.</p>
                <p> Please check our available recipes!</p>
            </div>


        {/* This needs to be worked on, in another moment. It needs a consistent database structure for
            intolerances, tags, etc.  */}


         {/*
            <form className="form" onSubmit={handleSubmit}>
           
                <span className="tooltip-form general info"></span>
                <span className="tooltip-form general error"></span>

                <p className="field-row">
                    <label htmlFor="title">Title: </label>
                    <input type="text" 
                            name="title" 
                            value={formState.title || ""} 
                            onChange={(e) => handleInput(e) } />
                </p>

                <p className="field-row">
                    <label htmlFor="content">Content: </label>
                    <input type="text" 
                            name="content" 
                            value={formState.content || ""} 
                            onChange={(e) => handleInput(e) } />
                </p>
                

                <p className="field-row">
                    <label htmlFor="weight">Preparation time <small>(in minutes)</small></label>
                    <input type="text" 
                            name="preparationTime" 
                            value={formState.preparationTime || ""} 
                            onChange={(e) => handleInput(e) } />
                </p>

                <p className="field-row">
                    <label htmlFor="weight">Difficulty</label>

                    <select value={formState.difficulty || "easy" } onChange={(e) => handleInput(e) } >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>

                </p>

                <p className="field-row">
                    <label htmlFor="weight">Tags</label>

                    <div className="group-checkboxes">
                        { foodgroups && foodgroups.map( ()=> 
                            <>  
                                <input name="tags"
                                    type="checkbox"
                                    //checked={ formState.tags.isTagged }
                                    onChange={(e) => handleInput(e) } />
                            </>
                        ) }
                    </div>
                </p>
               
                <p className="field-row">
                    <label htmlFor="weight">Intolerances</label>

                    <div className="group-checkboxes">
                        { intolerances && intolerances.map( ()=> 
                            <>  
                                <input name="tags"
                                    type="checkbox"
                                    //checked={ formState.tags.isTagged }
                                    onChange={(e) => handleInput(e) } />
                            </>
                        ) }
                    </div>
                </p>   

                <UploadPicture />

                <button type="submit" className="btn">Save baby</button>
            </form>

                */}
        </>
    )
}

export default AddRecipe
