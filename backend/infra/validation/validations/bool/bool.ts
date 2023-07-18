import { IsBooleanError } from "./IsBooleanError.ts";

export function isBoolean(
    field: string,
    value: unknown,
): IsBooleanError | undefined {
    if (typeof value !== "boolean") {
        return new IsBooleanError(field);
    }
}
