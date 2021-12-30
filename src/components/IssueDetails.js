import React, {useState, useEffect} from 'react';
import ShareIcon from '@material-ui/icons/Share';
import MenuIcon from '@material-ui/icons/Menu';
import AttachmentIcon from '@material-ui/icons/Attachment';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import LinkIcon from '@material-ui/icons/Link';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import '../styles/IssueDetails.css';

export default function IssueDetails() {
    const [isExpanded, setIsExpanded]=useState(false)

    const expandForm=()=>{
            setIsExpanded(!isExpanded);
    }

    return (
        <div className="issuedetails">
            <div className="issuedetails__header">

            </div>
            <div className="issuedetails__content">
                <div className="issuedetails__content__header">
                    <div className="issuedetails__content__header__issuetype">
                        <div><img src="https://toppng.com/uploads/preview/red-circle-red-point-transparent-background-11563241690fqswnj7pqe.png" width="16px" height="16px" alt="Bug"/></div>
                        <div><p>WOPS-16</p></div>
                    </div>
                    
                    <div className="issuedetails__content__header__options"><span><ShareIcon/></span><span><MenuIcon/></span></div>
                </div>

                <div className="issuedetails__content__container">
                    <form>
                        <div className="issuedetails__content__title" >
                            <h3>Add logout button not working</h3>
                        </div>
                        <div className="issuedetails__content__buttons" >
                            <div><AttachmentIcon fontSize="small"/></div>
                            <div><AccountTreeIcon fontSize="small"/></div>
                            <div><LinkIcon fontSize="small"/></div>
                        </div>
                        <div className="issuedetails__content__status" >
                            <div>
                                <select className="issuedetails__content__status_select">
                                <option className="issuedetails__content__status__option__review" value="review">Review</option>
                                <option className="issuedetails__content__status__option__todo" value="todo">To Do</option>
                                <option className="issuedetails__content__status__option__inprogress" selected value="inprogress">In Progress</option>
                                <option className="issuedetails__content__status__option__done" value="done">Done</option>
                                </select>
                            </div>
                        </div>

                        <div className="issuedetails__content__details__container" >
                            <div className="issuedetails__content__details__item">
                                <h2>Description</h2>
                                <input type="text" placeholder="Add a description..."/>
                            </div>

                            <div className="issuedetails__content__details__item">
                                <h2>Environment</h2>
                                <input type="text" placeholder="None"/>
                            </div>

                            <div className="issuedetails__content__details__item__user">
                                <h2>Assignee</h2>
                                <div className="issuedetails__content__details__item__user_container">
                                    <div className="issuedetails__content__details__item__user_container__avatar">
                                        <img alt="My Avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfkXX6ehXfa-zzSjkEQjne-NTk9Qkh2HtqXQ&amp;usqp=CAU"/>
                                    </div>
                                    <div className="issuedetails__content__details__item__user_container__name">
                                        <p>Abhinav Mishra</p>
                                    </div>
                                </div>
                            </div>

                            <div className="issuedetails__content__details__item__user">
                                <h2>Reporter</h2>
                                <div className="issuedetails__content__details__item__user_container">
                                    <div className="issuedetails__content__details__item__user_container__avatar">
                                        <img alt="My Avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfkXX6ehXfa-zzSjkEQjne-NTk9Qkh2HtqXQ&amp;usqp=CAU"/>
                                    </div>
                                    <div className="issuedetails__content__details__item__user_container__name">
                                        <p>Abhinav Mishra</p>
                                    </div>
                                </div>
                            </div>

                            <div className="issuedetails__content__details__item">
                                <h2>Labels</h2>
                                <input type="text" placeholder="None"/>
                            </div>

                            <div className="issuedetails__content__details__item">
                                <h2>Sprint</h2>
                                <input type="text" placeholder="None"/>
                            </div>

                            <div className="issuedetails__content__details__item__user">
                                <h2>Priority</h2>
                                <div className="issuedetails__content__details__item__user_container">
                                    <div className="issuedetails__content__details__item__priority_container__avatar">
                                        <img alt="High Priority" src="https://www.pikpng.com/pngl/b/347-3474471_font-awesome-5-regular-arrow-circle-up-green.png"/>
                                    </div>
                                    <div className="issuedetails__content__details__item__user_container__name">
                                        <p>High</p>
                                    </div>
                                </div>
                            </div>

                            {!isExpanded &&
                                <div className="issuedetails__content__details__expand" onClick={expandForm}>
                                    <KeyboardArrowDownIcon/>
                                    <div><p>Show 7 more fields</p></div>
                                </div>
                            }

                            {isExpanded &&
                            <div className="issuedetails__content__details__expand__form">
                                <div className="issuedetails__content__details__item">
                                    <h2>Original Estimate</h2>
                                    <input type="text" placeholder="None"/>
                                </div>
                                
                                <div className="issuedetails__content__details__item">
                                    <h2>Time tracking</h2>
                                    <input type="text" placeholder="None"/>
                                </div>

                                <div className="issuedetails__content__details__item">
                                    <h2>Epic Link</h2>
                                    <input type="text" placeholder="None"/>
                                </div>

                                <div className="issuedetails__content__details__item">
                                    <h2>Components</h2>
                                    <input type="text" placeholder="None"/>
                                </div>

                                <div className="issuedetails__content__details__item">
                                    <h2>Sprint</h2>
                                    <input type="text" placeholder="None"/>
                                </div>

                                <div className="issuedetails__content__details__item">
                                    <h2>Fix verions</h2>
                                    <input type="text" placeholder="None"/>
                                </div>
                                
                                <div className="issuedetails__content__details__item">
                                    <h2>Affects versions</h2>
                                    <input type="text" placeholder="None"/>
                                </div>

                                <div className="issuedetails__content__details__compress" onClick={expandForm}>
                                    <KeyboardArrowUpIcon/>
                                    <div><p>Show less</p></div>
                                </div>

                            </div>
                            }
                            
                            <div className="issuedetails__content__acitvity">
                                    <h2>Activity</h2>
                                    <div className="issuedetails__content__acitvity__buttons">
                                        <h6>Show: </h6> <div><h5>Comments</h5></div><div><h5>History</h5></div><div><h5>Work Log</h5></div>
                                    </div>
                            </div>

                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
