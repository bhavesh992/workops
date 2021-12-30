import React,{useState, useEffect} from 'react';
import "../styles/AddEditVersion.css";
import {Button} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import WorkOpsApi from "../api/WorkOpsBackend";

const AddEditVersion = ({id,onHandleClose}) => {
    let initialversionstate={
        name:"",
        releasedate:new Date().toLocaleDateString('en-CA'),
        description:""
    }

    const [version,setVersion]=useState(initialversionstate);
    const {projectId}=useSelector(state=>state.ProjectReducer);
    // const [issueData,setIssueData]=useState([])  
    // const getIssues=()=>{
    //     WorkOpsApi.get("/api/issues/"+projectId)
    //     .then(res=>{
    //         if(res){
    //             // console.log(res);
    //             setIssueData(res.data);
    //         }
    //     });
    // }

    useEffect(()=>{
        if(id!==undefined){
            WorkOpsApi.get("/api/versions/"+id)
            .then(res=>{
                console.log(res.data);
                initialversionstate.name=res.data.name;
                initialversionstate.releasedate=res.data.releasedate;
                initialversionstate.description=res.data.description;
                console.log(initialversionstate);
                const sd=new Date(res.data.releasedate).toLocaleDateString('en-CA');
                res.data.releasedate=sd;
                setVersion(res.data);
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
                WorkOpsApi.post("/api/versions/",{
                    name:version.name,
                    releasedate: version.releasedate,
                    description:version.description,
                    project:res1.data
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
                    alert("Error while Adding version");
                })
            });
        }
        else{
            WorkOpsApi.get("/api/projects/"+projectId)
            .then(res1=>{
                    //                     console.log(version);
                    // console.log(res1.data);                        
                    // console.log(res.data+" "+version.lead);
                WorkOpsApi.put("/api/versions/",{
                    id:id,
                    name:version.name,
                    releasedate:version.releasedate,
                    description:version.description,
                    project:version.project
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
                    alert("Error while updating version");
                })
            });
        }
    }

    const getReleaseDate=()=>{
        const sd = new Date(version.releasedate)
        // issue.duedate.slice(0,10).replace(/-/g, ' ')
        return sd.toLocaleDateString('en-CA');
    }

    return (
        <div className="addeditversion">
            <form >
                <div className="field-group">
                    <label>
                        Name
                    </label>
                    <input type="text" value={version.name}                
                        onChange={(e)=>{setVersion({...version,name:e.target.value})}}
                    />
                </div>

                <div className="field-group">
                    <label>
                        Description
                    </label>
                    <input type="text" value={version.description}
                        onChange={(e)=>{setVersion({...version,description:e.target.value})}}
                            />
                </div>

                <div className="field-group">
                    <label>
                        Release Date
                    </label>
                    <input type="date"
                        placeholder="dd-mm-yyyy"
                        min={new Date()} 
                        value={version.releasedate}
                        onChange={(e)=>{setVersion({...version,releasedate:e.target.value})}}
                        
                        /> 
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
    
export default AddEditVersion;
