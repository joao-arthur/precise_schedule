import { assertEquals } from "std/testing/asserts.ts";
import { IsEnumError } from "./IsEnumError.ts";

Deno.test("IsEnumError", () => {
    assertEquals(
        new IsEnumError("a", [1, 2, 3]).message,
        `"a" must be one of: (1, 2, 3)`,
    );
    assertEquals(
        new IsEnumError("b", ["a", "b", "c"]).message,
        `"b" must be one of: (a, b, c)`,
    );
    assertEquals(
        new IsEnumError("c", [true, false]).message,
        `"c" must be one of: (true, false)`,
    );
});
