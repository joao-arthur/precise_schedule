import { assertEquals } from "std/testing/asserts.ts";
import { strValidation } from "./strValidation.ts";
import { StrValidationError } from "./StrValidationError.ts";

Deno.test("strValidation valid", () => {
    assertEquals(strValidation(""), undefined);
    assertEquals(strValidation("lorem"), undefined);
});

Deno.test("strValidation null", () => {
    assertEquals(strValidation(undefined), new StrValidationError());
    assertEquals(strValidation(null), new StrValidationError());
});

Deno.test("strValidation invalid", () => {
    assertEquals(strValidation(1), new StrValidationError());
    assertEquals(strValidation([]), new StrValidationError());
    assertEquals(strValidation(true), new StrValidationError());
    assertEquals(strValidation(new Date()), new StrValidationError());
});
