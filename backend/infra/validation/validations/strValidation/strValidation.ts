import type { StrVal } from "@ps/domain/validation/V.ts";

import { StrValidationError } from "./StrValidationError.ts";

export function strValidation(_: StrVal, value: unknown): StrValidationError | undefined {
    if (typeof value !== "string") {
        return new StrValidationError();
    }
}
