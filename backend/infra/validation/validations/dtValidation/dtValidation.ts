import type { DtVal } from "@ps/domain/validation/V.ts";

import { DtValidationError } from "./DtValidationError.ts";

export function dtValidation(_: DtVal, value: unknown): DtValidationError | undefined {
    if (new Date(`${value}T00:00:00.000Z`).toString() === "Invalid Date") {
        return new DtValidationError();
    }
}
