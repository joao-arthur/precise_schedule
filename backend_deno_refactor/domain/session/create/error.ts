export class SessionCreateError extends Error {
    constructor() {
        super("It was not possible to create your session!");
    }
}
