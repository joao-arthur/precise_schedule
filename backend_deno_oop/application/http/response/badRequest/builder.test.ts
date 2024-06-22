import { assertEquals } from "@std/assert/assert-equals";
import { badRequest } from "./builder.ts";

Deno.test("badRequest", () => {
    assertEquals(
        badRequest({ error: 1 }),
        {
            status: 400,
            body: { error: 1 },
            headers: undefined,
        },
    );
});
