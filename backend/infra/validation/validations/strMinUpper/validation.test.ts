import { assertEquals } from "std/testing/asserts.ts";
import { strMinUpperValidation } from "./validation.ts";
import { StrMinUpperValidationError } from "./error.ts";

const v = { type: "strMinUpper", min: 1 } as const;

Deno.test("strMinUpperValidation valid", () => {
    assertEquals(strMinUpperValidation(v, "Lorem ipsum"), undefined);
    assertEquals(strMinUpperValidation(v, "LOREM IPSUM"), undefined);
    assertEquals(strMinUpperValidation(v, "É"), undefined);
});

Deno.test("strMinUpperValidation invalid min", () => {
    assertEquals(strMinUpperValidation(v, ""), new StrMinUpperValidationError(v.min));
    assertEquals(
        strMinUpperValidation(v, "0123456789!@#$%¨&*()[]{}+-*<>,.;:'\"`~^?´"),
        new StrMinUpperValidationError(v.min),
    );
    assertEquals(strMinUpperValidation(v, "lorem ipsum"), new StrMinUpperValidationError(v.min));
});

Deno.test("strMinUpperValidation null", () => {
    assertEquals(strMinUpperValidation(v, undefined), new StrMinUpperValidationError(v.min));
    assertEquals(strMinUpperValidation(v, null), new StrMinUpperValidationError(v.min));
});

Deno.test("strMinUpperValidation invalid", () => {
    assertEquals(strMinUpperValidation(v, 1), new StrMinUpperValidationError(v.min));
    assertEquals(strMinUpperValidation(v, true), new StrMinUpperValidationError(v.min));
    assertEquals(strMinUpperValidation(v, []), new StrMinUpperValidationError(v.min));
    assertEquals(strMinUpperValidation(v, {}), new StrMinUpperValidationError(v.min));
    assertEquals(strMinUpperValidation(v, new Date()), new StrMinUpperValidationError(v.min));
});
