export class BoolValidationError extends Error {
    constructor() {
        super("must be a boolean");
    }
}
