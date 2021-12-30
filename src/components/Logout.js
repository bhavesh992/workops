import React,{useEffect} from 'react';
import {signout} from "../actions/AuthActions"
import {useDispatch} from 'react-redux';


const Logout = (props) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log(props);
        signout(dispatch).then((res)=>{
        //option 1:
        // window.location = "/signin"

         //Option 2:
            props.history.push("/signin");

            //option 3 isto use useHistory() hook
        })
    },[])
    return (
        <div>
            {/* <h1>dd</h1> */}
        </div>
    );
}

export default Logout;
