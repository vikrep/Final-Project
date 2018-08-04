import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {browserHistory} from 'react-router';

import ActiveUsersService from "../ActiveUsersService/ActiveUsersService";
import RemovedUsersService from '../RemovedUsersService/RemovedUsersService';
import activeUsers from '../ActiveUsersService/ActiveUsersService';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginValue: '',
            passwordValue: ''
        };
        this.loginHandleChange = this.loginHandleChange.bind(this);
        this.passwordHandleChange = this.passwordHandleChange.bind(this);
        this.buttonHandler = this.buttonHandler.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
    }

    //  handleLogout = history => () => {
    //     store.remove('loggedIn');
    //     history.push('/login');
    //   };

      
    componentWillMount() {
        this.handleLoad()
    }

    handleLoad() {
        window.activeUsers = new ActiveUsersService();
        window.removedUsers = new RemovedUsersService();
    }

    loginHandleChange(event) {
        this.setState({
            loginValue: event.target.value
        })
    }

    passwordHandleChange(event) {
        this.setState({
            passwordValue: event.target.value
        })
    }
    buttonHandler(event) {
        if(activeUsers.getUser(this.state.loginValue, this.state.passwordValue)){
            this.props.history.push('/adminPanel');

        }
        return false
    }

    

    render() {
        return (
            <div className="formInput">

                <form onSubmit={this.buttonHandler}>
                    <label>
                        Login
                        <input type="text" placeholder="Enter Login" value={this.state.loginValue}
                               onChange={this.loginHandleChange} required  /> 
                    </label >
                    {/* <div onClick={this.props.history.push('/path')}> some stuff </div> */}


                    <label>
                        Password
                        <input type="password" placeholder="Enter Password" value={this.state.passwordValue}
                               onChange={this.passwordHandleChange} required/>
                    </label>
                    <input className="logButton" type="submit" value="Login"/>
                </form>
                <Link to='/RegisterInput'>Register </Link>
                <img alt="3" src="/assets/3.jpg" responsive />

                     
            </div>
        )
    }
}

  

export default LoginForm;
