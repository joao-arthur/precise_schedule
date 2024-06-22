import type { Result } from "../lang/result.ts";
import type { Schema, Validation } from "./schema.ts";
import { err, ok } from "../lang/result.ts";
import { boolV } from "./validations.ts";
import { dtV } from "./validations.ts";
import { dtMinV } from "./validations.ts";
import { emailV } from "./validations.ts";
import { enumV } from "./validations.ts";
import { strV } from "./validations.ts";
import { strMaxLenV } from "./validations.ts";
import { strMinLenV } from "./validations.ts";
import { strMinNumV } from "./validations.ts";
import { strMinLowerV } from "./validations.ts";
import { strMinUpperV } from "./validations.ts";
import { strMinSpecialV } from "./validations.ts";
import { timeV } from "./validations.ts";
import { gtV } from "./validations.ts";

type ValidationResult = {
    readonly [k: string]: readonly string[];
};

export class ValidationErr extends Error {
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
            return boolV(validation, validated?.[key]);
        case "dt":
            return dtV(validation, validated?.[key]);
        case "dtMin":
            return dtMinV(validation, validated?.[key]);
        case "email":
            return emailV(validation, validated?.[key]);
        case "enum":
            return enumV(validation, validated?.[key]);
        case "str":
            return strV(validation, validated?.[key]);
        case "strMaxLen":
            return strMaxLenV(validation, validated?.[key]);
        case "strMinLen":
            return strMinLenV(validation, validated?.[key]);
        case "strMinNum":
            return strMinNumV(validation, validated?.[key]);
        case "strMinLower":
            return strMinLowerV(validation, validated?.[key]);
        case "strMinUpper":
            return strMinUpperV(validation, validated?.[key]);
        case "strMinSpecial":
            return strMinSpecialV(validation, validated?.[key]);
        case "time":
            return timeV(validation, validated?.[key]);
        case "gt":
            return gtV(
                validation,
                validated?.[key],
                validated?.[validation.field as keyof Keys],
            );
    }
}

export function validateSchema<Keys>(
    schema: Schema<Keys>,
    validated: Keys | undefined | null,
): Result<void, ValidationErr> {
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
    return err(new ValidationErr(obj));
}
