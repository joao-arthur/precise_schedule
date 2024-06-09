export class EmailAlreadyRegistered extends Error {
    constructor() {
        super(
            "This e-mail is already registered, please use another one!",
        );
    }
}
