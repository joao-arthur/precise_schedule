export class DtMinValidationError extends Error {
    constructor(min: string) {
        super(`must be greater than ${min}`);
    }
}
