export type CompareBiggerVal = { readonly type: "compareBigger"; readonly field: string };

export class CompareBiggerValidationError extends Error {
    constructor(fieldToCompare: string) {
        super(`must be bigger than '${fieldToCompare}'`);
    }
}

export function compareBiggerValidation(
    val: CompareBiggerVal,
    valueA: unknown,
    valueB: unknown,
): CompareBiggerValidationError | undefined {
    if (!valueA) return new CompareBiggerValidationError(val.field);
    if (!valueB) return new CompareBiggerValidationError(val.field);
    if (valueB >= valueA) {
        return new CompareBiggerValidationError(val.field);
    }
}
