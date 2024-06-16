export type StrVal = { readonly type: "str" };

export class StrValidationError extends Error {
    constructor() {
        super("must be a string");
    }
}

export function strValidation(_: StrVal, value: unknown): StrValidationError | undefined {
    if (typeof value !== "string") {
        return new StrValidationError();
    }
}
