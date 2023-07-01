import { assertEquals } from "std/testing/asserts.ts";
import { IsNumberError } from "./IsNumberError.ts";

Deno.test("IsNumberError", () => {
    assertEquals(
        new IsNumberError("val").message,
        `"val" must be a number`,
    );
});
