import { assertEquals } from "std/testing/asserts.ts";
import { EnumValidationError } from "./EnumValidationError.ts";

Deno.test("EnumValidationError", () => {
    assertEquals(
        new EnumValidationError([1, 2, 3]).message,
        `"a" must be one of: (1, 2, 3)`,
    );
    assertEquals(
        new EnumValidationError(["a", "b", "c"]).message,
        `"b" must be one of: (a, b, c)`,
    );
    assertEquals(
        new EnumValidationError([true, false]).message,
        `"c" must be one of: (true, false)`,
    );
});
