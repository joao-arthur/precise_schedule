import { assertEquals } from "std/testing/asserts.ts";
import { strMinNumValidation } from "./strMinNumValidation.ts";
import { StrMinNumValidationError } from "./StrMinNumValidationError.ts";

const v = { type: "strMinNum", min: 1 } as const;

Deno.test("strMinNumValidation valid", () => {
    assertEquals(strMinNumValidation(v, "9"), undefined);
    assertEquals(strMinNumValidation(v, "we are number 1"), undefined);
    assertEquals(strMinNumValidation(v, "12 monkeys"), undefined);
});

Deno.test("strMinNumValidation invalid min", () => {
    assertEquals(strMinNumValidation(v, ""), new StrMinNumValidationError(v.min));
    assertEquals(strMinNumValidation(v, "lorem ipsum"), new StrMinNumValidationError(v.min));
});

Deno.test("strMinNumValidation null", () => {
    assertEquals(strMinNumValidation(v, undefined), new StrMinNumValidationError(v.min));
    assertEquals(strMinNumValidation(v, null), new StrMinNumValidationError(v.min));
});

Deno.test("strMinNumValidation invalid", () => {
    assertEquals(strMinNumValidation(v, 1), new StrMinNumValidationError(v.min));
    assertEquals(strMinNumValidation(v, true), new StrMinNumValidationError(v.min));
    assertEquals(strMinNumValidation(v, []), new StrMinNumValidationError(v.min));
    assertEquals(strMinNumValidation(v, {}), new StrMinNumValidationError(v.min));
    assertEquals(strMinNumValidation(v, new Date()), new StrMinNumValidationError(v.min));
});
