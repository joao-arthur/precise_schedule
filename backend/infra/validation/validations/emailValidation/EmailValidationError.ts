export class EmailValidationError extends Error {
    constructor() {
        super("must be a email");
    }
}
