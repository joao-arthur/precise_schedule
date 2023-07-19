import type { StrMaxLenVal } from "@ps/domain/validation/Validation.ts";

import { StrMaxLenValidationError } from "./StrMaxLenValidationError.ts";

export function strMaxLenValidation(
    val: StrMaxLenVal,
    value: unknown,
): StrMaxLenValidationError | undefined {
    if (
        typeof value !== "string" ||
        value.length > val.max
    ) {
        return new StrMaxLenValidationError(val.max);
    }
}
