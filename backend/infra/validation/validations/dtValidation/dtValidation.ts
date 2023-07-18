import { DtValidationError } from "./DtValidationError.ts";

export function dtValidation(value: unknown): DtValidationError | undefined {
    if (!(value instanceof Date)) {
        return new DtValidationError();
    }
}
