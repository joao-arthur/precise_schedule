import type {
    BoolV,
    DtMinV,
    DtV,
    EmailV,
    EnumV,
    GTV,
    StrMaxLenV,
    StrMinLenV,
    StrMinLowerV,
    StrMinNumV,
    StrMinSpecialV,
    StrMinUpperV,
    StrV,
    TimeV,
} from "./validations.ts";
import { assertEquals } from "@std/assert/assert-equals";
import {
    boolV,
    BoolVErr,
    dtMinV,
    DtMinVErr,
    dtV,
    DtVErr,
    emailV,
    EmailVErr,
    enumV,
    EnumVErr,
    gtV,
    GTVErr,
    strMaxLenV,
    StrMaxLenVErr,
    strMinLenV,
    StrMinLenVErr,
    strMinLowerV,
    StrMinLowerVErr,
    strMinNumV,
    StrMinNumVErr,
    strMinSpecialV,
    StrMinSpecialVErr,
    strMinUpperV,
    StrMinUpperVErr,
    strV,
    StrVErr,
    timeV,
    TimeVErr,
} from "./validations.ts";

const bool: BoolV = { type: "bool" };
const dt: DtV = { type: "dt" };
const dtMin: DtMinV = { type: "dtMin", min: "1970-01-01" };
const email: EmailV = { type: "email" };
const enumNum: EnumV = { type: "enum", values: [1, 2] };
const enumStr: EnumV = { type: "enum", values: ["a", "b"] };
const enumBool: EnumV = { type: "enum", values: [true, false] };
const str: StrV = { type: "str" };
const strMaxLen: StrMaxLenV = { type: "strMaxLen", max: 1 };
const strMinLen: StrMinLenV = { type: "strMinLen", min: 1 };
const strMinLower: StrMinLowerV = { type: "strMinLower", min: 1 };
const strMinUpper: StrMinUpperV = { type: "strMinUpper", min: 1 };
const strMinNum: StrMinNumV = { type: "strMinNum", min: 1 };
const strMinSpecial: StrMinSpecialV = { type: "strMinSpecial", min: 1 };
const time: TimeV = { type: "time" };
const gt: GTV = { type: "gt", field: "b" };

Deno.test("boolV valid", () => {
    assertEquals(boolV(bool, true), undefined);
    assertEquals(boolV(bool, false), undefined);
});

Deno.test("boolV invalid", () => {
    assertEquals(boolV(bool, undefined), new BoolVErr());
    assertEquals(boolV(bool, null), new BoolVErr());
    assertEquals(boolV(bool, 1), new BoolVErr());
    assertEquals(boolV(bool, ""), new BoolVErr());
    assertEquals(boolV(bool, []), new BoolVErr());
    assertEquals(boolV(bool, {}), new BoolVErr());
    assertEquals(boolV(bool, new Date()), new BoolVErr());
});

Deno.test("strV valid", () => {
    assertEquals(strV(str, ""), undefined);
    assertEquals(strV(str, "lorem"), undefined);
});

Deno.test("strV invalid", () => {
    assertEquals(strV(str, undefined), new StrVErr());
    assertEquals(strV(str, null), new StrVErr());
    assertEquals(strV(str, 1), new StrVErr());
    assertEquals(strV(str, true), new StrVErr());
    assertEquals(strV(str, []), new StrVErr());
    assertEquals(strV(str, {}), new StrVErr());
    assertEquals(strV(str, new Date()), new StrVErr());
});

Deno.test("dtV valid", () => {
    assertEquals(dtV(dt, "1917-11-07"), undefined);
    assertEquals(dtV(dt, "2023-08-22"), undefined);
});

Deno.test("dtV invalid", () => {
    assertEquals(dtV(dt, undefined), new DtVErr());
    assertEquals(dtV(dt, null), new DtVErr());
    assertEquals(dtV(dt, 1), new DtVErr());
    assertEquals(dtV(dt, ""), new DtVErr());
    assertEquals(dtV(dt, true), new DtVErr());
    assertEquals(dtV(dt, []), new DtVErr());
    assertEquals(dtV(dt, {}), new DtVErr());
    assertEquals(dtV(dt, new Date()), new DtVErr());
});

Deno.test("dtMinV valid", () => {
    assertEquals(dtMinV(dtMin, "1970-01-01"), undefined);
    assertEquals(dtMinV(dtMin, "2000-08-22"), undefined);
});

