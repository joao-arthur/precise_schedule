import { assertEquals } from "std/testing/asserts.ts";
import { badRequest } from "./badRequest.ts";

Deno.test("badRequest", () => {
    assertEquals(
        badRequest({ error: 1 }),
        { status: 400, body: { error: 1 } },
    );
});
