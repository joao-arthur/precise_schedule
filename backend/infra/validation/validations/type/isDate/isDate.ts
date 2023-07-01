import { IsDateError } from "./IsDateError.ts";

export function isDate(
    field: string,
    value: unknown,
): IsDateError | undefined {
    if (!(value instanceof Date)) {
        return new IsDateError(field);
    }
}
