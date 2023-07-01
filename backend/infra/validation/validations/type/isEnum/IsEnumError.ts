export class IsEnumError extends Error {
    constructor(field: string, values: readonly unknown[]) {
        super(`"${field}" must be one of: (${values.join(", ")})`);
    }
}
