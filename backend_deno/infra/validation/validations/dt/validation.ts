import type { DtVal } from "@ps/domain/validation/model.ts";

import { DtValidationError } from "./error.ts";

export function dtValidation(_: DtVal, value: unknown): DtValidationError | undefined {
    if (new Date(`${value}T00:00:00.000Z`).toString() === "Invalid Date") {
        return new DtValidationError();
    }
}
