import { EnumValidationError } from "./EnumValidationError.ts";

export const enumValidation =
    (values: readonly unknown[]) => (value: unknown): EnumValidationError | undefined => {
        if (!values.includes(value)) {
            return new EnumValidationError(values);
        }
    };
