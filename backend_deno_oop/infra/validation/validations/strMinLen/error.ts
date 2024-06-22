export class StrMinLenValidationError extends Error {
    constructor(min: number) {
        super(`at least ${min} ${min > 1 ? "characters" : "character"}`);
    }
}
