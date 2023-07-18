import { BoolValidationError } from "./BoolValidationError.ts";

export function boolValidation(value: unknown): BoolValidationError | undefined {
    if (typeof value !== "boolean") {
        return new BoolValidationError();
    }
}
