export type BoolVal = { readonly type: "bool" };

export class BoolValidationError extends Error {
    constructor() {
        super("must be a boolean");
    }
}

export function boolValidation(_: BoolVal, value: unknown): BoolValidationError | undefined {
    if (typeof value !== "boolean") {
        return new BoolValidationError();
    }
}
