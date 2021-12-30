import React,{useState} from 'react';
import "../styles/AddEditComponent.css";
import {Button} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import WorkOpsApi from "../api/WorkOpsBackend";


const AddTeamMember = ({onHandleClose}) => {

    const [email,setEmail]=useState("");
    const {projectId}=useSelector(state=>state.ProjectReducer);    
    const handleSubmit=()=>{
        WorkOpsApi.get("/api/userprofiles/"+email)
        .then(res=>{
            if(res){
                WorkOpsApi.post("/api/projectteam",{
                    id:{
                        user:res.data,
                        projectId
                    },
                    role:{
                        id:2,
                        role:"Basic"
                    }
                })
                .then(res1=>{
                    if(res1){
                        onHandleClose();
                    }
                })
                .catch(e=>{
                    alert("Error while Adding Member");
                })   
            }     
        })
    }
    return (
        <div>
            <form >
                <div className="field-group">
                    <label>
                        Email
                    </label>
                    <input type="email" required
                    //  placeholder="Enter name"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                     />
                </div>
                <div className="buttons_container">
                    {/* <input type="submit" value="close   " className="closebutton"/>
                    <input type="submit" value="Save" className="submitbutton"/> */}
                    <Button style={{width:"15%"}} variant="secondary" onClick={onHandleClose}>
                        Close
                    </Button>
                    <Button style={{width:"20%"}} variant="primary" onClick={handleSubmit}>Save</Button>
                </div>
            </form>
        </div>
    );
}

export default AddTeamMember;
