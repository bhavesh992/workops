import React,{useState,useEffect} from 'react';
import "../styles/AddEditUser.css";
import Button from '@material-ui/core/Button';

import {useSelector} from 'react-redux';
import WorkOpsApi from "../api/WorkOpsBackend";

const AddEditUser = ({id}) => {

    let initialuserstate={
        email:"",
        fullName:"",
        publicName:"",
        mobileNo:"",
        department:"",
        organisation:"",
        userlocaltime:"",
        selectedProject:""
    }

    
    const [user,setUser]=useState(initialuserstate);

    useEffect(()=>{
        if(id!==undefined){
            WorkOpsApi.get("/api/user/"+localStorage.getItem("token"))
            .then(res=>{
                WorkOpsApi.get("/api/userprofiles/"+res.data.email)
                .then(res1=>{
                    console.log(res1.data);
                    // initialuserstate.email=res1.data.email;
                    // initialuserstate.fullName=res1.data.fullName;
                    // initialuserstate.publicName=res1.data.publicName;
                    // initialuserstate.mobileNo=res1.data.mobileNo;
                    // initialuserstate.department=res1.data.department;
                    // initialuserstate.organisation=res1.data.organisation;
                    // initialuserstate.userlocaltime=res1.data.userlocaltime;
                    // initialuserstate.selectedProject=res1.data.selectedProject;
                    setUser(res1.data);
                })
            })
        }
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault();
        WorkOpsApi.put("/api/userprofiles/"+localStorage.getItem("token"),{
            email:user.email,
            fullName:user.fullName,
            publicName:user.publicName,
            mobileNo:user.mobileNo,
            department:user.department,
            organisation:user.organisation,
            userlocaltime:user.userlocaltime,
            selectedProject:user.selectedProject
        })
        .then(res2=>{
            // console.log(component);
            // console.log(res1.data);                        
            // console.log(res.data);
            if(res2){
                alert("User updated");
            }
        })
        .catch(e=>{
            // console.log(e);
            alert("Error while updating component");
        })
    }

    return (
        <div>
            <form >
                <div className="avatar-field-group" style={{width:"100%"}}>
                    {/* <label>
                        Avatar
                    </label> */}
                    {/* <input type="text" value="Drop files to attach" style={{width:"50%"}}/> */}
                    <input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        style={{display:"none"}}
                    />
                    <label htmlFor="contained-button-file" className="avatarselect">
                        <Button variant="contained" component="span" style={{backgroundColor:"transparent", height:"100px", width:"100px", border:"none", margin:"0 auto"}} >
                            <img style={{height:"100px", width:"100px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfkXX6ehXfa-zzSjkEQjne-NTk9Qkh2HtqXQ&usqp=CAU" alt="My Avatar" />
                        </Button>
                        
                    </label>
                </div>
                <div className="field-group">
                    <label>
                        Name
                    </label>
                    <input type="text" value={user.fullName}
                        onChange={(e)=>{setUser({...user,fullName:e.target.value})}}
                     />
                </div>
                <div className="field-group">
                    <label>
                        Email
                    </label>
                    <input type="text" value={user.email} disabled/>
                </div>
                <div className="field-group">
                    <label>
                        Public Name
                    </label>
                    <input type="text" value={user.publicName}
                        onChange={(e)=>{setUser({...user,publicName:e.target.value})}}
                     />
                </div>
                <div className="field-group">
                    <label>
                        Mobile Number
                    </label>
                    <input type="number" value={user.mobileNo}
                        onChange={(e)=>{setUser({...user,mobileNo:e.target.value})}}
                     />
                </div>
                <div className="field-group">
                    <label>
                        Department
                    </label>
                    <input type="text" value={user.department}
                        onChange={(e)=>{setUser({...user,department:e.target.value})}}
                     />

                    {/* <select>
                        <option value="1">Dept 1</option>
                        <option value="2" selected={id!==undefined}>Dept 2</option>
                        <option value="3">Dept 3</option>
                    </select> */}
                </div>
                <div className="field-group">
                    <label>
                        Organisation
                    </label>
                    <input type="text" value={user.organisation}
                        onChange={(e)=>{setUser({...user,organisation:e.target.value})}}
                     />
                </div>
                <div className="field-group">
                    <label>
                        Local Time
                    </label>
                    <input type="text" value={user.userlocaltime}
                        onChange={(e)=>{setUser({...user,userlocaltime:e.target.value})}}
                     />
                </div>
    
                <div className="buttons_container">
                    <input type="submit" value="Save Details" className="submitbutton" onClick={handleSubmit}/>
                    <a href="">Cancel</a>
                </div>
            </form>
        </div>
    );
}

export default AddEditUser;
