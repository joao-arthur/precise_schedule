import { assertEquals } from "std/testing/asserts.ts";
import { enumValidation } from "./enumValidation.ts";
import { EnumValidationError } from "./EnumValidationError.ts";

Deno.test("enumValidation valid", () => {
    assertEquals(enumValidation([1, 2, 3])(2), undefined);
    assertEquals(enumValidation(["a", "b", "c"])("a"), undefined);
});

Deno.test("enumValidation null", () => {
    assertEquals(enumValidation(["a"])(undefined), new EnumValidationError(["a"]));
    assertEquals(enumValidation(["a"])(null), new EnumValidationError(["a"]));
});

Deno.test("enumValidation invalid", () => {
    assertEquals(enumValidation([1, 2, 3])([]), new EnumValidationError([1, 2, 3]));
    assertEquals(enumValidation(["a", "b", "c"])([]), new EnumValidationError(["a", "b", "c"]));
    assertEquals(enumValidation([true, false])([]), new EnumValidationError([true, false]));
});
