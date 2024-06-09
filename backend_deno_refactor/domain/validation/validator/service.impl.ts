import type { Result } from "../../lang/result.ts";
import type { Schema } from "../schema.ts";
import type { Validation } from "../model.ts";
import type { ValidationResult } from "../ValidationResult.ts";
import type { ValidatorService } from "./service.ts";
import type { ValidatorProvider } from "./provider.ts";

import { buildErr, buildOk } from "../../lang/result.ts";
import { ValidationError } from "../ValidationError.ts";

export class ValidatorServiceImpl implements ValidatorService {
    constructor(private readonly provider: ValidatorProvider) {}

    public validate<Keys>(
        validated: Keys | undefined | null,
        schema: Schema<Keys>,
    ): Result<void, ValidationError> {
        const entries = Object.entries<readonly Validation[]>(schema);
        const result = entries
            .map(([key, validations]) => [
                key,
                validations
                    .map((validation) =>
                        this.provider.execute(validation, validated, key as keyof Keys)
                    )
                    .filter(Boolean)
                    .map((err) => (err as Error).message),
            ])
            .filter(([_, message]) => message.length);
        if (!result.length) {
            return buildOk(undefined);
        }
        const obj: ValidationResult = Object.fromEntries(result);
        return buildErr(new ValidationError(obj));
    }
}
