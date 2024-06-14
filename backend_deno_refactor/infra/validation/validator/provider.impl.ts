import type { ValidatorProvider } from "../../../domain/validation/validator/provider.ts";
import type { Validation } from "../../../domain/validation/model.ts";
import { boolValidation } from "../validations/bool/validation.ts";
import { dtValidation } from "../validations/dt/validation.ts";
import { dtMinValidation } from "../validations/dtMin/validation.ts";
import { emailValidation } from "../validations/email/validation.ts";
import { enumValidation } from "../validations/enum/validation.ts";
import { strValidation } from "../validations/str/validation.ts";
import { strMaxLenValidation } from "../validations/strMaxLen/validation.ts";
import { strMinLenValidation } from "../validations/strMinLen/validation.ts";
import { strMinNumValidation } from "../validations/strMinNum/validation.ts";
import { strMinLowerValidation } from "../validations/strMinLower/validation.ts";
import { strMinUpperValidation } from "../validations/strMinUpper/validation.ts";
import { strMinSpecialValidation } from "../validations/strMinSpecial/validation.ts";
import { timeValidation } from "../validations/time/validation.ts";
import { compareBiggerValidation } from "../validations/compareBigger/validation.ts";

export class ValidatorProviderImpl implements ValidatorProvider {
    public execute<Keys>(
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
}
