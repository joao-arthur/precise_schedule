import { IsStringError } from "./IsStringError.ts";

export function isString(
    field: string,
    value: unknown,
): IsStringError | undefined {
    if (typeof value !== "string") {
        return new IsStringError(field);
    }
}
