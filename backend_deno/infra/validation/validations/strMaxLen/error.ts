export class StrMaxLenValidationError extends Error {
    constructor(max: number) {
        super(`at maximum ${max} ${max > 1 ? "characters" : "character"}`);
    }
}
