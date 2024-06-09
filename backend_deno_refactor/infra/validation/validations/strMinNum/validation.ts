import type { StrMinNumVal } from "@ps/domain/validation/model.ts";
import { StrMinNumValidationError } from "./error.ts";

export function strMinNumValidation(
    val: StrMinNumVal,
    value: unknown,
): StrMinNumValidationError | undefined {
    if (typeof value !== "string") {
        return new StrMinNumValidationError(val.min);
    }
    const numLen = value.replaceAll(/[^\d]/g, "").length;
    if (val.min > numLen) {
        return new StrMinNumValidationError(val.min);
    }
}
