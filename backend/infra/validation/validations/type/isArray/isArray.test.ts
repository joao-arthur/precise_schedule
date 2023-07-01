import { assertEquals } from "std/testing/asserts.ts";
import { isArray } from "./isArray.ts";
import { IsArrayError } from "./IsArrayError.ts";

Deno.test("isArray", () => {
    assertEquals(isArray("val", []), undefined);

    assertEquals(isArray("a", 1), new IsArrayError("a"));
    assertEquals(isArray("b", ""), new IsArrayError("b"));
    assertEquals(isArray("c", true), new IsArrayError("c"));
    assertEquals(isArray("d", new Date()), new IsArrayError("d"));
});
