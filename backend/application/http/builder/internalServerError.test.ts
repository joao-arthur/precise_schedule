import { assertEquals } from "std/testing/asserts.ts";
import { internalServerError } from "./internalServerError.ts";

Deno.test("internalServerError", () => {
    assertEquals(internalServerError(), {
        body: { message: "An unexpected error occurred!" },
        status: 500,
    });
});
