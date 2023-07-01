import { RequiredError } from "./RequiredError.ts";

export function required(
    field: string,
    value: unknown,
): RequiredError | undefined {
    if (value === undefined || value === null) {
        return new RequiredError(field);
    }
}
