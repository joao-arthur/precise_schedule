export type BoolV = { readonly type: "bool" };

export class BoolVErr extends Error {
    constructor() {
        super("must be a boolean");
    }
}

export function boolV(_: BoolV, value: unknown): BoolVErr | undefined {
    if (typeof value !== "boolean") {
        return new BoolVErr();
    }
}

export type StrV = { readonly type: "str" };

export class StrVErr extends Error {
    constructor() {
        super("must be a string");
    }
}

export function strV(_: StrV, value: unknown): StrVErr | undefined {
    if (typeof value !== "string") {
        return new StrVErr();
    }
    return undefined;
}

export type DtV = { readonly type: "dt" };

export class DtVErr extends Error {
    constructor() {
        super("must be a date in the format YYYY-MM-DD");
    }
}

export function dtV(_: DtV, value: unknown): DtVErr | undefined {
    if (new Date(`${value}T00:00:00.000Z`).toString() === "Invalid Date") {
        return new DtVErr();
    }
    return undefined;
}

export type DtMinV = { readonly type: "dtMin"; readonly min: string };

export class DtMinVErr extends Error {
    constructor(min: string) {
        super(`must be greater than ${min}`);
    }
}

export function dtMinV(val: DtMinV, value: unknown): DtMinVErr | undefined {
    if (new Date(`${value}T00:00:00.000Z`).toString() === "Invalid Date") {
        return new DtMinVErr(val.min);
    }
    if (new Date(`${val.min}T00:00:00.000Z`) > new Date(`${value}T00:00:00.000Z`)) {
        return new DtMinVErr(val.min);
    }
    return undefined;
}

export type EmailV = { readonly type: "email" };

export class EmailVErr extends Error {
    constructor() {
        super("must be a email");
    }
}

export function emailV(_: EmailV, value: unknown): EmailVErr | undefined {
    if (typeof value !== "string") {
        return new EmailVErr();
    }
    if (
        value.length < 5 || (!value.includes("@")) ||
        (!value.slice(value.indexOf("@")).includes("."))
    ) {
        return new EmailVErr();
    }
    return undefined;
}

export type EnumV = { readonly type: "enum"; readonly values: readonly unknown[] };

export class EnumVErr extends Error {
    constructor(values: readonly unknown[]) {
        super(`must be one of: (${values.join(", ")})`);
    }
}

export function enumV(val: EnumV, value: unknown): EnumVErr | undefined {
    if (!val.values.includes(value)) {
        return new EnumVErr(val.values);
    }
    return undefined;
}

export type StrMaxLenV = { readonly type: "strMaxLen"; readonly max: number };

export class StrMaxLenVErr extends Error {
    constructor(max: number) {
        super(`at maximum ${max} ${max > 1 ? "characters" : "character"}`);
    }
}

export function strMaxLenV(
    val: StrMaxLenV,
    value: unknown,
): StrMaxLenVErr | undefined {
    if (typeof value !== "string" || value.length > val.max) {
        return new StrMaxLenVErr(val.max);
    }
    return undefined;
}

export type StrMinLenV = { readonly type: "strMinLen"; readonly min: number };

export class StrMinLenVErr extends Error {
    constructor(min: number) {
        super(`at least ${min} ${min > 1 ? "characters" : "character"}`);
    }
}

export function strMinLenV(
    val: StrMinLenV,
    value: unknown,
): StrMinLenVErr | undefined {
    if (typeof value !== "string" || value.length < val.min) {
        return new StrMinLenVErr(val.min);
    }
    return undefined;
}

export type StrMinLowerV = { readonly type: "strMinLower"; readonly min: number };

export class StrMinLowerVErr extends Error {
    constructor(min: number) {
        super(`at least ${min} lowercase letter`);
    }
}

