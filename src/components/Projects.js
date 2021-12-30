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
import "../styles/Projects.css";
import "../styles/CustomBreadcrumb.css";
import {switchProject} from "../actions/ProjectActions"
import {useSelector,useDispatch} from 'react-redux';
import WorkOpsApi from "../api/WorkOpsBackend";


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    // maxHeight:250
  },
  media: {
    height: 80,
    width:100
  }
});

const Projects = () => {
    const {projectId}=useSelector(state=>state.ProjectReducer);
    const {role}=useSelector(state=>state.ProjectReducer);
    
    const [projectdata,setProjectdata]=useState([]);
    useEffect(()=>{
        console.log("Inside project= "+projectId);
        WorkOpsApi.get('/api/user/'+localStorage.getItem("token"))
        .then(res1=>{
            WorkOpsApi.get('/api/projects/userprojects/'+res1.data.email)
            .then(res=>{
                setProjectdata(res.data);
                // console.log(projectdata);
            });
        });
    },[]);
    const dispatch = useDispatch();
    const classes = useStyles();
    return (
        <div className="projects">
            <div className="projects__header">
                <div className="custombreadcrumb">
                    Projects
                    <span className="custombreadcrumb__forwardslash">/</span>
                    Tracker
                    <span className="custombreadcrumb__forwardslash">/</span>
                    Project Settings
                </div>
                <h1 className="projects__header__title">
                    All Projects
                </h1>
            </div>
            <div className="projects__content">
                {role!=='basic' &&
                    <div className="projects__content__addproject">
                        <div>
                            <button type="button">
                                <Link to="/createproject" style={{color:"inherit",margin:"0px"}}>
                                        Create New
                                </Link>
                            </button>
                        </div>
                    </div>
                }
                <div className="projects__content__cards">
                {
                        projectdata.map((p,index)=>{
                            return p.id===projectId ? 
                                <Card key={p.id} disabled className={classes.root} style={{backgroundColor:"rgba(0,0,0,0.14)"}}>
                                    <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={index%3===0 ? ('/images/projectIcon1.png') : (index%3===1 ?'/images/projectIcon2.png' : '/images/projectIcon3.png')}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography className="projects__content__cards__projecttitle" gutterBottom variant="h5" component="h2">
                                        {p.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                        {/* orem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor lectus ac lobortis accumsan. Aliquam felis mauris, vulputate a ullamcorper et */}
                                        {p.description}
                                        </Typography>
                                    </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Selected
                                        </Button>
                                    </CardActions>
                                </Card> 
                            :
                                <Card key={p.id} className={classes.root} onClick={()=>switchProject(p.id,dispatch)}>
                                    <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={index%3===0 ? ('/images/projectIcon1.png') : (index%3===1 ?'/images/projectIcon2.png' : '/images/projectIcon3.png')}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography className="projects__content__cards__projecttitle" gutterBottom variant="h5" component="h2">
                                        {p.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                        {/* orem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor lectus ac lobortis accumsan. Aliquam felis mauris, vulputate a ullamcorper et */}
                                        {p.description}
                                        </Typography>
                                    </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Switch
                                        </Button>
                                    </CardActions>
                                </Card>
                        })
                    }
                </div>

            </div>
        </div>
    );
}

export default Projects;
