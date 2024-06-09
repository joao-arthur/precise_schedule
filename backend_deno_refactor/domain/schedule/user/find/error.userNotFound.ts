export class UserNotFound extends Error {
    constructor() {
        super("The user was not found!");
    }
}