Deno.test("dtMinV invalid", () => {
    assertEquals(dtMinV(dtMin, undefined), new DtMinVErr(dtMin.min));
    assertEquals(dtMinV(dtMin, null), new DtMinVErr(dtMin.min));
    assertEquals(dtMinV(dtMin, "1969-12-31"), new DtMinVErr(dtMin.min));
    assertEquals(dtMinV(dtMin, 1), new DtMinVErr(dtMin.min));
    assertEquals(dtMinV(dtMin, ""), new DtMinVErr(dtMin.min));
    assertEquals(dtMinV(dtMin, []), new DtMinVErr(dtMin.min));
    assertEquals(dtMinV(dtMin, true), new DtMinVErr(dtMin.min));
    assertEquals(dtMinV(dtMin, new Date()), new DtMinVErr(dtMin.min));
});

Deno.test("emailV valid", () => {
    assertEquals(emailV(email, "a@b.c"), undefined);
    assertEquals(emailV(email, "example@example.com"), undefined);
    assertEquals(emailV(email, "john@gmail.com"), undefined);
});

Deno.test("emailV invalid", () => {
    assertEquals(emailV(email, undefined), new EmailVErr());
    assertEquals(emailV(email, null), new EmailVErr());
    assertEquals(emailV(email, "j.o@i"), new EmailVErr());
    assertEquals(emailV(email, 1), new EmailVErr());
    assertEquals(emailV(email, ""), new EmailVErr());
    assertEquals(emailV(email, []), new EmailVErr());
    assertEquals(emailV(email, true), new EmailVErr());
    assertEquals(emailV(email, new Date()), new EmailVErr());
});

Deno.test("enumV num valid", () => {
    assertEquals(enumV(enumNum, 2), undefined);
});

Deno.test("enumV num invalid", () => {
    assertEquals(enumV(enumNum, undefined), new EnumVErr([1, 2]));
    assertEquals(enumV(enumNum, null), new EnumVErr([1, 2]));
    assertEquals(enumV(enumNum, []), new EnumVErr([1, 2]));
});

Deno.test("enumV str valid", () => {
    assertEquals(enumV(enumStr, "a"), undefined);
});

Deno.test("enumV str invalid", () => {
    assertEquals(enumV(enumStr, undefined), new EnumVErr(["a", "b"]));
    assertEquals(enumV(enumStr, null), new EnumVErr(["a", "b"]));
    assertEquals(enumV(enumStr, []), new EnumVErr(["a", "b"]));
});

Deno.test("enumV bool valid", () => {
    assertEquals(enumV(enumBool, true), undefined);
});

Deno.test("enumV bool invalid", () => {
    assertEquals(enumV(enumBool, undefined), new EnumVErr([true, false]));
    assertEquals(enumV(enumBool, null), new EnumVErr([true, false]));
    assertEquals(enumV(enumBool, []), new EnumVErr([true, false]));
});

Deno.test("strMaxLenV valid", () => {
    assertEquals(strMaxLenV(strMaxLen, ""), undefined);
    assertEquals(strMaxLenV(strMaxLen, "L"), undefined);
});

Deno.test("strMaxLenV invalid", () => {
    assertEquals(strMaxLenV(strMaxLen, undefined), new StrMaxLenVErr(strMaxLen.max));
    assertEquals(strMaxLenV(strMaxLen, null), new StrMaxLenVErr(strMaxLen.max));
    assertEquals(strMaxLenV(strMaxLen, "lorem"), new StrMaxLenVErr(strMaxLen.max));
    assertEquals(strMaxLenV(strMaxLen, 1), new StrMaxLenVErr(strMaxLen.max));
    assertEquals(strMaxLenV(strMaxLen, true), new StrMaxLenVErr(strMaxLen.max));
    assertEquals(strMaxLenV(strMaxLen, []), new StrMaxLenVErr(strMaxLen.max));
    assertEquals(strMaxLenV(strMaxLen, {}), new StrMaxLenVErr(strMaxLen.max));
    assertEquals(strMaxLenV(strMaxLen, new Date()), new StrMaxLenVErr(strMaxLen.max));
});

Deno.test("strMinLenV valid", () => {
    assertEquals(strMinLenV(strMinLen, "é"), undefined);
    assertEquals(strMinLenV(strMinLen, "lorem"), undefined);
    assertEquals(strMinLenV(strMinLen, "IPSUM"), undefined);
});

