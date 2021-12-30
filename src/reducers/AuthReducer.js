import {actionTypes} from '../actions/AuthActions';
const initialState={
    token:null ,
    errMessage: ''
}

export const AuthReducer = (state = initialState, action) => {
     switch(action.type){
        case actionTypes.ERROR:
            //now this state variable includes :- state={ token:null,errorMessage:''}
            // and what '{...state,errorMessage:action.payload}' this means is:- { token:null,errorMessage:'',errorMessage:action.payload}
            // where action.payload is 'Something Went Wrong with Sign Up' and so new errMessage will override old errMessage so it will become
            // return {token:null,errorMessage:"Something Went Wrong with Sign Up"} and as this return value will become our new state so 
            //after return state ={token:null,errorMessage:"Something Went Wrong with Sign Up"}
            return {...state,errMessage:action.payload};
        case actionTypes.SIGNUP_SIGNIN:
            // return {...state,token:action.payload , errMessage:""}; is same as
            return {token:action.payload , errMessage:""};
        case actionTypes.CLEAR_ERR_MESSAGE:
            return {...state,errMessage:""}
        case actionTypes.SIGNOUT:
            return {token:null,errMessage:""}
        default:
            return state;
     }
}
