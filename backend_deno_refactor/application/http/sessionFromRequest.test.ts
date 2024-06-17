import { assertEquals } from "@std/assert/assert-equals";
import { sessionFromRequest } from "./sessionFromRequest.ts";

Deno.test("sessionFromRequest", () => {
    assertEquals(
        sessionFromRequest({ headers: { authorization: undefined } }),
        { token: undefined },
    );
    assertEquals(
        sessionFromRequest({ headers: { authorization: "Bearer 123" } }),
        { token: "123" },
    );
});
