import type { ValidatorProvider } from "@ps/domain/validation/validator/provider.ts";
import type { Validation } from "@ps/domain/validation/model.ts";

import { boolValidation } from "../validations/boolValidation/boolValidation.ts";
import { dtValidation } from "../validations/dtValidation/dtValidation.ts";
import { dtMinValidation } from "../validations/dtMinValidation/dtMinValidation.ts";
import { emailValidation } from "../validations/emailValidation/emailValidation.ts";
import { enumValidation } from "../validations/enumValidation/enumValidation.ts";
import { strValidation } from "../validations/strValidation/strValidation.ts";
import { strMaxLenValidation } from "../validations/strMaxLenValidation/strMaxLenValidation.ts";
import { strMinLenValidation } from "../validations/strMinLenValidation/strMinLenValidation.ts";
import { strMinNumValidation } from "../validations/strMinNumValidation/strMinNumValidation.ts";
import { strMinLowerValidation } from "../validations/strMinLowerValidation/strMinLowerValidation.ts";
import { strMinUpperValidation } from "../validations/strMinUpperValidation/strMinUpperValidation.ts";
import { strMinSpecialValidation } from "../validations/strMinSpecialValidation/strMinSpecialValidation.ts";
import { timeValidation } from "../validations/timeValidation/timeValidation.ts";

export class ValidatorProviderImpl implements ValidatorProvider {
    public execute(validation: Validation, value: unknown): Error | undefined {
        switch (validation.type) {
            case "bool":
                return boolValidation(validation, value);
            case "dt":
                return dtValidation(validation, value);
            case "dtMin":
                return dtMinValidation(validation, value);
            case "email":
                return emailValidation(validation, value);
            case "enum":
                return enumValidation(validation, value);
            case "str":
                return strValidation(validation, value);
            case "strMaxLen":
                return strMaxLenValidation(validation, value);
            case "strMinLen":
                return strMinLenValidation(validation, value);
            case "strMinNum":
                return strMinNumValidation(validation, value);
            case "strMinLower":
                return strMinLowerValidation(validation, value);
            case "strMinUpper":
                return strMinUpperValidation(validation, value);
            case "strMinSpecial":
                return strMinSpecialValidation(validation, value);
            case "time":
                return timeValidation(validation, value);
        }
    }
}
