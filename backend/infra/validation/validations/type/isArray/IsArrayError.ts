export class IsArrayError extends Error {
    constructor(field: string) {
        super(`"${field}" must be a array`);
    }
}
