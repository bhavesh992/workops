import React,{useState,useEffect} from 'react';
import "../styles/CustomBreadcrumb.css";
import "../styles/Modal.css";

import "../styles/Components.css";
import DataTable from "./DataTable.js"

import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap';

import AddEditComponent from './AddEditComponent.js';
import {useSelector} from 'react-redux';  
import WorkOpsApi from "../api/WorkOpsBackend";

  

const Components = () => {

    const {projectId}=useSelector(state=>state.ProjectReducer);
    const [rows,setRows]=useState([]);
    const [editComponentId,setEditComponentId]=useState(undefined)
    const generate=()=>{
        WorkOpsApi.get('/api/components/projects/'+projectId)
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
    const editMode=(cid)=>{
        setEditComponentId(cid);
        console.log("Component "+cid);

        handleShow();
    }
    const addMode=()=>{
        setEditComponentId(undefined);
        handleShow();
    }
    useEffect(()=>{
        // console.log("Component"+projectId);
        generate();
    },[]);

    //   const rows=[
//     {
//         id:"1",
//         name:"Component 1",
//         desc:"Component 1 Description goes here",
//         lead:"Dummy Lead 1",
//         assignee:"Dummy Assignee 1"
//     },
//     {
//         id:"2",
//         name:"Component 2",
//         desc:"Component 2 Description goes here",
//         lead:"Dummy Lead 2",
//         assignee:"Dummy Assignee 2"
//     },

// ]
  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' ,width:"20%"},
    { id: 'desc', numeric: false, disablePadding: true, label: 'Description',width:"40%" },
    { id: 'lead', numeric: true, disablePadding: false, label: 'Component Lead',width:"20%" },
    { id: 'edit', numeric: true, disablePadding: false, label: 'Edit',width:"10%" },
  ];

    const [show, setShow] = useState(false);
    const handleClose = () =>{ generate(); setShow(false);}
    const handleShow = () => setShow(true);

    return (
        <div className="components">
            <div className="components__header">
                <div className="custombreadcrumb">
                    Projects
                    <span className="custombreadcrumb__forwardslash">/</span>
                    Tracker
                    <span className="custombreadcrumb__forwardslash">/</span>
                    Components
                </div>
                <h1 className="components__header__title">
                    Project components
                </h1>
            </div>
            <div className="components__content">
                <div className="components__content__addcomponent">
                    <div>
                        <button type="button" onClick={addMode}>
                            Create New
                        </button>
                    </div>
                </div>
                <DataTable mode="components" rows={rows} headCells={headCells} generate={generate} onEdit={editMode}/>                
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
                    <Modal.Title>Component</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <AddEditComponent onHandleClose={handleClose} id={editComponentId}/>
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

export default Components;
