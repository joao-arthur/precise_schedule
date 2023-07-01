import { assertEquals } from "std/testing/asserts.ts";
import { isNumber } from "./isNumber.ts";
import { IsNumberError } from "./IsNumberError.ts";

Deno.test("isNumber", () => {
    assertEquals(isNumber("val", 1), undefined);

    assertEquals(isNumber("a", ""), new IsNumberError("a"));
    assertEquals(isNumber("b", true), new IsNumberError("b"));
    assertEquals(isNumber("c", []), new IsNumberError("c"));
    assertEquals(isNumber("d", new Date()), new IsNumberError("d"));
});
