export class StrMinLowerValidationError extends Error {
    constructor(min: number) {
        super(`at least ${min} lowercase letter`);
    }
}
