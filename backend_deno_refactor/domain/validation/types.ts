import type { BoolVal } from "./validations/bool.ts";
import type { DtVal } from "./validations/dt.ts";
import type { DtMinVal } from "./validations/dtMin.ts";
import type { EmailVal } from "./validations/email.ts";
import type { EnumVal } from "./validations/enum.ts";
import type { StrVal } from "./validations/str.ts";
import type { StrMaxLenVal } from "./validations/strMaxLen.ts";
import type { StrMinLenVal } from "./validations/strMinLen.ts";
import type { StrMinNumVal } from "./validations/strMinNum.ts";
import type { StrMinLowerVal } from "./validations/strMinLower.ts";
import type { StrMinUpperVal } from "./validations/strMinUpper.ts";
import type { StrMinSpecialVal } from "./validations/strMinSpecial.ts";
import type { TimeVal } from "./validations/time.ts";
import type { CompareBiggerVal } from "./validations/compareBigger.ts";

export type Validation =
    | BoolVal
    | DtVal
    | DtMinVal
    | EmailVal
    | EnumVal
    | StrVal
    | StrMaxLenVal
    | StrMinLenVal
    | StrMinNumVal
    | StrMinLowerVal
    | StrMinUpperVal
    | StrMinSpecialVal
    | TimeVal
    | CompareBiggerVal;

export type Schema<Keys> = {
    readonly [key in keyof Keys]: readonly Validation[];
};
