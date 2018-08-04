import UsersService from '../UsersService/UsersService';

export default class ActiveUsersService extends UsersService {
    constructor() {
        super("active")
    }

    getUser(login, password) {
        let found = false;
        if ((login in this.users) && (this.users[login].pass == password)) {
            return found = true;
            
        }
    }

}
