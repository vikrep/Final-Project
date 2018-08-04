import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import {browserHistory} from 'react-router';

import SearchPage from './components/SearchPage';
import Welcome from './components/WelcomePage';
import LoginInput from './components/LoginInput';
import RegisterInput from './components/RegisterInput';
import AdminPanel from './components/AdminPanel';
import { Redirect } from 'react-router-dom';
// import isLoggedIn from '../../helpers/is_logged_in';


// import Login from './Login';

// const App = () => (
//   <div className="app-routes">
//     <Switch>
//       <Route path="/login" component={Login} />
//       <Route path="/" component={Cms} />
//     </Switch>
//   </div>
// );



class App extends Component {
  render() {
    return (
      <Router>
      <div>
        {/* <Navbar /> */}
        <Route exact path="/" component={Welcome} />
        <Route path="/search" component={SearchPage} />
        <Route path="/test" component={TestPage} />
        {/* <Route path="/login" component={AdminPanel} /> */}
        <Route path="/login" component={LoginInput} />
        <Route path="/RegisterInput" component={RegisterInput} />

         {/* <Route path="/login" component={LoginPage} /> */}
         {/* <Route path="/asd" component={registerServiceWorker} /> */}
      </div>
       </Router>
    );
  }
}

export default App;





