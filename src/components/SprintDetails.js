import React, {useState} from 'react';
import "../styles/CustomBreadcrumb.css";
import "../styles/Backlog.css";
import DataTable from "./DataTable.js"

const SprintDetails = () => {
  const rows=[
    {
        type:"Story",
        typeIcon:"https://dreamcompany98.atlassian.net/secure/viewavatar?size=medium&avatarId=10315&avatarType=issuetype",
        desc:"Issue 1 Description goes here",
        key:"WOKS-1",
        status:"To do",
        priority:"https://dreamcompany98.atlassian.net/images/icons/priorities/medium.svg"
    },
    {
        type:"Task",
        typeIcon:"https://dreamcompany98.atlassian.net/secure/viewavatar?size=medium&avatarId=10318&avatarType=issuetype",
        desc:"Issue 2 Description goes here",
        key:"WOKS-2",
        status:"In Progress",
        priority:"https://dreamcompany98.atlassian.net/images/icons/priorities/low.svg"
    },
    {
        type:"Sub Task",
        typeIcon:"https://dreamcompany98.atlassian.net/secure/viewavatar?size=medium&avatarId=10316&avatarType=issuetype",
        desc:"Issue 3 Description goes here",
        key:"WOKS-3",
        status:"Done",
        priority:"https://dreamcompany98.atlassian.net/images/icons/priorities/lowest.svg"
    },
    {
        type:"Bug",
        typeIcon:"https://dreamcompany98.atlassian.net/secure/viewavatar?size=medium&avatarId=10303&avatarType=issuetype",
        desc:"Issue 4 Description goes here",
        key:"WOKS-4",
        status:"To do",
        priority:"https://dreamcompany98.atlassian.net/images/icons/priorities/high.svg"
    },
    {
        type:"Epic",
        typeIcon:"https://dreamcompany98.atlassian.net/images/icons/issuetypes/epic.svg",
        desc:"Issue 5 Description goes here",
        key:"WOKS-5",
        status:"Done",
        priority:"https://dreamcompany98.atlassian.net/images/icons/priorities/highest.svg"
    },
    {
        type:"Sub Task",
        typeIcon:"https://dreamcompany98.atlassian.net/secure/viewavatar?size=medium&avatarId=10316&avatarType=issuetype",
        desc:"Issue 6 Description goes here",
        key:"WOKS-6",
        status:"Done",
        priority:"https://dreamcompany98.atlassian.net/images/icons/priorities/lowest.svg"
    },
    {
        type:"Story",
        typeIcon:"https://dreamcompany98.atlassian.net/secure/viewavatar?size=medium&avatarId=10315&avatarType=issuetype",
        desc:"Issue 7 Description goes here",
        key:"WOKS-7",
        status:"To do",
        priority:"https://dreamcompany98.atlassian.net/images/icons/priorities/medium.svg"
    },
]
const [selectedStatus, setSelectedStatus]=useState("All");
const [issues, setIssues]=useState(rows);

const filterOnStatus=()=>{
    const selStatus=document.getElementById("selectStatus").value;
    let selRows; 
    if(selStatus=="All"){
        selRows=rows;
    }else{
        selRows =rows.filter(row=>row.status===selStatus);
    }
    setIssues(selRows);
    setSelectedStatus(selStatus);

}

const headCells = [
  { id: 'type', numeric: false, disablePadding: true, label: 'Type' ,width:"10%"},
  { id: 'desc', numeric: false, disablePadding: true, label: 'Description',width:"40%" },
  { id: 'key', numeric: true, disablePadding: false, label: 'key',width:"10%" },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status',width:"20%" },
  { id: 'priority', numeric: true, disablePadding: false, label: 'Priority',width:"10%" }
];

    return (
        <div className="backlog">
            <div className="backlog__header">
                <div className="custombreadcrumb">
                    Projects
                    <span className="custombreadcrumb__forwardslash">/</span>
                    Sprints
                    <span className="custombreadcrumb__forwardslash">/</span>
                    Sprint Details
                </div>
                <h1 className="backlog__header__title">
                    Sprint 1
                </h1>
                <h6 className="backlog__header__details">
                    Duration: 3 weeks
                </h6>
                <h6 className="backlog__header__details">
                    Start Date: 3 weeks
                </h6>
                <h6 className="backlog__header__details">
                    End Date: 3 weeks
                </h6>
                <h6 className="backlog__header__details">
                    Goal: Finish Login Module
                </h6>
            </div>
            <div className="backlog__content">
                <div className="backlog__content__addbacklog">
                    <div style={{display:"flex"}}>
                        <select id="selectStatus" type="button" style={{ width:"max-content", marginRight:"10px"}} onChange={filterOnStatus}>
                            <option value="Review">Review</option>
                            <option value="In Progress">In Progress</option>
                            <option value="To do">To do</option>
                            <option value="Done">Done</option>
                            <option value="All" selected>All</option>
                        </select>
                        {/* <button type="button">
                            Add Issue
                        </button> */}
                    </div>
                </div>
                <DataTable mode="backlog" rows={issues} headCells={headCells}/>
            </div>
        </div>
    );
}

export default SprintDetails;
