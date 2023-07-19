export class StrMinSpecialValidationError extends Error {
    constructor(min: number) {
        super(`at least ${min} special letter`);
    }
}
