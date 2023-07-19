import type { Schema } from "@ps/domain/validation/Schema.ts";
import type { Validator } from "@ps/domain/validation/Validator.ts";
import type { Validation } from "@ps/domain/validation/Validation.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { executeValidation } from "./executeValidation.ts";

export class ValidatorImpl implements Validator {
    public validate<Keys>(
        validated: Keys,
        schema: Schema<Keys>,
    ): void {
        const entries = Object.entries<readonly Validation[]>(schema);
        const result = entries
            .map(([key, validations]) =>
                [
                    key,
                    validations
                        .map((val) => executeValidation(val, validated[key as keyof Keys]))
                        .filter(Boolean)
                        .map((err) => (err as Error).message),
                ] as const
            )
            .filter(([_, message]) => message.length);
        if (!result.length) return;
        const obj = Object.fromEntries(result);
        throw new ValidationError(obj);
    }
}
