import type { StrMinSpecialVal } from "@ps/domain/validation/model.ts";

import { StrMinSpecialValidationError } from "./StrMinSpecialValidationError.ts";

export function strMinSpecialValidation(
    val: StrMinSpecialVal,
    value: unknown,
): StrMinSpecialValidationError | undefined {
    if (typeof value !== "string") {
        return new StrMinSpecialValidationError(val.min);
    }
    const numLen = value.replaceAll(
        /[^(!|@|#|$|%|¨|&|*|(|\)|[|\]|{|}|+|\-|*|<|>|,|.|;|:|'|"|`|~|^|?|\´)]/g,
        "",
    ).length;
    if (val.min > numLen) {
        return new StrMinSpecialValidationError(val.min);
    }
}
