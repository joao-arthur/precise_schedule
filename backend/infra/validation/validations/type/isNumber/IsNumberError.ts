export class IsNumberError extends Error {
    constructor(field: string) {
        super(`"${field}" must be a number`);
    }
}
