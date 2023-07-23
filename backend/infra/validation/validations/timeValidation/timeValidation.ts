import type { TimeVal } from "@ps/domain/validation/model.ts";

import { TimeValidationError } from "./TimeValidationError.ts";

export function timeValidation(_: TimeVal, value: unknown): TimeValidationError | undefined {
    if (new Date(`1917-11-07T${value}:00.000Z`).toString() === "Invalid Date") {
        return new TimeValidationError();
    }
}
