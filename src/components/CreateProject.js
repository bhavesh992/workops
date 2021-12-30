import React,{useEffect} from 'react';
import AddEditProject from "./AddEditProject.js"
import "../styles/CreateProject.css";
import "../styles/CustomBreadcrumb.css";
import {useSelector} from 'react-redux';

const CreateProject = (props) => {
    const {role}=useSelector(state=>state.ProjectReducer);
    useEffect(()=>{
        if(role==='Basic') {
            props.history.push("/projects");
        }
    },[]);
    return (
        <div className="createproject">
            <div className="createproject__header">
                <div className="custombreadcrumb">
                    Projects
                    <span className="custombreadcrumb__forwardslash">/</span>
                    Tracker
                    <span className="custombreadcrumb__forwardslash">/</span>
                    Project Settings
                </div>
                <h1 className="createproject__header__title">
                    Create Project
                </h1>
            </div>
            <div className="createproject__content">
                <AddEditProject />
            </div>
        </div>
    );
}

export default CreateProject;
