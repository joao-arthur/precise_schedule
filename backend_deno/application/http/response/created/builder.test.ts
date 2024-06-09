import { assertEquals } from "@std/assert/assert-equals";
import { created } from "./builder.ts";

Deno.test("created", () => {
    assertEquals(
        created({ id: "THE MOST MYSTERIOUS SONG" }),
        {
            status: 201,
            body: undefined,
            headers: { contentLocation: "THE MOST MYSTERIOUS SONG" },
        },
    );
});
