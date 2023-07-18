import { assertEquals } from "std/testing/asserts.ts";
import { boolValidation } from "./boolValidation.ts";
import { BoolValidationError } from "./BoolValidationError.ts";

Deno.test("boolValidation valid", () => {
    assertEquals(boolValidation(true), undefined);
    assertEquals(boolValidation(false), undefined);
});

Deno.test("boolValidation null", () => {
    assertEquals(boolValidation(undefined), new BoolValidationError());
    assertEquals(boolValidation(null), new BoolValidationError());
});

Deno.test("boolValidation invalid", () => {
    assertEquals(boolValidation(1), new BoolValidationError());
    assertEquals(boolValidation(""), new BoolValidationError());
    assertEquals(boolValidation([]), new BoolValidationError());
    assertEquals(boolValidation(new Date()), new BoolValidationError());
});
