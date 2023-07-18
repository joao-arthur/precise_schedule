export class DtError extends Error {
    constructor() {
        super("must be a date in the format YYYY-MM-DD");
    }
}
