import { assertEquals } from "std/testing/asserts.ts";
import { isString } from "./isString.ts";
import { IsStringError } from "./IsStringError.ts";

Deno.test("isString", () => {
    assertEquals(isString("val", ""), undefined);

    assertEquals(isString("a", 1), new IsStringError("a"));
    assertEquals(isString("b", true), new IsStringError("b"));
    assertEquals(isString("c", []), new IsStringError("c"));
    assertEquals(isString("d", new Date()), new IsStringError("d"));
});
