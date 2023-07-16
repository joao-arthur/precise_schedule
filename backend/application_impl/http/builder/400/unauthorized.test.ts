import { assertEquals } from "std/testing/asserts.ts";
import { unauthorized } from "./unauthorized.ts";

Deno.test("unauthorized", () => {
    assertEquals(
        unauthorized(),
        {
            status: 401,
            body: undefined,
            headers: undefined,
        },
    );
});
