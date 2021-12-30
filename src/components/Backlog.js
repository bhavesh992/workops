import React,{useState,useEffect} from 'react';
import "../styles/CustomBreadcrumb.css";
import "../styles/Backlog.css";
import DataTable from "./DataTable.js"
import WorkOpsApi from "../api/WorkOpsBackend";
import { Link} from 'react-router-dom';


const Backlog = () => {
    const [rows,setRows]=useState([]);
    const generate=()=>{
        WorkOpsApi.get("/api/issues")
        .then(res=>{
            if(res.data.length>0 && res.data[0].id!==undefined){
                // console.log(res.data);
                // console.log(rows.length);
                setRows(res.data);             
            }
            else{
                setRows([]);
            }
            // console.log(res.data);
        });
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

    return (
        <div className="backlog">
            <div className="backlog__header">
                <div className="custombreadcrumb">
                    Projects
                    <span className="custombreadcrumb__forwardslash">/</span>
                    Tracker
                    <span className="custombreadcrumb__forwardslash">/</span>
                    Backlogs
                </div>
                <h1 className="backlog__header__title">
                    Project Backlogs
                </h1>
            </div>
            <div className="backlog__content">
                <div className="backlog__content__addbacklog">
                    <div>
                        <button type="button">
                            <Link to="/issues/new" style={{color:"inherit",margin:"0px"}}>
                                            Create New
                            </Link>
                        </button>
                    </div>
                </div>
                <DataTable mode="backlog" rows={rows} headCells={headCells} generate={generate}/>                
            </div>
        </div>
    );
}

export default Backlog;
