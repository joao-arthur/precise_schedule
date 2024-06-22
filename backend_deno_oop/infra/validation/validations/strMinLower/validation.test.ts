import { assertEquals } from "@std/assert/assert-equals";
import { strMinLowerValidation } from "./validation.ts";
import { StrMinLowerValidationError } from "./error.ts";

const v = { type: "strMinLower", min: 1 } as const;

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
