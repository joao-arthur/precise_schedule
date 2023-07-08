export class InvalidSessionError extends Error {
    constructor() {
        super("Your session is not valid!");
    }
}
