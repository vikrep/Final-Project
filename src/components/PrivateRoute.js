import React from 'react';
import { Route, Redirect} from 'react-router-dom';

function PrivateRoute({ user, component: Component}){
    return(
        <Route render= { props => 
        user ?
        <Component />
        :
        <Redirect to="/admin" />
        } />
    )
};

export default PrivateRoute