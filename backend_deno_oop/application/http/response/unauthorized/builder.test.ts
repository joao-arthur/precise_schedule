import { assertEquals } from "@std/assert/assert-equals";
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
