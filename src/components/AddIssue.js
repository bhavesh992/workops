import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import "../styles/AddIssue.css";
import {useSelector} from 'react-redux';
import WorkOpsApi from "../api/WorkOpsBackend";

const AddIssue = ({id}) => {

    let initialissuestate={
        name:"",
        issuetype:"it2",
        duedate:"",
        description:"",
        issuepriority:"ip3",
        issuestatus:"is1",
        reportedby:"",
        assignedto:"",
        createdby:"",
        projectid:""
    }

    const [issue,setIssue]= useState(initialissuestate)
    const [projectName,setProjectName]=useState('') 
    const [teamData,setTeamData]=useState([])   
    const [issueTypeData,setIssueTypeData]=useState([])    
    const [issuePriorityData,setIssuePriorityData]=useState([])    
    const [issueStatusData,setIssueStatusData]=useState([])   
    const {projectId}=useSelector(state=>state.ProjectReducer);

    const getProject=()=>{
        WorkOpsApi.get("/api/projects/"+projectId)
        // WorkOpsApi.get("/api/projects/101")
        .then(res=>{
            if(res){
                // console.log(res);
                setProjectName(res.data.name);
            }
        });
    }
    
    const getIssueType=()=>{
        WorkOpsApi.get("/api/issuetypes")
        .then(res=>{
            if(res){
                // console.log(res);
                setIssueTypeData(res.data);
            }
        });
    }
    const getIssuePriority=()=>{
        WorkOpsApi.get("/api/issueprioritys")
        .then(res=>{
            if(res){
                // console.log(res);
                setIssuePriorityData(res.data);
            }
        });
    }
    const getIssueStatus=()=>{
        WorkOpsApi.get("/api/issuestatus")
        .then(res=>{
            if(res){
                // console.log(res);
                setIssueStatusData(res.data);
            }
        });
    }
    const getTeam=()=>{
        WorkOpsApi.get("/api/projectteam/"+projectId)
        // WorkOpsApi.get("/api/projectteam/101")
        .then(res=>{
            if(res){
                // console.log(res);
                setTeamData(res.data);
            }
        });
    }


    useEffect(()=>{
        if(id!==undefined){
            WorkOpsApi.get("/api/issues/"+id)
            .then(res=>{
                // console.log(res.data);
                initialissuestate.name=res.data.name;
                initialissuestate.issuetype=res.data.issuetypeBean.id;
                initialissuestate.duedate=res.data.duedate;
                initialissuestate.description=res.data.description;
                initialissuestate.issuepriority=res.data.issuepriorityBean.id;
                initialissuestate.issuestatus=res.data.issuestatus.id;
                initialissuestate.reportedby=res.data.user3.email;
                initialissuestate.assignedto=res.data.user1.email;
                initialissuestate.createdby=res.data.user2.email;
                setIssue(initialissuestate);
            })
        }

        else{
            WorkOpsApi.get("/api/user/"+localStorage.getItem("token"))
            .then(res=>{
                WorkOpsApi.get("/api/userprofiles/"+res.data.email)
                .then(res1=>{
                    // console.log(res1.data);
                    initialissuestate.createdby=res1.data;
                    // initialissuestate.projectid=projectId;
                    // initialissuestate.projectid="101";
                    setIssue(initialissuestate);
                })
            })
        }

        getProject();        
        console.log('******************'+projectId)
        getIssueType();
        getIssuePriority();
        getIssueStatus();
        getTeam();
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(id===undefined){
            // console.log("In");
            // WorkOpsApi.get("/api/projects/"+projectId)
            // console.log(issue.issuestatus)
            // console.log(issue.issuetype)

            WorkOpsApi.get("/api/issuetypes/"+issue.issuetype)
            .then(resIT=>{
                if(resIT){
                    WorkOpsApi.get("/api/issuestatus/"+issue.issuestatus)
                    .then(resIS=>{
                    if(resIS){
                        WorkOpsApi.get("/api/issueprioritys/"+issue.issuepriority)
                        .then(resIP=>{
                        if(resIP){
                            WorkOpsApi.get("/api/userprofiles/"+issue.reportedby)
                            .then(resReportedby=>{
                                if(resReportedby){
                                    WorkOpsApi.get("/api/userprofiles/"+issue.assignedto)
                                    .then(resAssignedto=>{
                                        if(resAssignedto){
                                            WorkOpsApi.get("/api/projects/"+projectId)
                                            .then(res1=>{
                                                const issueobj={
                                                    name:issue.name,
                                                    issuetype:resIT.data,
                                                    duedate:issue.duedate,
                                                    description:issue.description,
                                                    issuepriority:resIP.data,
                                                    issuestatus:resIS.data,
                                                    reportedby:resReportedby.data,
                                                    assignedto:resAssignedto.data,
                                                    createdby:issue.createdby,
                                                    projectid:res1.data,
                                                    // sprintid:'',
                                                    
                                                }
                                                console.log(issueobj)

                                                WorkOpsApi.post("/api/issues",{
                                                    name:issue.name,
                                                    issuetypeBean:resIT.data,
                                                    duedate:issue.duedate,
                                                    description:issue.description,
                                                    issuepriorityBean:resIP.data,
                                                    issuestatus:resIS.data,
                                                    user3:resReportedby.data,
                                                    user1:resAssignedto.data,
                                                    user2:issue.createdby,
                                                    project:res1.data
        
                                                })
                                                .then(res2=>{
                                                    // console.log(version);
                                                    // console.log(res1.data);                        
                                                    // console.log(res.data);
                                                    if(res2){
                                                        alert("Added issue to database")
                                                    }
                                                })
                                                .catch(e=>{
                                                    alert("Error while Adding issue");
                                                })
                                            });
                                        }
                                    });
                                }
                            });
                                
                        }
                        });
                    }
                    });
                }
                });
        }    

        else{
            WorkOpsApi.get("/api/issuetypes/"+issue.issuetype)
            .then(resIT=>{
                if(resIT){
                    WorkOpsApi.get("/api/issuestatus/"+issue.issuestatus)
                    .then(resIS=>{
                    if(resIS){
                        WorkOpsApi.get("/api/issueprioritys/"+issue.issuepriority)
                        .then(resIP=>{
                        if(resIP){
                            WorkOpsApi.get("/api/userprofiles/"+issue.reportedby)
                            .then(resReportedby=>{
                                if(resReportedby){
                                    WorkOpsApi.get("/api/userprofiles/"+issue.assignedto)
                                    .then(resAssignedto=>{
                                        if(resAssignedto){
                                            WorkOpsApi.get("/api/projects/"+projectId)
                                            .then(res1=>{
                                                const issueobj={
                                                    id:id,
                                                    name:issue.name,
                                                    issuetype:resIT.data,
                                                    duedate:issue.duedate,
                                                    description:issue.description,
                                                    issuepriority:resIP.data,
                                                    issuestatus:resIS.data,
                                                    reportedby:resReportedby.data,
                                                    assignedto:resAssignedto.data,
                                                    createdby:issue.createdby,
                                                    projectid:res1.data,
                                                    // sprintid:'',
                                                    
                                                }
                                                console.log(issueobj)

                                                WorkOpsApi.put("/api/issues",{
                                                    id:id,
                                                    name:issue.name,
                                                    issuetypeBean:resIT.data,
                                                    duedate:issue.duedate,
                                                    description:issue.description,
                                                    issuepriorityBean:resIP.data,
                                                    issuestatus:resIS.data,
                                                    user3:resReportedby.data,
                                                    user1:resAssignedto.data,
                                                    user2:issue.createdby,
                                                    project:res1.data
        
                                                })
                                                .then(res2=>{
                                                    // console.log(version);
                                                    // console.log(res1.data);                        
                                                    // console.log(res.data);
                                                    if(res2){
                                                        alert("Added issue to database")
                                                    }
                                                })
                                                .catch(e=>{
                                                    alert("Error while Adding issue");
                                                })
                                            });
                                        }
                                    });
                                }
                            });
                                
                        }
                        });
                    }
                    });
                }
                });
        }
        
    }

    const getDueDate=()=>{
        const sd = new Date(issue.duedate)
        // issue.duedate.slice(0,10).replace(/-/g, ' ')
        return sd.toLocaleDateString('en-CA');
    }

    return (
        <div className="addissue">
            <div className="addissue__header">
                <div className="custombreadcrumb">
                    Projects
                    <span className="custombreadcrumb__forwardslash">/</span>
                        Add Issue
                </div>
                <h1 className="addissue__header__title">
                    Create Issue
                </h1>
            </div>
            <div className="addissue__content">
                <form >
                    <div className="field-group">
                        <label>
                            Selected Project
                        </label>
                        <input type="text" style={{width:"100%", backgroundColor:"#d4d4d4"}} value={projectName} disabled required/>
                    </div>
                    <div className="field-group">
                        <label>
                            Issue Type<span style={{color:"red"}}> *</span>
                        </label>
                        <select value={issue.issuetype}
                        onChange={(e)=>{setIssue({...issue,issuetype:e.target.value})}}
                        >
                            
                            <option value=""></option>
                            {
                                issueTypeData.map((t)=>
                                    <option value={t.id}>{t.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <hr/>
                    <div className="field-group">
                        <label>
                            Name<span style={{color:"red"}}> *</span>
                        </label>
                        <input type="text" style={{width:"100%"}} 
                            value={issue.name}
                            onChange={(e)=>{setIssue({...issue,name:e.target.value})}}
                            required
                        />
                    </div>
                    <div className="field-group">
                        <label>
                            Description<span style={{color:"red"}}> *</span>
                        </label>
                        <textarea rows="4" cols="50" style={{width:"100%"}}
                            value={issue.description}
                            onChange={(e)=>{setIssue({...issue,description:e.target.value})}}
                            required
                        />
                    </div>


                    <div className="field-group">
                        <label>
                            Reporter<span style={{color:"red"}}> *</span>
                        </label>

                        <select value={issue.reportedby}
                        onChange={(e)=>{setIssue({...issue,reportedby:e.target.value})}}
                        >
                            
                            <option value=""></option>
                            {
                                teamData.map((t)=>
                                    <option value={t.id.user.email}>{t.id.user.fullName}</option>
                                    )
                            }
                        </select>
                    </div>

                    <div className="field-group">
                        <label>
                            Assignee<span style={{color:"red"}}> *</span>
                        </label>
                        <select value={issue.assignedto}
                        onChange={(e)=>{setIssue({...issue,assignedto:e.target.value})}}
                        >
                            
                            <option value=""></option>
                            {
                                teamData.map((t)=>
                                    <option value={t.id.user.email}>{t.id.user.fullName}</option>
                                    )
                            }
                        </select>
                    </div>

                    <div className="field-group">
                        <label>
                            Priority
                        </label>
                        <select value={issue.issuepriority}
                        onChange={(e)=>{setIssue({...issue,issuepriority:e.target.value})}}
                        >
                            
                            <option value=""></option>
                            {
                                issuePriorityData.map((t)=>
                                    <option value={t.id}>{t.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="field-group">
                        <label>
                            Status
                        </label>
                        <select value={issue.issuestatus}
                        onChange={(e)=>{setIssue({...issue,issuestatus:e.target.value})}}
                        >
                            
                            <option value=""></option>
                            {
                                issueStatusData.map((t)=>
                                    <option value={t.id}>{t.name}</option>
                                )
                            }
                        </select>
                    </div>

                    <div className="field-group">
                        <label>
                            Due date<span style={{color:"red"}}> *</span>
                        </label>
                        <input type="date"
                            placeholder="dd-mm-yyyy"
                            min={new Date()} 
                            value={getDueDate()}
                            onChange={(e)=>{setIssue({...issue,duedate:e.target.value})}}
                            required
                            /> 
                    </div>

                    <div className="field-group">
                        <label>
                            Attachment
                        </label>
                        {/* <input type="text" value="Drop files to attach" style={{width:"50%"}}/> */}
                        <input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            style={{display:"none"}}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" component="span" style={{backgroundColor:"transparent", width:"100%", border:"0.01em solid grey"}}>
                            Upload files to attach
                            </Button>
                        </label>
                    </div>

                    <div class="buttons_container">
                        <input type="submit" value="Create" className="submitbutton" onClick={handleSubmit}/>
                        <a href="">Cancel</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddIssue;


// <div className="field-group">
// <label>
//     Components
// </label>
// <h6 style={{fontWeight:"bold"}}>None</h6>
// </div>
// <div className="field-group">
// <label>
//     Fix versions
// </label>
// <h6 style={{fontWeight:"bold"}}>None</h6>
// </div>



// <div className="field-group">
// <label>
//     Reporter<span style={{color:"red"}}> *</span>
// </label>
// <div className="addissue__usercontainer">
//         <div className="addissue__usercontainer__avatar">
//             <img alt="My Avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfkXX6ehXfa-zzSjkEQjne-NTk9Qkh2HtqXQ&amp;usqp=CAU"/>
//         </div>
//         <div className="addissue__usercontainer__name">
//             <input type="text" value="Abhinav Mishra" style={{width:"100%"}}/>
//         </div>
// </div>
// </div>

{/* <div className="field-group">
<label>
    Linked Issues
</label>
<select placeholder="Select project">
    <option value="blocks">blocks</option>
    <option value="blocked">is blocked by</option>
    <option value="clones">clones</option>
    <option value="cloned">is cloned by</option>
    <option value="duplicates">duplicates</option>
    <option value="duplicated">is duplicated by</option>
    <option value="causes">causes</option>
    <option value="caused">is caused by</option>
    <option value="relates">relates to</option>
</select>
</div> */}


{/* <div className="field-group">
<label>
    Sprint
</label>
<select placeholder="Select sprint">
    <option value="1">Sprint 1</option>
    <option value="2">Sprint 2</option>
    <option value="3">Sprint 3</option>
</select>
</div> */}


{/* <div className="field-group">
<label>
    Labels
</label>
<select placeholder="Select label">
    <option value="1">Label 1</option>
    <option value="2">Label 2</option>
</select>
</div> */}
