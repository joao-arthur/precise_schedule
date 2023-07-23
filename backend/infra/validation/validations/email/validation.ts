import type { EmailVal } from "@ps/domain/validation/model.ts";

import { EmailValidationError } from "./error.validation.email.ts";

export function emailValidation(_: EmailVal, value: unknown): EmailValidationError | undefined {
    if (typeof value !== "string") {
        return new EmailValidationError();
    }
    if (
        value.length < 5 || (!value.includes("@")) ||
        (!value.slice(value.indexOf("@")).includes("."))
    ) {
        return new EmailValidationError();
    }
}
