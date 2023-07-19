export class StrMinNumValidationError extends Error {
    constructor(min: number) {
        super(`at least ${min} number`);
    }
}
