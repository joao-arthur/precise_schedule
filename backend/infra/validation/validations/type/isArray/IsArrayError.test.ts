import { assertEquals } from "std/testing/asserts.ts";
import { IsArrayError } from "./IsArrayError.ts";

Deno.test("IsArrayError", () => {
    assertEquals(
        new IsArrayError("val").message,
        `"val" must be a array`,
    );
});
