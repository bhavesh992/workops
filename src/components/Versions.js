import React,{useState,useEffect} from 'react';
import "../styles/CustomBreadcrumb.css";
import "../styles/Modal.css";

import "../styles/Versions.css";
import DataTable from "./DataTable.js"

import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap';

import AddEditVersion from './AddEditVersion.js';
import {useSelector} from 'react-redux';  
import WorkOpsApi from "../api/WorkOpsBackend";



const Versions = () => {

    const {projectId}=useSelector(state=>state.ProjectReducer);
    const [rows,setRows]=useState([]);
    const [editVersionId,setEditVersionId]=useState(undefined)
    const generate=()=>{
        WorkOpsApi.get('/api/versions/projects/'+projectId)
        .then(res=>{
            if(res.data.length>0 && res.data[0].id!==undefined){
                // console.log(res);
                // console.log(rows.length);
                setRows(res.data);             
            }
            else{
                setRows([]);
            }
        });
    }

    const editMode=(vid)=>{
        setEditVersionId(vid);
        console.log(vid);
        handleShow();
    }
    const addMode=()=>{
        setEditVersionId(undefined);
        handleShow();
    }

    useEffect(()=>{
        console.log("Version"+projectId);
        generate();
    },[]);

    // const rows=[
    //     {
    //         name:"1.1",
    //         releasedate:"4th December 2020",
    //         description:"Finish Login/registration modules"
    //     },
    //     {
    //         name:"1.2",
    //         releasedate:"4th December 2020",
    //         description:"Finish Login/registration modules"
    //     },    {
    //         name:"1.3",
    //         releasedate:"4th December 2020",
    //         description:"Finish Login/registration modules"
    //     }
    // ]

    const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' ,width:"30%"},
    { id: 'reldate', numeric: true, disablePadding: false, label: 'Release Date',width:"30%" },
    { id: 'desc', numeric: true, disablePadding: false, label: 'Description',width:"30%" },
    { id: 'edit', numeric: true, disablePadding: false, label: '',width:"10%" }
    ];

    const [show, setShow] = useState(false);
    const handleClose = () => { generate(); setShow(false);}
    const handleShow = () => setShow(true);

    return (
        <div className="version">
            <div className="version__header">
                <div className="custombreadcrumb">
                    Projects
                    <span className="custombreadcrumb__forwardslash">/</span>
                    Tracker
                    <span className="custombreadcrumb__forwardslash">/</span>
                    Versions
                </div>
                <h1 className="version__header__title">
                    Project versions
                </h1>
            </div>
            <div className="version__content">
                <div className="version__content__addversion">
                    <div>
                        <button type="button" onClick={addMode}>
                            Create New
                        </button>
                    </div>
                </div>
                <DataTable mode="versions" rows={rows} headCells={headCells} generate={generate} onEdit={editMode}/>
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
                    <AddEditVersion onHandleClose={handleClose} id={editVersionId}/>
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

export default Versions;
