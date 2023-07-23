import type { DtMinVal } from "@ps/domain/validation/model.ts";

import { DtMinValidationError } from "./DtMinValidationError.ts";

export function dtMinValidation(val: DtMinVal, value: unknown): DtMinValidationError | undefined {
    if (
        new Date(`${value}T00:00:00.000Z`).toString() === "Invalid Date" ||
        new Date(`${val.min}T00:00:00.000Z`) > new Date(`${value}T00:00:00.000Z`)
    ) {
        return new DtMinValidationError(val.min);
    }
}
