
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import FlatButton from 'material-ui/FlatButton';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import Button from 'material-ui/Button';
// import { FlatButton } from 'material-ui';


import {BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import SearchPage from './components/SearchPage';
import Welcome from './components/WelcomePage';
// import Login from './components/Login';
// import {browserHistory,IndexRoute} from 'react-router';
// import injectTapEventPlugin from 'react-tap-event-plugin';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import Signup from './components/Signup';
// import Logout from './components/Logout';
// import { Link, IndexLink } from 'react-router';
// import AppBar from 'material-ui/AppBar';
// import { FlatButton } from 'material-ui';
import Admin from './Admin';





// injectTapEventPlugin();

// export  class MainComponent extends React.Component {
//         render() {

//             return (
//               <MuiThemeProvider muiTheme={getMuiTheme()}>
//                  <Router history={browserHistory}>
//                      <Route path="/" component={App}>
//                        <IndexRoute component={Login}/>
//                        <Route path={'Signup'} component={Signup}/>
//                          <Route path={'Login'} component={Login}/>
//                          <Route path={'Logout/:user'} component={Logout}/>
//                        </Route>
//                  </Router>
//              </MuiThemeProvider>
//            );
//             }



//         }

//         export class Main extends React.Component{
//           constructor(props){
//             super(props);
//           }
//           render(){
//             return(
//               <div className='container-fluid'>
//                 <AppBar title="React Login App" id="title"
//                 showMenuIconButton = {false}
//                   iconElementRight = { <div className="top-bar-right">
//                   <Link to="/login"><Button label="Login"/></Link>
        
//                 </div>}
        
//                 />
//               {this.props.children}
//              </div>
//           );
        
//           }
//         }
        

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        {/* <Navbar /> */}
        <Route exact path="/" component={Welcome} />
        <Route path="/search" component={SearchPage} />
        <Route path="/Admin" component={Admin} />

      </div>
       </Router>
       
    );
    
  }
}

export default App;