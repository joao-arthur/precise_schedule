import { assertEquals } from "std/testing/asserts.ts";
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
