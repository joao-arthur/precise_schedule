export class IsBooleanError extends Error {
    constructor(field: string) {
        super(`"${field}" must be a boolean`);
    }
}
