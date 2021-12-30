import React,{useState,useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link} from 'react-router-dom';
import "../styles/UserSettings.css";
import "../styles/CustomBreadcrumb.css";
import AddEditUser from "./AddEditUser.js"
import {Form ,Col , Button  } from 'react-bootstrap';

import {useSelector} from 'react-redux';
import WorkOpsApi from "../api/WorkOpsBackend";

const UserSettings = ({id}) => {
    return (
        <div className="usersettings">
            <div className="usersettings__header">
                <div className="custombreadcrumb">
                    User Profile
                    <span className="custombreadcrumb__forwardslash">/</span>
                    
                </div>
                <h1 className="usersettings__header__title">
                    User Profile
                </h1>
            </div>
            <div className="usersettings__content">
                <AddEditUser id={11}/>
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

export default UserSettings;
