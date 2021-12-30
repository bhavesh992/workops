import React,{useEffect} from 'react';
import Auth from './Auth';
import {signup,clearErrOnPageSwicth} from "../actions/AuthActions"
import {useSelector,useDispatch} from 'react-redux';

const SignUp = (props) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        // console.log("signup");
        clearErrOnPageSwicth(dispatch);
    },[])
    const {errMessage}=useSelector(state=>state.AuthReducer);

    return (
        <Auth
            mode="signup"
            headerText="Register your account"
            errorMessage={errMessage}
            //onSubmit={({email,password})=>{signin({email,password})}} or you can provide directly
            //function reference so whatever args provided from AuthFrom to onSubmit() will bve passed to signin()
            onSubmit={signup}
            history={props.history}
        />
    );
}

export default SignUp;
