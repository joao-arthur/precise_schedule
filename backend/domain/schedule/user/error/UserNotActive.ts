export class UserNotActive extends Error {
    constructor() {
        super("The user is not active!");
    }
}
