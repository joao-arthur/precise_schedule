import { assertEquals } from "std/testing/asserts.ts";
import { isDate } from "./isDate.ts";
import { IsDateError } from "./IsDateError.ts";

Deno.test("isDate", () => {
    assertEquals(isDate("val", new Date()), undefined);

    assertEquals(isDate("a", 1), new IsDateError("a"));
    assertEquals(isDate("b", ""), new IsDateError("b"));
    assertEquals(isDate("c", true), new IsDateError("c"));
    assertEquals(isDate("d", []), new IsDateError("d"));
});
