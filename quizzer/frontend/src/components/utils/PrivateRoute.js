import React from 'react'
import { Route, Redirect } from "react-router-dom"

//see what component the user is at, authed is boolean 
function PrivateRoute({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            //if auth is true continue
            render={(props) => authed === true
            ? <Component {...props} />
            //redirects to login page if not logged in
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    )
}

export default PrivateRoute