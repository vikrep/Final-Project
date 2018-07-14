import React from 'react'
import {Route, IndexRoute} from 'react-router'

import requireAuth from './utils/requireAuth'

import App from './App'
import Login from './components/Login'
import Welcome from './components/Welcome'
import Signup from './components/Signup'
import LoggedIn from './components/LoggedIn'

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Welcome}/>
        <Route path="login" component={Login}/>
        <Route path="signup" component={Signup}/>
        <Route path="loggedin" component={requireAuth(LoggedIn)}/>
    </Route>
)