export class IsStringError extends Error {
    constructor(field: string) {
        super(`"${field}" must be a string`);
    }
}
