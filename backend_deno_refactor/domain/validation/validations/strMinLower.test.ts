import type {StrMinLowerVal} from './strMinLower.ts';
import { assertEquals } from "@std/assert/assert-equals";
import {StrMinLowerValidationError, strMinLowerValidation} from './strMinLower.ts';

const v: StrMinLowerVal = { type: "strMinLower", min: 1 };

Deno.test("strMinLowerValidation valid", () => {
    assertEquals(strMinLowerValidation(v, "LOREM IPSUm"), undefined);
    assertEquals(strMinLowerValidation(v, "lorem ipsum"), undefined);
    assertEquals(strMinLowerValidation(v, "é"), undefined);
});

Deno.test("strMinLowerValidation invalid min", () => {
    assertEquals(strMinLowerValidation(v, ""), new StrMinLowerValidationError(v.min));
    assertEquals(
        strMinLowerValidation(v, "0123456789!@#$%¨&*()[]{}+-*<>,.;:'\"`~^?´"),
        new StrMinLowerValidationError(v.min),
    );
    assertEquals(strMinLowerValidation(v, "LOREM IPSUM"), new StrMinLowerValidationError(v.min));
});

Deno.test("strMinLowerValidation null", () => {
    assertEquals(strMinLowerValidation(v, undefined), new StrMinLowerValidationError(v.min));
    assertEquals(strMinLowerValidation(v, null), new StrMinLowerValidationError(v.min));
});

Deno.test("strMinLowerValidation invalid", () => {
    assertEquals(strMinLowerValidation(v, 1), new StrMinLowerValidationError(v.min));
    assertEquals(strMinLowerValidation(v, true), new StrMinLowerValidationError(v.min));
    assertEquals(strMinLowerValidation(v, []), new StrMinLowerValidationError(v.min));
    assertEquals(strMinLowerValidation(v, {}), new StrMinLowerValidationError(v.min));
    assertEquals(strMinLowerValidation(v, new Date()), new StrMinLowerValidationError(v.min));
});