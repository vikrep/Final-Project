import React, {Component} from 'react';

import ActiveUsersService from '../ActiveUsersService/ActiveUsersService';
import RemovedUsersService from '../RemovedUsersService/RemovedUsersService';

class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            base: '',
        };
        this.activeUsersBtnHandler = this.activeUsersBtnHandler.bind(this);
        this.removedUsersBtnHandler = this.removedUsersBtnHandler.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.activateBtnHandler = this.activateBtnHandler.bind(this);
        this.removeBtnHandler = this.removeBtnHandler.bind(this);
    }

    componentWillMount() {
        this.handleLoad()
    }

    handleLoad() {
        window.activeUsers = new ActiveUsersService();
        window.removedUsers = new RemovedUsersService();
        this.setState({
            base: window.activeUsers
        });
    }

    activeUsersBtnHandler() {
        this.setState({
            base: window.activeUsers
        });
    }

    removedUsersBtnHandler() {
        this.setState({
            base: window.removedUsers
        });
    }

    activateBtnHandler(e) {
        let userLogin = e.target.id;
        let user = this.state.base.users[userLogin];
        window.activeUsers.addUser(user);
        window.removedUsers.removeUser(userLogin);
        this.setState({
            base: window.activeUsers
            
        });
    }

    removeBtnHandler(e) {
        let userLogin = e.target.id;
        let user = this.state.base.users[userLogin];
        if (this.state.base.key == "active") {
            window.removedUsers.addUser(user);
            window.activeUsers.removeUser(userLogin);
            this.setState({
                base: window.activeUsers
            })
        }
        if (this.state.base.key == "removed") {
            window.removedUsers.removeUser(userLogin);
            this.setState({
                base: window.removedUsers
            })
        }
    }

    createTable(data) {
        let obj = data.users;
        let key;
        return Object.keys(obj).map(key => {
                let user = obj[key];
                if (data.key == "active") {
                    return (<tr key={user.login}>
                        <td>{user.name}</td>
                        <td>{user.lastName}</td>
                        <td>{user.login}</td>
                        <td>{user.pass}</td>
                        <td>
                            <button id={user.login} className="logButton" onClick={this.removeBtnHandler}>Remove</button>
                        </td>
                    </tr>)
                }
                if (data.key == "removed") {
                    return (<tr key={user.login}>
                        <td>{user.name}</td>
                        <td>{user.lastName}</td>
                        <td>{user.login}</td>
                        <td>{user.pass}</td>
                        <td>
                            <button id={user.login} className="logButton" onClick={this.removeBtnHandler}>Remove</button>
                        </td>
                        <td>
                            <button id={user.login} className="logButton" onClick={this.activateBtnHandler}>Activate
                            </button>
                        </td>
                    </tr>)

                }
            }
        )
    }


    render() {
        return (
            <div className="admin">
                <button key="activeusers" onClick={this.activeUsersBtnHandler} className="logButton">Active Users
                </button>
                <button key="removedusers" onClick={this.removedUsersBtnHandler} className="logButton">Removed Users
                </button>
                <table>
                    <tbody>
                    <tr key="up">
                        <td>Name</td>
                        <td>Last Name</td>
                        <td>Login</td>
                        <td>Password</td>
                    </tr>
                    {this.createTable(this.state.base)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AdminPanel;
