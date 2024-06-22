export class CompareBiggerValidationError extends Error {
    constructor(fieldToCompare: string) {
        super(`must be bigger than '${fieldToCompare}'`);
    }
}
