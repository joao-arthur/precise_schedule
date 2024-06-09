import { assertEquals } from "std/assert/assert_equals.ts";
import { ok } from "./builder.ts";

Deno.test("ok", () => {
    assertEquals(
        ok({ id: 1 }),
        {
            status: 200,
            body: { id: 1 },
            headers: undefined,
        },
    );
});
