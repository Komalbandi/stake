import {UsersInterface} from '../../../interfaces';

export class UsersModel {
    users: UsersInterface[];

    constructor(data: UsersInterface[]) {
        this.users = data;
    }

    get all() {
        return this.users;
    }
}
