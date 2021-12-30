import {actionTypes} from '../actions/ProjectActions';
const initialState={
    projectId:null,
    errMessage: '',
    role:null
}

export const ProjectReducer = (state = initialState, action) => {
     switch(action.type){
        case actionTypes.ERROR:
            return {...state,errMessage:action.payload};
        case actionTypes.SELECT_PROJECT:
            return {...state.projectId,projectId:action.payload.projectId, errMessage:"",role:action.payload.role};
        default:
            return state;
     }
}
