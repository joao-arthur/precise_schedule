import { assertEquals } from "std/testing/asserts.ts";
import { strMinLenValidation } from "./strMinLenValidation.ts";
import { StrMinLenValidationError } from "./StrMinLenValidationError.ts";

const v = { v: "strMinLen", min: 1 } as const;

Deno.test("strMinLenValidation valid", () => {
    assertEquals(strMinLenValidation(v, "é"), undefined);
    assertEquals(strMinLenValidation(v, "lorem"), undefined);
    assertEquals(strMinLenValidation(v, "IPSUM"), undefined);
});

Deno.test("strMinLenValidation invalid min", () => {
    assertEquals(strMinLenValidation(v, ""), new StrMinLenValidationError(v.min));
});

Deno.test("strMinLenValidation null", () => {
    assertEquals(strMinLenValidation(v, undefined), new StrMinLenValidationError(v.min));
    assertEquals(strMinLenValidation(v, null), new StrMinLenValidationError(v.min));
});

Deno.test("strMinLenValidation invalid", () => {
    assertEquals(strMinLenValidation(v, 1), new StrMinLenValidationError(v.min));
    assertEquals(strMinLenValidation(v, true), new StrMinLenValidationError(v.min));
    assertEquals(strMinLenValidation(v, []), new StrMinLenValidationError(v.min));
    assertEquals(strMinLenValidation(v, {}), new StrMinLenValidationError(v.min));
    assertEquals(strMinLenValidation(v, new Date()), new StrMinLenValidationError(v.min));
});
