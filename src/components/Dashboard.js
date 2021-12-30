import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link} from 'react-router-dom';
import "../styles/Dashboard.css";
import "../styles/CustomBreadcrumb.css";
import WorkOpsApi from "../api/WorkOpsBackend";
import {useSelector,useDispatch} from 'react-redux';

const Dashboard = () => {
    const {projectId}=useSelector(state=>state.ProjectReducer);
    const initialState={
        issues:0,
        sprints:0,
        sprintIssues:0,
        components:0,
        versions:0,
        teamsize:0
    }
    const [data,setData]=useState(initialState);
    const generate=()=>{
        WorkOpsApi.get("/api/dashboard/"+projectId)
        .then(res=>{
            // if(res.data.length>0 && res.data[0].id!==undefined){
                // console.log(res);
                // // console.log(rows.length);
                setData(res.data);             
            // }
            // else{
            //     setData(initialState);
            // }
        })
    }
    useEffect(()=>{
        console.log("Dashboard= "+projectId);
        generate();
    },[]);

    return (
        <div className="dashboard">
            <div className="dashboard__header">
                <div className="custombreadcrumb">
                    Projects
                    <span className="custombreadcrumb__forwardslash">/</span>
                    Tracker
                    <span className="custombreadcrumb__forwardslash">/</span>
                    Dashboard
                </div>
                <h1 className="dashboard__header__title">
                    Project Dashboard
                </h1>
            </div>
            <div className="dashboard__content">
                {/* <div className="dashboard_content_dropdown">
                    <label>
                        Select Project
                    </label>
                    <select>
                        <option value="11"></option>
                        <option value="1">Tracker</option>
                        <option value="2">Business Automation Tool</option>
                        <option value="2">URL Shortener</option>
                    </select>
                </div> */}
                <div className="dashboard__content__cards">
                        <Card className="dashboard__content__cards__card" style={{backgroundColor:"rgba(0,0,0,0.87)"}}>
                            <CardActionArea>
                            <CardContent>
                                <Typography className="dashboard__content__cards__card__title" gutterBottom variant="h5" component="h2">
                                    {data.issues}
                                </Typography>
                                <Typography variant="h6" color="textSecondary" className="dashboard__content__cards__card__text" component="p" >
                                    Backlog Issues
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card className="dashboard__content__cards__card" style={{backgroundColor:"rgba(0,0,0,0.80)"}}>
                            <CardActionArea>
                            <CardContent>
                                <Typography className="dashboard__content__cards__card__title" gutterBottom variant="h5" component="h2">
                                {data.components}
                                </Typography>
                                <Typography variant="h6" color="textSecondary" className="dashboard__content__cards__card__text" component="p">
                                    Components
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card className="dashboard__content__cards__card" style={{backgroundColor:"rgba(0,0,0,0.75)"}}>
                            <CardActionArea>
                            <CardContent>
                                <Typography className="dashboard__content__cards__card__title" gutterBottom variant="h5" component="h2">
                                {data.versions}
                                </Typography>
                                <Typography variant="h6" color="textSecondary" className="dashboard__content__cards__card__text" component="p">
                                    Versions
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card className="dashboard__content__cards__card" style={{backgroundColor:"rgba(0,0,0,0.87)"}}>
                            <CardActionArea>
                            <CardContent>
                                <Typography className="dashboard__content__cards__card__title" gutterBottom variant="h5" component="h2">
                                {data.sprints}
                                </Typography>
                                <Typography variant="h6" color="textSecondary" className="dashboard__content__cards__card__text" component="p">
                                    Sprint
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card className="dashboard__content__cards__card" style={{backgroundColor:"rgba(0,0,0,0.80)"}}>
                            <CardActionArea>
                            <CardContent>
                                <Typography className="dashboard__content__cards__card__title" gutterBottom variant="h5" component="h2">
                                {data.sprintIssues}
                                </Typography>
                                <Typography variant="h6" color="textSecondary" className="dashboard__content__cards__card__text" component="p">
                                    Sprint Issues
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card className="dashboard__content__cards__card" style={{backgroundColor:"rgba(0,0,0,0.75)"}}>
                            <CardActionArea>
                            <CardContent>
                                <Typography className="dashboard__content__cards__card__title" gutterBottom variant="h5" component="h2">
                                {data.teamsize}
                                </Typography>
                                <Typography variant="h6" color="textSecondary" className="dashboard__content__cards__card__text" component="p">
                                    Team Size
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                        </Card>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