export function strMinLowerV(
    val: StrMinLowerV,
    value: unknown,
): StrMinLowerVErr | undefined {
    if (typeof value !== "string") {
        return new StrMinLowerVErr(val.min);
    }
    const lowerLen = value
        .replaceAll(
            /0|1|2|3|4|5|6|7|8|9| |\!|\@|\#|\$|\%|\¨|\&|\*|\(|\)|\[|\]|\{|\}|\+|\-|\*|\<|\>|\,|\.|\;|\:|\'|\"|\`|\~|\^|\?|\´/g,
            "",
        )
        .split("")
        .reduce((acc, c) => acc + Number(c.toLocaleLowerCase() === c), 0);
    if (val.min > lowerLen) {
        return new StrMinLowerVErr(val.min);
    }
    return undefined;
}

export type StrMinNumV = { readonly type: "strMinNum"; readonly min: number };

export class StrMinNumVErr extends Error {
    constructor(min: number) {
        super(`at least ${min} number`);
    }
}

export function strMinNumV(
    val: StrMinNumV,
    value: unknown,
): StrMinNumVErr | undefined {
    if (typeof value !== "string") {
        return new StrMinNumVErr(val.min);
    }
    const numLen = value.replaceAll(/[^\d]/g, "").length;
    if (val.min > numLen) {
        return new StrMinNumVErr(val.min);
    }
    return undefined;
}

export type StrMinSpecialV = { readonly type: "strMinSpecial"; readonly min: number };

export class StrMinSpecialVErr extends Error {
    constructor(min: number) {
        super(`at least ${min} special character`);
    }
}

export function strMinSpecialV(
    val: StrMinSpecialV,
    value: unknown,
): StrMinSpecialVErr | undefined {
    if (typeof value !== "string") {
        return new StrMinSpecialVErr(val.min);
    }
    const numLen = value.replaceAll(
        /[^(!|@|#|$|%|¨|&|*|(|\)|[|\]|{|})]/g,
        "",
    ).length;
    if (val.min > numLen) {
        return new StrMinSpecialVErr(val.min);
    }
    return undefined;
}

export type StrMinUpperV = { readonly type: "strMinUpper"; readonly min: number };

export class StrMinUpperVErr extends Error {
    constructor(min: number) {
        super(`at least ${min} uppercase letter`);
    }
}

export function strMinUpperV(
    val: StrMinUpperV,
    value: unknown,
): StrMinUpperVErr | undefined {
    if (typeof value !== "string") {
        return new StrMinUpperVErr(val.min);
    }
    const upperLen = value
        .replaceAll(
            /0|1|2|3|4|5|6|7|8|9| |\!|\@|\#|\$|\%|\¨|\&|\*|\(|\)|\[|\]|\{|\}|\+|\-|\*|\<|\>|\,|\.|\;|\:|\'|\"|\`|\~|\^|\?|\´/g,
            "",
        )
        .split("")
        .reduce((acc, c) => acc + Number(c.toLocaleUpperCase() === c), 0);
    if (val.min > upperLen) {
        return new StrMinUpperVErr(val.min);
    }
    return undefined;
}

export type TimeV = { readonly type: "time" };

export class TimeVErr extends Error {
    constructor() {
        super("must be a time in the format HH:mm");
    }
}

export function timeV(_: TimeV, value: unknown): TimeVErr | undefined {
    if (new Date(`1917-11-07T${value}:00.000Z`).toString() === "Invalid Date") {
        return new TimeVErr();
    }
    return undefined;
}

export type GTV = { readonly type: "gt"; readonly field: string };

export class GTVErr extends Error {
    constructor(fieldToCompare: string) {
        super(`must be bigger than '${fieldToCompare}'`);
    }
}

export function gtV(val: GTV, a: unknown, b: unknown): GTVErr | undefined {
    if (!a) return new GTVErr(val.field);
    if (!b) return new GTVErr(val.field);
    if (b >= a) {
        return new GTVErr(val.field);
    }
    return undefined;
}
