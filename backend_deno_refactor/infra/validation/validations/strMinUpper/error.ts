export class StrMinUpperValidationError extends Error {
    constructor(min: number) {
        super(`at least ${min} uppercase letter`);
    }
}
