import type { StrVal } from "@ps/domain/validation/model.ts";
import { StrValidationError } from "./error.ts";

export function strValidation(_: StrVal, value: unknown): StrValidationError | undefined {
    if (typeof value !== "string") {
        return new StrValidationError();
    }
}
