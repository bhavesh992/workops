import axios from 'axios';

const instance= axios.create({
    baseURL:"http://localhost:9090"
});

//to run the function before any request is made :-
instance.interceptors.request.use(
    //This has two functions inside it.First will be called automatically anytime we are about to make req.
    //Second function will be called automatically anytime their is an error with us making that req.Not neccessarily
    // error in response but if their is some error making that req like no internet connection or something like that
    async (config)=>{
        //config has info such has info abt url we are requesting to,any header attached,etc.
        //So inside here we will modify the config object to include token in header.
        const token=await localStorage.getItem("token");
        if(token){
            // console.log("INNN");
            config.headers.Authorization=`Bearer ${token}`;
        }
        // console.log(config);
        return config;
    },
    (err)=>{
        return Promise.reject(err);
    }
)

export default instance;