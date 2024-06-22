import type { BoolV } from "./validations.ts";
import type { DtV } from "./validations.ts";
import type { DtMinV } from "./validations.ts";
import type { EmailV } from "./validations.ts";
import type { EnumV } from "./validations.ts";
import type { StrV } from "./validations.ts";
import type { StrMaxLenV } from "./validations.ts";
import type { StrMinLenV } from "./validations.ts";
import type { StrMinNumV } from "./validations.ts";
import type { StrMinLowerV } from "./validations.ts";
import type { StrMinUpperV } from "./validations.ts";
import type { StrMinSpecialV } from "./validations.ts";
import type { TimeV } from "./validations.ts";
import type { GTV } from "./validations.ts";

export type Validation =
    | BoolV
    | DtV
    | DtMinV
    | EmailV
    | EnumV
    | StrV
    | StrMaxLenV
    | StrMinLenV
    | StrMinNumV
    | StrMinLowerV
    | StrMinUpperV
    | StrMinSpecialV
    | TimeV
    | GTV;

export type Schema<Keys> = {
    readonly [key in keyof Keys]: readonly Validation[];
};
