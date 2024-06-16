export type StrMaxLenVal = { readonly type: "strMaxLen"; readonly max: number };

export class StrMaxLenValidationError extends Error {
    constructor(max: number) {
        super(`at maximum ${max} ${max > 1 ? "characters" : "character"}`);
    }
}

export function strMaxLenValidation(
    val: StrMaxLenVal,
    value: unknown,
): StrMaxLenValidationError | undefined {
    if (typeof value !== "string" || value.length > val.max) {
        return new StrMaxLenValidationError(val.max);
    }
}
