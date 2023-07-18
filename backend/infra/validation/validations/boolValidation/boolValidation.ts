import type { BoolVal } from "@ps/domain/validation/Validation.ts";

import { BoolValidationError } from "./BoolValidationError.ts";

export function boolValidation(_: BoolVal, value: unknown): BoolValidationError | undefined {
    if (typeof value !== "boolean") {
        return new BoolValidationError();
    }
}
