import { assertEquals } from "std/testing/asserts.ts";
import { RequiredError } from "./RequiredError.ts";

Deno.test("RequiredError", () => {
    assertEquals(
        new RequiredError("val").message,
        `"val" is required`,
    );
});
