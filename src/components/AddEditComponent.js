import React,{useState,useEffect} from 'react';
import "../styles/AddEditComponent.css";
import {Button} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import WorkOpsApi from "../api/WorkOpsBackend";

const AddEditComponent = ({id,onHandleClose}) => {
    let initialprojecstate={
        name:"",
        description:"",
        lead:""
    }
    const [component,setComponent]=useState(initialprojecstate);
    const {projectId}=useSelector(state=>state.ProjectReducer);
    const [teamData,setTeamData]=useState([])    
    const getTeam=()=>{
        WorkOpsApi.get("/api/projectteam/"+projectId)
        .then(res=>{
            if(res){
                // console.log(res);
                setTeamData(res.data);
            }
        });
    }
    useEffect(()=>{
        if(id!==undefined){
            WorkOpsApi.get("/api/components/"+id)
            .then(res=>{
                // console.log(res.data);
                initialprojecstate.name=res.data.name;
                initialprojecstate.description=res.data.description;
                initialprojecstate.lead=res.data.user.email;
                setComponent(initialprojecstate);
            })
        }
        getTeam();
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(id===undefined){
            WorkOpsApi.get("/api/userprofiles/"+component.lead)
            .then(res=>{
               if(res){
                WorkOpsApi.get("/api/projects/"+projectId)
                .then(res1=>{
                    console.log("up= "+res.data);
                    WorkOpsApi.post("/api/components/",{
                        name:component.name,
                        description:component.description,
                        project:res1.data,
                        user:res.data
                    })
                    .then(res2=>{
                        // console.log(component);
                        // console.log(res1.data);                        
                        // console.log(res.data);
                        if(res2){
                            onHandleClose();
                        }
                    })
                    .catch(e=>{
                        console.log(e);
                        alert("Error while Adding component");
                    })
                });
               } 
            });
        }
        else{
            WorkOpsApi.get("/api/userprofiles/"+component.lead)
            .then(res=>{
               if(res){
                WorkOpsApi.get("/api/projects/"+projectId)
                .then(res1=>{
                        //                     console.log(component);
                        // console.log(res1.data);                        
                        // console.log(res.data+" "+component.lead);
                    WorkOpsApi.put("/api/components/",{
                        id:id,
                        name:component.name,
                        description:component.description,
                        project:res1.data,
                        user:res.data
                    })
                    .then(res2=>{
                        // console.log(component);
                        // console.log(res1.data);                        
                        // console.log(res.data);
                        if(res2){
                            onHandleClose();
                        }
                    })
                    .catch(e=>{
                        // console.log(e);
                        alert("Error while updating component");
                    })
                });
               } 
            });
        }
    }
    return (
        <div className="addeditcomponent">
            <form>
                <div className="field-group">
                    <label>
                        Name
                    </label>
                    <input type="text" value={component.name}
                        disabled={id!==undefined}                        
                        onChange={(e)=>{setComponent({...component,name:e.target.value})}}
                    //  placeholder="Enter name"
                     />
                </div>
                <div className="field-group">
                    <label>
                        Description
                    </label>
                    <input type="text" value={component.description}
                        onChange={(e)=>{setComponent({...component,description:e.target.value})}}
                        //  placeholder="Enter name"
                     />
                </div>
                <div className="field-group">
                    <label>
                        Component Lead
                    </label>
                    <select value={component.lead}
                        onChange={(e)=>{setComponent({...component,lead:e.target.value})}}                    
                    >
                        <option value=""></option>
                        {
                            teamData.map((t)=>
                                <option value={t.id.user.email}>{t.id.user.fullName}</option>
                                )
                        }
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

export default AddEditComponent;
