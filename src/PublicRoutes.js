import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PublicRoutes = ({
    component: Component,
    ...rest
  }) => {

    // console.log("Public= "+token);
    return (
        <Route
            {...rest}
            render={props => {
                if (!localStorage.getItem("token")) {
                return <Component {...props} />;
                } else {
                    alert("Already Signed In");
                return (
                    <Redirect
                    to="/projects"
                    />
                );
                }
            }}
        />
    );
}
export default PublicRoutes;