Deno.test("strMinLenV invalid", () => {
    assertEquals(strMinLenV(strMinLen, undefined), new StrMinLenVErr(strMinLen.min));
    assertEquals(strMinLenV(strMinLen, null), new StrMinLenVErr(strMinLen.min));
    assertEquals(strMinLenV(strMinLen, ""), new StrMinLenVErr(strMinLen.min));
    assertEquals(strMinLenV(strMinLen, 1), new StrMinLenVErr(strMinLen.min));
    assertEquals(strMinLenV(strMinLen, true), new StrMinLenVErr(strMinLen.min));
    assertEquals(strMinLenV(strMinLen, []), new StrMinLenVErr(strMinLen.min));
    assertEquals(strMinLenV(strMinLen, {}), new StrMinLenVErr(strMinLen.min));
    assertEquals(strMinLenV(strMinLen, new Date()), new StrMinLenVErr(strMinLen.min));
});

Deno.test("strMinLowerV valid", () => {
    assertEquals(strMinLowerV(strMinLower, "LOREM IPSUm"), undefined);
    assertEquals(strMinLowerV(strMinLower, "lorem ipsum"), undefined);
    assertEquals(strMinLowerV(strMinLower, "é"), undefined);
});

Deno.test("strMinLowerV invalid", () => {
    assertEquals(strMinLowerV(strMinLower, undefined), new StrMinLowerVErr(strMinLower.min));
    assertEquals(strMinLowerV(strMinLower, null), new StrMinLowerVErr(strMinLower.min));
    assertEquals(strMinLowerV(strMinLower, ""), new StrMinLowerVErr(strMinLower.min));
    assertEquals(
        strMinLowerV(strMinLower, "0123456789!@#$%¨&*()[]{}+-*<>,.;:'\"`~^?´"),
        new StrMinLowerVErr(strMinLower.min),
    );
    assertEquals(strMinLowerV(strMinLower, "LOREM IPSUM"), new StrMinLowerVErr(strMinLower.min));
    assertEquals(strMinLowerV(strMinLower, 1), new StrMinLowerVErr(strMinLower.min));
    assertEquals(strMinLowerV(strMinLower, true), new StrMinLowerVErr(strMinLower.min));
    assertEquals(strMinLowerV(strMinLower, []), new StrMinLowerVErr(strMinLower.min));
    assertEquals(strMinLowerV(strMinLower, {}), new StrMinLowerVErr(strMinLower.min));
    assertEquals(strMinLowerV(strMinLower, new Date()), new StrMinLowerVErr(strMinLower.min));
});

Deno.test("strMinNumV valid", () => {
    assertEquals(strMinNumV(strMinNum, "9"), undefined);
    assertEquals(strMinNumV(strMinNum, "we are number 1"), undefined);
    assertEquals(strMinNumV(strMinNum, "12 monkeys"), undefined);
});

Deno.test("strMinNumV invalid", () => {
    assertEquals(strMinNumV(strMinNum, undefined), new StrMinNumVErr(strMinNum.min));
    assertEquals(strMinNumV(strMinNum, null), new StrMinNumVErr(strMinNum.min));
    assertEquals(strMinNumV(strMinNum, ""), new StrMinNumVErr(strMinNum.min));
    assertEquals(strMinNumV(strMinNum, "lorem ipsum"), new StrMinNumVErr(strMinNum.min));
    assertEquals(strMinNumV(strMinNum, 1), new StrMinNumVErr(strMinNum.min));
    assertEquals(strMinNumV(strMinNum, true), new StrMinNumVErr(strMinNum.min));
    assertEquals(strMinNumV(strMinNum, []), new StrMinNumVErr(strMinNum.min));
    assertEquals(strMinNumV(strMinNum, {}), new StrMinNumVErr(strMinNum.min));
    assertEquals(strMinNumV(strMinNum, new Date()), new StrMinNumVErr(strMinNum.min));
});

Deno.test("strMinSpecialV valid", () => {
    assertEquals(strMinSpecialV(strMinSpecial, "!"), undefined);
    assertEquals(strMinSpecialV(strMinSpecial, "I l@ve it!"), undefined);
    assertEquals(strMinSpecialV(strMinSpecial, "nevermore!"), undefined);
    assertEquals(strMinSpecialV({ type: "strMinSpecial", min: 14 }, "!@#$%¨&*()[]{}"), undefined);
});

