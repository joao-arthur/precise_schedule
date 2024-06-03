export class UsernameAlreadyRegistered extends Error {
    constructor() {
        super(
            "This username is already registered, please use another one!",
        );
    }
}
