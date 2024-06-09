export class StrValidationError extends Error {
    constructor() {
        super("must be a string");
    }
}
