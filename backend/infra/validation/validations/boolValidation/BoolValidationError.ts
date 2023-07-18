export class BoolError extends Error {
    constructor() {
        super("must be a boolean");
    }
}
