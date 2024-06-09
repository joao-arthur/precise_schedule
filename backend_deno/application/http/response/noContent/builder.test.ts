import { assertEquals } from "std/assert/assert_equals.ts";
import { noContent } from "./builder.ts";

Deno.test("noContent", () => {
    assertEquals(
        noContent(),
        {
            status: 204,
            body: undefined,
            headers: undefined,
        },
    );
});
