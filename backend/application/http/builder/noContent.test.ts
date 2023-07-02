import { assertEquals } from "std/testing/asserts.ts";
import { noContent } from "./noContent.ts";

Deno.test("noContent", () => {
    assertEquals(
        noContent(),
        {
            status: 204,
            body: undefined,
        },
    );
});