Deno.test("strMinSpecialV invalid", () => {
    assertEquals(
        strMinSpecialV(strMinSpecial, undefined),
        new StrMinSpecialVErr(strMinSpecial.min),
    );
    assertEquals(strMinSpecialV(strMinSpecial, null), new StrMinSpecialVErr(strMinSpecial.min));
    assertEquals(strMinSpecialV(strMinSpecial, ""), new StrMinSpecialVErr(strMinSpecial.min));
    assertEquals(
        strMinSpecialV(strMinSpecial, "lorem ipsum"),
        new StrMinSpecialVErr(strMinSpecial.min),
    );

    assertEquals(strMinSpecialV(strMinSpecial, 1), new StrMinSpecialVErr(strMinSpecial.min));
    assertEquals(strMinSpecialV(strMinSpecial, true), new StrMinSpecialVErr(strMinSpecial.min));
    assertEquals(strMinSpecialV(strMinSpecial, []), new StrMinSpecialVErr(strMinSpecial.min));
    assertEquals(strMinSpecialV(strMinSpecial, {}), new StrMinSpecialVErr(strMinSpecial.min));
    assertEquals(
        strMinSpecialV(strMinSpecial, new Date()),
        new StrMinSpecialVErr(strMinSpecial.min),
    );
});

Deno.test("strMinUpperV valid", () => {
    assertEquals(strMinUpperV(strMinUpper, "Lorem ipsum"), undefined);
    assertEquals(strMinUpperV(strMinUpper, "LOREM IPSUM"), undefined);
    assertEquals(strMinUpperV(strMinUpper, "É"), undefined);
});

Deno.test("strMinUpperV invalid", () => {
    assertEquals(strMinUpperV(strMinUpper, undefined), new StrMinUpperVErr(strMinUpper.min));
    assertEquals(strMinUpperV(strMinUpper, null), new StrMinUpperVErr(strMinUpper.min));
    assertEquals(strMinUpperV(strMinUpper, ""), new StrMinUpperVErr(strMinUpper.min));
    assertEquals(
        strMinUpperV(strMinUpper, "0123456789!@#$%¨&*()[]{}+-*<>,.;:'\"`~^?´"),
        new StrMinUpperVErr(strMinUpper.min),
    );
    assertEquals(strMinUpperV(strMinUpper, "lorem ipsum"), new StrMinUpperVErr(strMinUpper.min));
    assertEquals(strMinUpperV(strMinUpper, 1), new StrMinUpperVErr(strMinUpper.min));
    assertEquals(strMinUpperV(strMinUpper, true), new StrMinUpperVErr(strMinUpper.min));
    assertEquals(strMinUpperV(strMinUpper, []), new StrMinUpperVErr(strMinUpper.min));
    assertEquals(strMinUpperV(strMinUpper, {}), new StrMinUpperVErr(strMinUpper.min));
    assertEquals(strMinUpperV(strMinUpper, new Date()), new StrMinUpperVErr(strMinUpper.min));
});

Deno.test("timeV valid", () => {
    assertEquals(timeV(time, "10:00"), undefined);
    assertEquals(timeV(time, "23:59"), undefined);
});

Deno.test("timeV invalid", () => {
    assertEquals(timeV(time, undefined), new TimeVErr());
    assertEquals(timeV(time, null), new TimeVErr());
    assertEquals(timeV(time, 1), new TimeVErr());
    assertEquals(timeV(time, ""), new TimeVErr());
    assertEquals(timeV(time, true), new TimeVErr());
    assertEquals(timeV(time, []), new TimeVErr());
    assertEquals(timeV(time, {}), new TimeVErr());
    assertEquals(timeV(time, new Date()), new TimeVErr());
});

Deno.test("gtV valid", () => {
    assertEquals(gtV(gt, "2023-08-22", "1917-11-07"), undefined);
    assertEquals(gtV(gt, "22:10", "08:00"), undefined);
});

Deno.test("gtV invalid", () => {
    assertEquals(gtV(gt, undefined, undefined), new GTVErr(gt.field));
    assertEquals(gtV(gt, null, undefined), new GTVErr(gt.field));
    assertEquals(gtV(gt, undefined, null), new GTVErr(gt.field));
    assertEquals(gtV(gt, null, null), new GTVErr(gt.field));
    assertEquals(gtV(gt, "1917-11-07", "2023-08-22"), new GTVErr(gt.field));
    assertEquals(gtV(gt, "08:00", "22:10"), new GTVErr(gt.field));
});
