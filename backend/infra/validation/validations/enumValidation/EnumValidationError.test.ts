import { assertEquals } from "std/testing/asserts.ts";
import { EnumError } from "./EnumError.ts";

Deno.test("EnumError", () => {
    assertEquals(
        new EnumError([1, 2, 3]).message,
        `"a" must be one of: (1, 2, 3)`,
    );
    assertEquals(
        new EnumError(["a", "b", "c"]).message,
        `"b" must be one of: (a, b, c)`,
    );
    assertEquals(
        new EnumError([true, false]).message,
        `"c" must be one of: (true, false)`,
    );
});
