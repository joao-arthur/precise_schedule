import { assertEquals } from "std/testing/asserts.ts";
import { IsDateError } from "./IsDateError.ts";

Deno.test("IsDateError", () => {
    assertEquals(
        new IsDateError("val").message,
        `"val" must be a date`,
    );
});
