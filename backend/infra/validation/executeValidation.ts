import type { Validation } from "@ps/domain/validation/Validation.ts";

import { boolValidation } from "./validations/boolValidation/boolValidation.ts";
import { dtValidation } from "./validations/dtValidation/dtValidation.ts";
import { dtMinValidation } from "./validations/dtMinValidation/dtMinValidation.ts";
import { emailValidation } from "./validations/emailValidation/emailValidation.ts";
import { enumValidation } from "./validations/enumValidation/enumValidation.ts";
import { strValidation } from "./validations/strValidation/strValidation.ts";
import { strMaxLenValidation } from "./validations/strMaxLenValidation/strMaxLenValidation.ts";
import { strMinLenValidation } from "./validations/strMinLenValidation/strMinLenValidation.ts";
import { strMinNumValidation } from "./validations/strMinNumValidation/strMinNumValidation.ts";
import { strMinLowerValidation } from "./validations/strMinLowerValidation/strMinLowerValidation.ts";
import { strMinUpperValidation } from "./validations/strMinUpperValidation/strMinUpperValidation.ts";
import { strMinSpecialValidation } from "./validations/strMinSpecialValidation/strMinSpecialValidation.ts";
import { timeValidation } from "./validations/timeValidation/timeValidation.ts";

export function executeValidation(val: Validation, value: unknown): Error | undefined {
    switch (val.v) {
        case "bool":
            return boolValidation(val, value);
        case "dt":
            return dtValidation(val, value);
        case "dtMin":
            return dtMinValidation(val, value);
        case "email":
            return emailValidation(val, value);
        case "enum":
            return enumValidation(val, value);
        case "str":
            return strValidation(val, value);
        case "strMaxLen":
            return strMaxLenValidation(val, value);
        case "strMinLen":
            return strMinLenValidation(val, value);
        case "strMinNum":
            return strMinNumValidation(val, value);
        case "strMinLower":
            return strMinLowerValidation(val, value);
        case "strMinUpper":
            return strMinUpperValidation(val, value);
        case "strMinSpecial":
            return strMinSpecialValidation(val, value);
        case "time":
            return timeValidation(val, value);
    }
}
