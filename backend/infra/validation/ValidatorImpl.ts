import { Schema } from "@ps/domain/validation/Schema.ts";
import { Validator } from "@ps/domain/validation/Validator.ts";
import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { V } from "@ps/domain/validation/V.ts";
import { required } from "./validations/required/required.ts";
import { isString } from "./validations/type/isString/isString.ts";

export class ValidatorImpl implements Validator {
    public validate<Keys>(
        validated: Keys,
        schema: Schema<Keys>,
    ): void {
        const schemaEntries = Object.entries<readonly V[]>(schema);
        const schemaResult = schemaEntries.map(([key, validations]) =>
            [
                key,
                validations
                    .map((val) => {
                        switch (val) {
                            case V.required:
                                return required(
                                    key,
                                    validated[key as keyof Keys],
                                );
                            case V.isString:
                                return isString(
                                    key,
                                    validated[key as keyof Keys],
                                );
                        }
                    })
                    .filter(Boolean)
                    .map((err) => (err as Error).message),
            ] as const
        );
        const hasError = schemaResult.some(([_, err]) => err.length);
        if (hasError) {
            const obj = Object.fromEntries(schemaResult);
            throw new ValidationError(obj);
        }
    }
}
