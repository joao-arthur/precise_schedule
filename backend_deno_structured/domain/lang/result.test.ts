import { assertEquals } from "@std/assert/assert-equals";
import { err, ok } from "./result.ts";

Deno.test("Result", () => {
    assertEquals(
        err(new Error("Lorem Ipsum")),
        { type: "err", error: new Error("Lorem Ipsum") },
    );
    assertEquals(
        ok("123"),
        { type: "ok", data: "123" },
    );
});
