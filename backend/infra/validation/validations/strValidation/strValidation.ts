import { StrValidationError } from "./StrValidationError.ts";

export function strValidation(value: unknown): StrValidationError | undefined {
    if (typeof value !== "string") {
        return new StrValidationError();
    }
}
