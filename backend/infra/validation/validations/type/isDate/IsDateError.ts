export class IsDateError extends Error {
    constructor(field: string) {
        super(`"${field}" must be a date`);
    }
}
