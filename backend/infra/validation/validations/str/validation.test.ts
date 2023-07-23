import { assertEquals } from "std/testing/asserts.ts";
import { strValidation } from "./validation.ts";
import { StrValidationError } from "./error.ts";

const v = { type: "str" } as const;

Deno.test("strValidation valid", () => {
    assertEquals(strValidation(v, ""), undefined);
    assertEquals(strValidation(v, "lorem"), undefined);
});

Deno.test("strValidation null", () => {
    assertEquals(strValidation(v, undefined), new StrValidationError());
    assertEquals(strValidation(v, null), new StrValidationError());
});

Deno.test("strValidation invalid", () => {
    assertEquals(strValidation(v, 1), new StrValidationError());
    assertEquals(strValidation(v, true), new StrValidationError());
    assertEquals(strValidation(v, []), new StrValidationError());
    assertEquals(strValidation(v, {}), new StrValidationError());
    assertEquals(strValidation(v, new Date()), new StrValidationError());
});
