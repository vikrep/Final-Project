import UsersService from '../UsersService/UsersService';

export default class RemovedUsersService extends UsersService {
    constructor() {
        super("removed")
    }
}
