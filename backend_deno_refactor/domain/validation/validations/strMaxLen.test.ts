import type { StrMaxLenVal } from "./strMaxLen.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { strMaxLenValidation, StrMaxLenValidationError } from "./strMaxLen.ts";

const v: StrMaxLenVal = { type: "strMaxLen", max: 1 };

Deno.test("strMaxLenValidation valid", () => {
    assertEquals(strMaxLenValidation(v, ""), undefined);
    assertEquals(strMaxLenValidation(v, "L"), undefined);
});

Deno.test("strMaxLenValidation invalid min", () => {
    assertEquals(strMaxLenValidation(v, "lorem"), new StrMaxLenValidationError(v.max));
});

Deno.test("strMaxLenValidation null", () => {
    assertEquals(strMaxLenValidation(v, undefined), new StrMaxLenValidationError(v.max));
    assertEquals(strMaxLenValidation(v, null), new StrMaxLenValidationError(v.max));
});

Deno.test("strMaxLenValidation invalid", () => {
    assertEquals(strMaxLenValidation(v, 1), new StrMaxLenValidationError(v.max));
    assertEquals(strMaxLenValidation(v, true), new StrMaxLenValidationError(v.max));
    assertEquals(strMaxLenValidation(v, []), new StrMaxLenValidationError(v.max));
    assertEquals(strMaxLenValidation(v, {}), new StrMaxLenValidationError(v.max));
    assertEquals(strMaxLenValidation(v, new Date()), new StrMaxLenValidationError(v.max));
});
