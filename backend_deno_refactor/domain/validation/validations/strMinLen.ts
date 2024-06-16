export type StrMinLenVal = { readonly type: "strMinLen"; readonly min: number };

export class StrMinLenValidationError extends Error {
    constructor(min: number) {
        super(`at least ${min} ${min > 1 ? "characters" : "character"}`);
    }
}

export function strMinLenValidation(
    val: StrMinLenVal,
    value: unknown,
): StrMinLenValidationError | undefined {
    if (typeof value !== "string" || value.length < val.min) {
        return new StrMinLenValidationError(val.min);
    }
}
