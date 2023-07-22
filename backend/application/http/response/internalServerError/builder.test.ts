import { assertEquals } from "std/testing/asserts.ts";
import { internalServerError } from "./builder.ts";

Deno.test("internalServerError", () => {
    assertEquals(internalServerError(), {
        status: 500,
        body: { message: "An unexpected error occurred!" },
        headers: undefined,
    });
});
