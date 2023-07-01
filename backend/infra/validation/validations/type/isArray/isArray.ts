import { IsArrayError } from "./IsArrayError.ts";

export function isArray(
    field: string,
    value: unknown,
): IsArrayError | undefined {
    if (!(value instanceof Array)) {
        return new IsArrayError(field);
    }
}
