import type { Result } from "../lang/result.ts";
import type { Schema, Validation } from "./schema.ts";
import { err, ok } from "../lang/result.ts";
import { boolValidation } from "./validations/bool.ts";
import { dtValidation } from "./validations/dt.ts";
import { dtMinValidation } from "./validations/dtMin.ts";
import { emailValidation } from "./validations/email.ts";
import { enumValidation } from "./validations/enum.ts";
import { strValidation } from "./validations/str.ts";
import { strMaxLenValidation } from "./validations/strMaxLen.ts";
import { strMinLenValidation } from "./validations/strMinLen.ts";
import { strMinNumValidation } from "./validations/strMinNum.ts";
import { strMinLowerValidation } from "./validations/strMinLower.ts";
import { strMinUpperValidation } from "./validations/strMinUpper.ts";
import { strMinSpecialValidation } from "./validations/strMinSpecial.ts";
import { timeValidation } from "./validations/time.ts";
import { compareBiggerValidation } from "./validations/compareBigger.ts";

type ValidationResult = {
    readonly [k: string]: readonly string[];
};

export class ValidationError extends Error {
    constructor(public readonly result: ValidationResult) {
        super();
    }
}

function execute<Keys>(
    validation: Validation,
    validated: Keys | null | undefined,
    key: keyof Keys,
): Error | undefined {
    switch (validation.type) {
        case "bool":
            return boolValidation(validation, validated?.[key]);
        case "dt":
            return dtValidation(validation, validated?.[key]);
        case "dtMin":
            return dtMinValidation(validation, validated?.[key]);
        case "email":
            return emailValidation(validation, validated?.[key]);
        case "enum":
            return enumValidation(validation, validated?.[key]);
        case "str":
            return strValidation(validation, validated?.[key]);
        case "strMaxLen":
            return strMaxLenValidation(validation, validated?.[key]);
        case "strMinLen":
            return strMinLenValidation(validation, validated?.[key]);
        case "strMinNum":
            return strMinNumValidation(validation, validated?.[key]);
        case "strMinLower":
            return strMinLowerValidation(validation, validated?.[key]);
        case "strMinUpper":
            return strMinUpperValidation(validation, validated?.[key]);
        case "strMinSpecial":
            return strMinSpecialValidation(validation, validated?.[key]);
        case "time":
            return timeValidation(validation, validated?.[key]);
        case "compareBigger":
            return compareBiggerValidation(
                validation,
                validated?.[key],
                validated?.[validation.field as keyof Keys],
            );
    }
}

export function validateSchema<Keys>(
    schema: Schema<Keys>,
    validated: Keys | undefined | null,
): Result<void, ValidationError> {
    const entries = Object.entries<readonly Validation[]>(schema);
    const result = entries
        .map(([key, validations]) => [
            key,
            validations
                .map((validation) => execute(validation, validated, key as keyof Keys))
                .filter(Boolean)
                .map((err) => (err as Error).message),
        ])
        .filter(([_, message]) => message.length);
    if (!result.length) {
        return ok(undefined);
    }
    const obj: ValidationResult = Object.fromEntries(result);
    return err(new ValidationError(obj));
}
