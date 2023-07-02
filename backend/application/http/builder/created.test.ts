import { assertEquals } from "std/testing/asserts.ts";
import { created } from "./created.ts";

Deno.test("created", () => {
    assertEquals(
        created(),
        {
            status: 201,
            body: undefined,
        },
    );
});
