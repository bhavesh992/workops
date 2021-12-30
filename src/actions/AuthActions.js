
import WorkOpsApi from "../api/WorkOpsBackend";
// import Navigate from "../components/Navigate";
// import React from 'react';
export const actionTypes={
    ERROR : 'ERROR',
    SIGNUP_SIGNIN : 'SIGNUP_SIGNIN',
    SIGNOUT:"SIGN_OUT",
    CLEAR_ERR_MESSAGE:"CLEAR_ERR_MESSAGE"
};

export const tryLocalSignIn=dispatch=> async ()=>{
    const token=await localStorage.getItem("token");
    if(token){
        dispatch({type:actionTypes.SIGNUP_SIGNIN,payload:token});
        // console.log("Inside 1");
    }
    else{
        //No need to write else condition but still to be on safe side:-
        // console.log("Inside 2");
        //Or you can also do:- navigate("Signup")
    }
};

export const clearErrOnPageSwicth=dispatch=>{
    // console.log("Er me");
    dispatch({type:actionTypes.CLEAR_ERR_MESSAGE});
}
export const signup=async (email,password,dispatch)=>{
    try {
        // const response=await TrackerApi.post('/signup',{email:email,password:password}); is same as
        // console.log("Email= "+email);
        // console.log("Password= "+password);
        const response=await WorkOpsApi.post('/api/signup',{email,password});
        // console.log("Response= "+response.data);
        await localStorage.setItem("token",response.data.token);
        dispatch({type:actionTypes.SIGNUP_SIGNIN,payload:response.data.token});
        // console.log(response);
        // <Navigate path="/dashboard"/>
        return true;
    } catch (error) {
        // console.log("Err= "+error.response.data.error);
        if(error.response.data!=undefined){
            dispatch({type:actionTypes.ERROR,payload:error.response.data});
        }
        return false;
    }
};


export const signin=async (email,password,dispatch)=>{ 
    try {
        // const response=await TrackerApi.post('/signup',{email:email,password:password}); is same as
        // console.log(email+" - "+password);
        const response=await WorkOpsApi.post('/api/signin',{email,password});
        // console.log("called 1");
        // console.log(response);        
        await localStorage.setItem("token",response.data.token);
        dispatch({type:actionTypes.SIGNUP_SIGNIN,payload:response.data.token});
        return true;
    } catch (error) {
        // console.log("Here");
        // console.log(error.response.data);
        if(error.response.data!=undefined){
            dispatch({type:actionTypes.ERROR,payload:error.response.data});
        }
        return false;
    }
};

export const signout=async (dispatch)=>{
    await localStorage.removeItem("token");
    dispatch({type:actionTypes.SIGNOUT});
};
