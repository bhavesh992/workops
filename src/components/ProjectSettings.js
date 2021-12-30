import React,{useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link} from 'react-router-dom';
import "../styles/ProjectSettings.css";
import "../styles/CustomBreadcrumb.css";
import AddEditProject from "./AddEditProject.js"
import {Form ,Col , Button  } from 'react-bootstrap';
import WorkOpsApi from "../api/WorkOpsBackend";
import {unsetProject} from "../actions/ProjectActions"
import {useSelector,useDispatch} from 'react-redux';

const ProjectSettings = (props) => {
    const {role}=useSelector(state=>state.ProjectReducer);
    const {projectid}=useSelector(state=>state.ProjectReducer);
    
    useEffect(()=>{
        if(role==='Basic') {
            props.history.push("/projects");
        }
    },[]);
    const dispatch = useDispatch();

    const delProject=()=>{
        WorkOpsApi.delete("/api/projects/"+projectid)
        .then(res=>{
            if(res){
                console.log(res);
                WorkOpsApi.get('/api/user/'+localStorage.getItem("token"))
                .then(res1=>{
                    console.log(res1);
                    WorkOpsApi.put('/api/userprofiles/switchproject/'+res1.data.email,{selectedProject:""})
                    .then(res2=>{
                        if(res2){
                            console.log(res2);
                            unsetProject(dispatch);
                            props.history.push("/projects");
                        }
                    });
                });
            }
        });
    }
    //   const {projectId}=useSelector(state=>state.ProjectReducer);
    return (
        <div className="projectsettings">
            <div className="projectsettings__header">
                <div className="custombreadcrumb">
                    Projects
                    <span className="custombreadcrumb__forwardslash">/</span>
                    Tracker
                    <span className="custombreadcrumb__forwardslash">/</span>
                    Project Settings
                </div>
                <h1 className="projectsettings__header__title">
                    Details
                </h1>
            </div>
            <div className="projectsettings__content">
                <div className="projectsettings__content__delproject">
                    <div>
                        <button type="button" onClick={delProject}>
                                    Delete
                        </button>
                    </div>
                </div>
                <AddEditProject id={props.match.params.id}/>
                {/* <Form className="my-3">
                    <Form.Row className="my-2">
                        <Form.Group as={Col}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                required
                                placeholder="Enter Name"
                                type="text"
                                value="Tracker"
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row className="my-2">
                        <Form.Group as={Col}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                required
                                placeholder="Enter Name"
                                type="text"
                                value="Tracker"
                            />
                        </Form.Group>
                    </Form.Row>
                </Form> */}
            </div>
        </div>
    );
}

export default ProjectSettings;
