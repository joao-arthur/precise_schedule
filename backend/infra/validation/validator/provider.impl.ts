import type { ValidatorProvider } from "@ps/domain/validation/validator/provider.ts";
import type { Validation } from "@ps/domain/validation/model.ts";

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
