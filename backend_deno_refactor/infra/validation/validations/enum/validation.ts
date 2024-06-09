import type { EnumVal } from "@ps/domain/validation/model.ts";

import { EnumValidationError } from "./error.ts";

export function enumValidation(val: EnumVal, value: unknown): EnumValidationError | undefined {
    if (!val.values.includes(value)) {
        return new EnumValidationError(val.values);
    }
}
