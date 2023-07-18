export class EnumError extends Error {
    constructor(values: readonly unknown[]) {
        super(`must be one of: (${values.join(", ")})`);
    }
}
