import React,{useState,useEffect} from 'react';
import "../styles/AddEditProject.css";
import WorkOpsApi from "../api/WorkOpsBackend";
import { useHistory } from "react-router-dom";


const AddEditProject = ({id}) => {
    //Way 1:
    // const [name,setName]=useState("");
    // const [key,setKey]=useState("");
    // const [desc,setDesc]=useState("");
    
    //Way 2:
    let initialprojecstate={
        name:"",
        projectkey:"",
        description:""
    }

    let history = useHistory();

    const [project,setProject]=useState(initialprojecstate);
    useEffect(()=>{
        if(id!==undefined){
            WorkOpsApi.get("/api/projects/"+id)
            .then(res=>{
                setProject(res.data);
            })
        }
    },[]);
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(id===undefined){
            // console.log("In");
            WorkOpsApi.get("/api/user/"+localStorage.getItem("token"))
            .then(res=>{
            // console.log("email "+res.data.email);
                WorkOpsApi.post("/api/projects",{
                    name:project.name,
                    projectKey:project.projectkey,
                    description:project.description,
                    email:res.data.email
                })
                .then(res1=>{
                    if(res1){
            // console.log(res1);

                        history.push("/projects");
                        // console.log(res);
                    //   alert("Project Added");

                    }
                })
                .catch(e=>{
                    // alert("Error"+e.response.data);
                })
            })
        }
        else{
            WorkOpsApi.put("/api/projects",{
                    id:id,
                    name:project.name,
                    projectkey:project.projectkey,
                    description:project.description
                })
            .then(res=>{
                if(res){
                    // console.log(res);
                  alert(res.data);
                }
            })
            .catch(e=>{
                alert(e);
            })
        }
    }
    return (
        <div>
            <form >
                <div className="field-group">
                    <label>
                        Name
                    </label>
                    <input type="text" value={project.name}
                    //  placeholder="Enter name"
                        disabled={id!==undefined}
                        onChange={(e)=>{setProject({...project,name:e.target.value})}}
                     />
                </div>
                <div className="field-group">
                    <label>
                        Key
                    </label>
                    <input type="text" value={project.projectkey} 
                        onChange={(e)=>{setProject({...project,projectkey:e.target.value})}}
                        maxLength="4"
// placeholder="Enter Key" 
                    style={{width:"30%"}}/>
                </div>
                <div className="field-group">
                    <label>
                        URL
                    </label>
                    <input type="text" value={"https://www.google.com/"}  
                    // placeholder="Enter URL"
                    />
                </div>
                <div className="field-group">
                    <label>
                        Description
                    </label>
                    <textarea rows="4" cols="50" style={{width:"80%"}} 
                    // placeholder="enter description"
                    value={project.description}
                    onChange={(e)=>{setProject({...project,description:e.target.value})}}
                    >
                    </textarea>
                </div>
                <div className="field-group">
                    <label>
                        Default Assignee
                    </label>
                    <select>
                        <option value="11"></option>
                        <option value="1" selected={id!==undefined}>Project Lead</option>
                        <option value="2">Unassigned</option>
                    </select>
                </div>
                <div className="buttons_container">
                    <input type="submit" value="Save Details" className="submitbutton" onClick={handleSubmit}/>
                    <a href="">Cancel</a>
                </div>
            </form>
        </div>
    );
}

export default AddEditProject;
