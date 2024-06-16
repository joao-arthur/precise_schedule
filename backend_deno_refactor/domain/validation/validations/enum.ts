export type EnumVal = { readonly type: "enum"; readonly values: readonly unknown[] };

export class EnumValidationError extends Error {
    constructor(values: readonly unknown[]) {
        super(`must be one of: (${values.join(", ")})`);
    }
}

export function enumValidation(val: EnumVal, value: unknown): EnumValidationError | undefined {
    if (!val.values.includes(value)) {
        return new EnumValidationError(val.values);
    }
}
