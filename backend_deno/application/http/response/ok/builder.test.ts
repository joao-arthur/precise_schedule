import { assertEquals } from "std/testing/asserts.ts";
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
