import type { BoolVal } from "@ps/domain/validation/model.ts";

import { BoolValidationError } from "./error.validation.bool.ts";

export function boolValidation(_: BoolVal, value: unknown): BoolValidationError | undefined {
    if (typeof value !== "boolean") {
        return new BoolValidationError();
    }
}
