import React,{useState,useEffect} from 'react';
import "../styles/CustomBreadcrumb.css";
import "../styles/VersionsIssue.css";
import DataTable from "./DataTable.js"
import {useSelector} from 'react-redux';
import WorkOpsApi from "../api/WorkOpsBackend";
import generate from '@babel/generator';
import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap';

const VersionsIssue = (props) => {

    const [rows,setRows]=useState([]);
    const [issue,setIssue]=useState("");
    const [allIssues,setAllIssues]=useState([]);
    const {projectid}=useSelector(state=>state.ProjectReducer);
    const generate=()=>{
        WorkOpsApi.get("/api/issueversion/"+props.match.params.id)
        .then(res=>{
            if(res.data.length>0 && res.data[0].id!==undefined){
                console.log(res.data);
                // console.log(rows.length);
                setRows(res.data);             
            }
            else{
                setRows([]);
            }
            // console.log(res.data);
        });
    }

    const getissues=()=>{
        WorkOpsApi.get("/api/issues")
        .then(res=>{
            // console.log("All issues= "+res);
            const results = res.data.filter(({ id: id1 }) => !rows.some(({ id: id2 }) => id2 === id1));
            // console.log("Rem issues= "+results[0]);
            setAllIssues(results);
        })
    }
    
    const handleSubmit=()=>{
        WorkOpsApi.get("/api/issues/"+issue)
        .then(res=>{
            // WorkOpsApi.get("/api/component/"+props.match.params.id)
            // .then(res1=>{
                
            // });
            WorkOpsApi.post("/api/issueversion",{
                id:{
                    issue:res.data,
                    versionId:props.match.params.id
                }
            })
            .then(res1=>{
                // console.log(res1);
                handleClose();
            })
        })
    }
    
    useEffect(()=>{
        generate();
    },[]);
    
    const headCells = [
        { id: 'type', numeric: false, disablePadding: true, label: 'Type' ,width:"10%"},
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' ,width:"10%"},
        { id: 'desc', numeric: false, disablePadding: true, label: 'Description',width:"40%" },
        { id: 'status', numeric: true, disablePadding: false, label: 'Status',width:"20%" },
        { id: 'priority', numeric: true, disablePadding: false, label: 'Priority',width:"10%" }
      ];

    const [show, setShow] = useState(false);
    const handleClose = () =>{ generate(); setShow(false);}
    const handleShow = () => { getissues(); setShow(true); }

    return (
        <div className="versionsissue">
            <div className="versionsissue__header">
                <div className="custombreadcrumb">
                    Projects
                    <span className="custombreadcrumb__forwardslash">/</span>
                    Tracker
                    <span className="custombreadcrumb__forwardslash">/</span>
                    VersionsIssue
                </div>
                <h1 className="versionsissue__header__title">
                    Version's Issues
                </h1>
            </div>
            <div className="versionsissue__content">
                <div className="versionsissue__content__addversion">
                    <div>
                        <button type="button" onClick={handleShow}>
                            Add issue
                        </button>
                    </div>
                </div>
                <DataTable mode="versionIssue" versionIdForVersionIssuetype={props.match.params.id} rows={rows} headCells={headCells} generate={generate}/>                
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    // size="lg"
                    // aria-labelledby="contained-modal-title-vcenter"
                    // centered
                    centered
                    // animation={true}
                >
                    <Modal.Header closeButton >
                    <Modal.Title>Version</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form >
                        <div className="field-group">
                            <label>
                                Issue
                            </label>
                            <select value={issue}
                                onChange={(e)=>{setIssue(e.target.value)}}                    
                            >
                                <option value=""></option>
                                {
                                    allIssues.map((t)=>
                                        <option value={t.id}>{t.name}</option>
                                        )
                                }
                                {/* <option value="1" selected={id!==undefined}>Sunil</option>
                                <option value="2">Assignee</option> */}
                            </select>
                        </div>
                        <div className="buttons_container">
                            {/* <input type="submit" value="close   " className="closebutton"/>
                            <input type="submit" value="Save" className="submitbutton"/> */}
                            <Button style={{width:"15%"}} variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button style={{width:"20%"}} variant="primary" onClick={handleSubmit}>Save</Button>
                        </div>
                    </form>
                    </Modal.Body>
                    {/* <Modal.Footer>
                    <Button style={{width:"15%"}} variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button style={{width:"25%"}} variant="primary">Save Changes</Button>
                    </Modal.Footer> */}
                </Modal>
            </div>
        </div>
    );
}

export default VersionsIssue;
