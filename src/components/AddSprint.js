import React,{useState, useEffect} from 'react';
import "../styles/AddSprint.css";
import {Button} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import WorkOpsApi from "../api/WorkOpsBackend";

const AddSprint = ({id,onHandleClose}) => {

    let initialsprintstate={
        name:"",
        completed:"0",
        sequence:"1",
        startdate:new Date().toLocaleDateString('en-CA'),
        enddate:new Date().toLocaleDateString('en-CA'),
        goal:"",
        projectid:""
    }

    const [sprint,setSprint]=useState(initialsprintstate);
    const {projectId}=useSelector(state=>state.ProjectReducer);

    useEffect(()=>{
        if(id!==undefined){
            WorkOpsApi.get("/api/sprint/"+id)
            .then(res=>{
                console.log(res.data);
                initialsprintstate.name=res.data.name;
                initialsprintstate.startdate=res.data.startdate;
                initialsprintstate.enddate=res.data.enddate;
                initialsprintstate.goal=res.data.goal;
                initialsprintstate.completed=res.data.completed;
                initialsprintstate.sequence=res.data.sequence;
                initialsprintstate.projectid=res.data.projectid;
                // console.log(initialsprintstate);
                res.data.startdate=new Date(res.data.startdate).toLocaleDateString('en-CA');
                res.data.enddate=new Date(res.data.enddate).toLocaleDateString('en-CA');
                setSprint(res.data);
                // console.log(version)
            })
        }
        // getIssues();
    },[])


    const handleSubmit=(e)=>{
        e.preventDefault();
        if(id===undefined){
            // console.log("In");
            WorkOpsApi.get("/api/projects/"+projectId)
            .then(res1=>{
                // console.log("up= "+res1.data);

                WorkOpsApi.post("/api/sprint/",{
                    name:sprint.name,
                    startdate: sprint.startdate,
                    enddate: sprint.enddate,
                    goal:sprint.goal,
                    completed:sprint.completed,
                    sequence:sprint.sequence,
                    projectid:sprint.project
                })
                .then(res2=>{
                    // console.log(version);
                    // console.log(res1.data);                        
                    // console.log(res.data);
                    if(res2){
                        onHandleClose();
                    }
                })
                .catch(e=>{
                    alert("Error while Adding sprint");
                })
            });
        }
        else{
            WorkOpsApi.get("/api/projects/"+projectId)
            .then(res1=>{
                    //                     console.log(version);
                    // console.log(res1.data);                        
                    // console.log(res.data+" "+version.lead);

                WorkOpsApi.put("/api/sprint/",{
                    id:id,
                    name:sprint.name,
                    startdate:sprint.startdate,
                    enddate:sprint.enddate,
                    goal:sprint.goal,
                    completed:sprint.completed,
                    sequence:sprint.sequence,
                    project:sprint.project
                })
                .then(res2=>{
                    // console.log(version);
                    // console.log(res1.data);                        
                    // console.log(res.data);
                    if(res2){
                        onHandleClose();
                    }
                })
                .catch(e=>{
                    // console.log(e);
                    alert("Error while updating sprint");
                })
            });
        }
    }


    return (
        <div>
            <form >
                <div className="field-group">
                    <label>
                        Name
                    </label>
                    <input type="text" value={sprint.name}
                        onChange={(e)=>{setSprint({...sprint,name:e.target.value})}}
                     />
                </div>
                <div className="field-group">
                    <label>
                        Start date
                    </label>
                    <input type="date" name="startdate" id="startdate"
                        placeholder="dd-mm-yyyy"
                        min={sprint.startdate} 
                        value={sprint.startdate}
                        onChange={(e)=>{setSprint({...sprint,startdate:e.target.value})}}
                        /> 
                </div>
                <div className="field-group">
                    <label>
                        End date
                    </label>
                    <input type="date" name="enddate" id="enddate"
                        placeholder="dd-mm-yyyy" 
                        value={sprint.enddate}
                        min={sprint.enddate}
                        onChange={(e)=>{setSprint({...sprint,enddate:e.target.value})}}
                        
                        /> 
                </div>
                <div className="field-group">
                    <label>
                        Goal
                    </label>
                    <input type="text" value={sprint.goal}
                        onChange={(e)=>{setSprint({...sprint,goal:e.target.value})}}
                            />              
                </div>

                <div className="field-group">
                    <label>
                        Completed?
                    </label>
                    <select value={sprint.completed}
                        onChange={(e)=>{setSprint({...sprint,completed:e.target.value})}}                    
                    >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                        {/* <option value="1" selected={id!==undefined}>Sunil</option>
                        <option value="2">Assignee</option> */}
                    </select>
                </div>

                <div className="buttons_container">
                    {/* <input type="submit" value="close   " className="closebutton"/>
                    <input type="submit" value="Save" className="submitbutton"/> */}
                    <Button style={{width:"15%"}} variant="secondary" onClick={onHandleClose}>
                        Close
                    </Button>
                    <Button style={{width:"20%"}} variant="primary" type="submit" onClick={handleSubmit}>Save</Button>
                </div>
            </form>
        </div>
    );
}

export default AddSprint;



// <div className="field-group">
// <label>
//     Issues to include in sprint
// </label>
// <select>
//     <option value="1">Issue 1</option>
//     <option value="2">Issue 2</option>
//     <option value="3">Issue 3</option>
// </select>
// </div>