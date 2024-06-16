export type StrMinNumVal = { readonly type: "strMinNum"; readonly min: number };

export class StrMinNumValidationError extends Error {
    constructor(min: number) {
        super(`at least ${min} number`);
    }
}

export function strMinNumValidation(
    val: StrMinNumVal,
    value: unknown,
): StrMinNumValidationError | undefined {
    if (typeof value !== "string") {
        return new StrMinNumValidationError(val.min);
    }
    const numLen = value.replaceAll(/[^\d]/g, "").length;
    if (val.min > numLen) {
        return new StrMinNumValidationError(val.min);
    }
}
