import type { StrMaxLenVal } from "@ps/domain/validation/model.ts";

import { StrMaxLenValidationError } from "./error.validation.strMaxLen.ts";

export function strMaxLenValidation(
    val: StrMaxLenVal,
    value: unknown,
): StrMaxLenValidationError | undefined {
    if (typeof value !== "string" || value.length > val.max) {
        return new StrMaxLenValidationError(val.max);
    }
}
