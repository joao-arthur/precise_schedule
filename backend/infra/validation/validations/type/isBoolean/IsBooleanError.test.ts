import { assertEquals } from "std/testing/asserts.ts";
import { IsBooleanError } from "./IsBooleanError.ts";

Deno.test("IsBooleanError", () => {
    assertEquals(
        new IsBooleanError("val").message,
        `"val" must be a boolean`,
    );
});
