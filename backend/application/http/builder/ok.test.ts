import { assertEquals } from "std/testing/asserts.ts";
import { ok } from "./ok.ts";

Deno.test("ok", () => {
    assertEquals(
        ok({ id: 1 }),
        { status: 200, body: { id: 1 } },
    );
});
