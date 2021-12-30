import React,{useEffect,useState} from 'react';
import './App.css';
import { BrowserRouter as Router , Route, Switch, Redirect,useLocation,useHistory } from 'react-router-dom';
import SignIn from './components/SignIn';
import PageNotFound from './components/PageNotFound.jsx';
import SignUp from './components/SignUp';
import Paperbase from './components/Paperbase.js';
import PrivateRoutes from "./PrivateRoutes.js"
import PublicRoutes from "./PublicRoutes.js"
import Logout from './components/Logout.js';
import ForgotPassword from './components/ForgotPassword';

function App() {

  // const {token}=useSelector(state => state.AuthReducer);
  // let location = useLocation();
  // let history=useHistory();
  // useEffect(()=>{
  //   if(!localStorage.getItem("token")){
  //     history.push("/signin");
  //   }
  // },[location]);  

  return (
    <div className="app">
      <Router>
        <Switch>
          {/* <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/**" component={PageNotFound} /> */}

          {/* Use of excat attribute :
           -suppose you have specified  path="/" component="landingPage" now anytime to provide paths like "/" or "/page2" 
            "/page2/page3" in all this cases it will open landing page only coz it will just see that "/" is present in url.
            Eg 2: 
            suppose you have specified  path="/page" component="landingPage" now anytime to provide paths like "/page" or "/page/page2" 
            "/page/page2/page3" in all this cases it will open landing page only coz it will just see that "/page" is present in url.
            So hence to prevent such behavior and to make it understand that only render landingPage when url is "/page" we use exact attr.
           */}
          <Route path="/" exact render={() => <Redirect to="/signin"/>} />
          <PublicRoutes path="/signin" exact component={SignIn} />          
          <PublicRoutes path="/signup" exact component={SignUp} />
          <PublicRoutes path="/forgotpassword" exact component={ForgotPassword} />
          <PrivateRoutes path="/dashboard" exact component={Paperbase} />
          <PrivateRoutes path="/projects" exact component={Paperbase} />
          <PrivateRoutes path="/backlog" exact component={Paperbase} />
          <PrivateRoutes path="/projectsettings/:id" exact component={Paperbase} />
          <PrivateRoutes path="/projectteam" exact component={Paperbase} />
          <PrivateRoutes path="/createproject" exact component={Paperbase} />
          <PrivateRoutes path="/components" exact component={Paperbase} />
          <PrivateRoutes path="/versions" exact component={Paperbase} />
          <PrivateRoutes path="/sprints" exact component={Paperbase} />
          <PrivateRoutes path="/components/:id" exact component={Paperbase} />
          <PrivateRoutes path="/issues/new" exact component={Paperbase} />
          <PrivateRoutes path="/issues/:id" exact component={Paperbase} />
          <PrivateRoutes path="/versions/:id" exact component={Paperbase} />
          <PrivateRoutes path="/sprints/:id" exact component={Paperbase} />
          <Route path="/logout" exact  component={Logout} />
          <PrivateRoutes path="/userprofile" exact component={Paperbase} />
          
          <Route path="/*" component={PageNotFound} />
        </Switch>
      </Router>      
    </div>
  );
}

export default App;