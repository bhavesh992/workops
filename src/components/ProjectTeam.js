import React,{useState,useEffect} from 'react';
import "../styles/CustomBreadcrumb.css";
import "../styles/ProjectTeam.css";
import DataTable from "./DataTable.js"
import "../styles/Modal.css";
import AddTeamMember from './AddTeamMember.js'
import Modal from 'react-bootstrap/Modal'
import {useSelector} from 'react-redux';  
import WorkOpsApi from "../api/WorkOpsBackend";


const ProjectTeam = () => {
    const {projectId}=useSelector(state=>state.ProjectReducer);
    const [rows,setRows]=useState([]);
    const generate=()=>{
        WorkOpsApi.get('/api/projectteam/'+projectId)
        .then(res=>{
            if(res.data[0].id!==undefined){
                // console.log(res);
                // console.log(rows.length);
                setRows(res.data);             
            }
            else{
                setRows([]);
            }
        });
    }
    useEffect(()=>{
        // console.log("Hey");
        generate();
    },[]);

//   const rows=[
//     {
//         name:"Dummy Name 1",
//         email:"Dummy1@gmail.com",
//         team:"Frontend",
//         role:"Owner"
//     },
//     {
//         name:"Dummy Name 2",
//         email:"Dummy2@gmail.com",
//         team:"Backend",
//         role:"Basic"
//     },
//     {
//         name:"Dummy Name 3",
//         email:"Dummy3@gmail.com",
//         team:"DevOps",
//         role:"Basic"
//     },
//     {
//         name:"Dummy Name 4",
//         email:"Dummy4@gmail.com",
//         team:"Frontend",
//         role:"Basic"
//     },
//     {
//         name:"Dummy Name 5",
//         email:"Dummy5@gmail.com",
//         team:"QA",
//         role:"Basic"
//     },
//     {
//         name:"Dummy Name 6",
//         email:"Dummy6@gmail.com",
//         team:"Backend",
//         role:"Basic"
//     },
// ]
  
 
  
  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' ,width:"35%"},
    { id: 'email', numeric: false, disablePadding: true, label: 'Email',width:"35%" },
    { id: 'role', numeric: true, disablePadding: false, label: 'Role',width:"20%" },
  ];

  const {role}=useSelector(state=>state.ProjectReducer);


  const [show, setShow] = useState(false);
  const handleClose = () =>{ generate(); setShow(false);}
  const handleShow = () => setShow(true);

    return (
        <div className="projectteam">
            <div className="projectteam__header">
                <div className="custombreadcrumb">
                    Projects
                    <span className="custombreadcrumb__forwardslash">/</span>
                    Tracker
                    <span className="custombreadcrumb__forwardslash">/</span>
                    Team
                </div>
                <h1 className="projectteam__header__title">
                    Project Team
                </h1>
            </div>
            <div className="projectteam__content">
                {role!=='basic' && 
                    <div className="projectteam__content__addteammember">
                        <div>
                            <button type="button" onClick={handleShow}>
                                Add New
                            </button>
                        </div>
                    </div>
                }
                {/* {rows.length>0 && */}
                <DataTable mode="projectteam" rows={rows} headCells={headCells} generate={generate}/>                
                {/* } */}
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
                    <Modal.Title>Add Team Member</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <AddTeamMember onHandleClose={handleClose}/>
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

export default ProjectTeam;
