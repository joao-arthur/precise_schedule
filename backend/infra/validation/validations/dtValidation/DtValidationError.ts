export class DtValidationError extends Error {
    constructor() {
        super("must be a date in the format YYYY-MM-DD");
    }
}
