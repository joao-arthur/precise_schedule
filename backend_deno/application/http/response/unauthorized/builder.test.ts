import { assertEquals } from "std/assert/assert_equals.ts";
import { unauthorized } from "./builder.ts";

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
