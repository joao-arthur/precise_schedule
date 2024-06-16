export type StrMinSpecialVal = { readonly type: "strMinSpecial"; readonly min: number };

export class StrMinSpecialValidationError extends Error {
    constructor(min: number) {
        super(`at least ${min} special character`);
    }
}

export function strMinSpecialValidation(
    val: StrMinSpecialVal,
    value: unknown,
): StrMinSpecialValidationError | undefined {
    if (typeof value !== "string") {
        return new StrMinSpecialValidationError(val.min);
    }
    const numLen = value.replaceAll(
        /[^(!|@|#|$|%|¨|&|*|(|\)|[|\]|{|})]/g,
        "",
    ).length;
    if (val.min > numLen) {
        return new StrMinSpecialValidationError(val.min);
    }
}
