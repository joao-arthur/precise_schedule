import type { Schema } from "@ps/domain/validation/Schema.ts";
import type { ValidatorService } from "@ps/domain/validation/validator/service.ts";
import type { ValidatorProvider } from "@ps/domain/validation/validator/provider.ts";
import type { Validation } from "@ps/domain/validation/model.ts";
import type { ValidationResult } from "@ps/domain/validation/ValidationResult.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";

export class ValidatorServiceImpl implements ValidatorService {
    constructor(private readonly provider: ValidatorProvider) {}

    public validate<Keys>(
        validated: Keys,
        schema: Schema<Keys>,
    ): void {
        const entries = Object.entries<readonly Validation[]>(schema);
        const result = entries
            .map(([key, validations]) => [
                key,
                validations
                    .map((validation) =>
                        this.provider.execute(validation, validated[key as keyof Keys])
                    )
                    .filter(Boolean)
                    .map((err) => (err as Error).message),
            ])
            .filter(([_, message]) => message.length);
        if (!result.length) return;
        const obj: ValidationResult = Object.fromEntries(result);
        throw new ValidationError(obj);
    }
}
