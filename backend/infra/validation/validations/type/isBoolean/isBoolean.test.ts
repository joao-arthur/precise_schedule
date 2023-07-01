import { assertEquals } from "std/testing/asserts.ts";
import { isBoolean } from "./isBoolean.ts";
import { IsBooleanError } from "./IsBooleanError.ts";

Deno.test("isBoolean", () => {
    assertEquals(isBoolean("val", true), undefined);

    assertEquals(isBoolean("a", 1), new IsBooleanError("a"));
    assertEquals(isBoolean("b", ""), new IsBooleanError("b"));
    assertEquals(isBoolean("c", []), new IsBooleanError("c"));
    assertEquals(isBoolean("d", new Date()), new IsBooleanError("d"));
});
