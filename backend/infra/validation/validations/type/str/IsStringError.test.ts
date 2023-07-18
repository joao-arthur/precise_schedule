import { assertEquals } from "std/testing/asserts.ts";
import { IsStringError } from "./IsStringError.ts";

Deno.test("IsStringError", () => {
    assertEquals(
        new IsStringError("val").message,
        `"val" must be a string`,
    );
});
