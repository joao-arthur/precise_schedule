import { IsNumberError } from "./IsNumberError.ts";

export function isNumber(
    field: string,
    value: unknown,
): IsNumberError | undefined {
    if (typeof value !== "number") {
        return new IsNumberError(field);
    }
}
