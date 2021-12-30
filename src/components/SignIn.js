import React,{useEffect} from 'react';
import Auth from './Auth';
import {signin,clearErrOnPageSwicth} from "../actions/AuthActions"
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
// import { withRouter } from 'react-router-dom'

const SignIn = (props) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        // console.log("signin");
        clearErrOnPageSwicth(dispatch);
    },[]);

    // To access whole state: 
    //Way 1: const {state}=useSelector(state=>state.AuthReducer); ,to access: state.token,state.errMessage
    //Way 2: const {token,errMessage}=useSelector(state=>state.AuthReducer);

    //To access individual elements:
    const {errMessage}=useSelector(state=>state.AuthReducer);
    return (
        <>
            <Auth
                mode="signin"
                headerText="Log in to your account"
                errorMessage={errMessage}
                //Ways of passing reference of func as cb function so that they don't get called automatically
                //Way 1: keeping dispatch on SignIn.js
                // onSubmit={(email,password)=>signin.bind(email,password)}

                //Way 2:- keeping dispatch on SignIn.js
                // onSubmit={(email,password)=>{signin(email,password)}}

                //Way 3:- keeping dispatch on Auth.js
                onSubmit={signin}
                history={props.history}
            />
        </>
    );
}

export default SignIn;