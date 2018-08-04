import { Redirect } from 'react-router-dom';
import {browserHistory} from 'react-router';

export default class UsersService {
    constructor(key) {
        this.key = key;
        if (!(key in localStorage)) {
            let users = {};
            localStorage.setItem(key, JSON.stringify(users));
            this.users = JSON.parse(localStorage.getItem(key));

        }
        else {
            this.users = JSON.parse(localStorage.getItem(key));
        }
    }

    addUser(user) {
        if (!(user.login in this.users)) {
            this.users[user.login] = user;
            localStorage.setItem(this.key, JSON.stringify(this.users));
        };
    }

    removeUser(login) {
        delete this.users[login];
        localStorage.setItem(this.key, JSON.stringify(this.users))
    }
}
