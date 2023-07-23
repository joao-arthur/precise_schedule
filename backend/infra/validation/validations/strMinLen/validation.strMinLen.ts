import type { StrMinLenVal } from "@ps/domain/validation/model.ts";

import { StrMinLenValidationError } from "./StrMinLenValidationError.ts";

export function strMinLenValidation(
    val: StrMinLenVal,
    value: unknown,
): StrMinLenValidationError | undefined {
    if (typeof value !== "string" || value.length < val.min) {
        return new StrMinLenValidationError(val.min);
    }
}
