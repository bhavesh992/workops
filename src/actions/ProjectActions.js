import WorkOpsApi from "../api/WorkOpsBackend";


export const actionTypes={
    ERROR : 'ERROR',
    SELECT_PROJECT : 'SELECT_PROJECT',
    CLEAR_ERR_MESSAGE:"CLEAR_ERR_MESSAGE",
    CHANGE_ROLE:"CHANGE_ROLE"
};
export const switchProject= async(newProjectId,dispatch)=>{
    try{
        WorkOpsApi.get('/api/user/'+localStorage.getItem("token"))
        .then(res1=>{
            WorkOpsApi.put('/api/userprofiles/switchproject/'+res1.data.email,{selectedProject:newProjectId})
            .then(res=>{
                WorkOpsApi.get('/api/projectteam/'+newProjectId+'/'+res1.data.email)
                .then(res2=>{
                    dispatch({type:actionTypes.SELECT_PROJECT,payload:{projectId:newProjectId,role:res2.data.role.role}});
                }); 
            });
        })
        // return true;
    }catch(error){
        dispatch({type:actionTypes.ERROR,payload:error.response.data.error});
        // return false;
    }
};
export const unsetProject=(dispatch)=>{
    dispatch({type:actionTypes.SELECT_PROJECT,payload:{projectId:null,role:null}});    
}
export const getProject= async(dispatch)=>{
    try{
        // console.log("called getProject");
        WorkOpsApi.get('/api/user/'+localStorage.getItem("token"))
        .then(res=>{
            // console.log("User email= "+res.data.email); 
            WorkOpsApi.get('/api/userprofiles/'+res.data.email)
            .then(res1=>{ 
                if(res1.data.selectedProject){
                    WorkOpsApi.get('/api/projectteam/'+res1.data.selectedProject+"/"+res.data.email)
                    .then(res2=>{
                        // console.log(res.data.email); 
                        // console.log(res1.data.selectedProject); 
                        // console.log("selected Proj= "+res2.data);
                       dispatch({type:actionTypes.SELECT_PROJECT,payload:{projectId:res1.data.selectedProject,role:res2.data.role.role}});
                    //    dispatch({type:actionTypes.SELECT_PROJECT,payload:res1.data.selectedProject});
                    //    dispatch({type:actionTypes.CHANGE_ROLE,payload:res2.data.role.role});
                    })               
                }
            })
            .catch(e=>{
                console.log(e.response.data);
            })
        })
        // console.log(response);

    }
    catch(error){
        dispatch({type:actionTypes.ERROR,payload:error.response.data.error});        
    }
};