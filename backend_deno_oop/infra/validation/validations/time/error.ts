export class TimeValidationError extends Error {
    constructor() {
        super("must be a time in the format HH:mm");
    }
}
