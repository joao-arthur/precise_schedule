import type { ValidatorProvider } from "@ps/domain/validation/validator/provider.ts";
import type { Validation } from "@ps/domain/validation/model.ts";

import { boolValidation } from "../validations/bool/boolValidation.ts";
import { dtValidation } from "../validations/dt/dtValidation.ts";
import { dtMinValidation } from "../validations/dtMin/dtMinValidation.ts";
import { emailValidation } from "../validations/email/emailValidation.ts";
import { enumValidation } from "../validations/enum/enumValidation.ts";
import { strValidation } from "../validations/str/strValidation.ts";
import { strMaxLenValidation } from "../validations/strMaxLen/strMaxLenValidation.ts";
import { strMinLenValidation } from "../validations/strMinLen/strMinLenValidation.ts";
import { strMinNumValidation } from "../validations/strMinNum/strMinNumValidation.ts";
import { strMinLowerValidation } from "../validations/strMinLower/strMinLowerValidation.ts";
import { strMinUpperValidation } from "../validations/strMinUpper/strMinUpperValidation.ts";
import { strMinSpecialValidation } from "../validations/strMinSpecial/strMinSpecialValidation.ts";
import { timeValidation } from "../validations/time/timeValidation.ts";

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
