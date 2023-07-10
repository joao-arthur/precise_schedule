import { assertEquals } from "std/testing/asserts.ts";
import { SessionFromRequestServiceImpl } from "./SessionFromRequestServiceImpl.ts";

Deno.test("SessionFromRequestServiceImpl", () => {
    assertEquals(
        new SessionFromRequestServiceImpl().create({ headers: { Authorization: undefined } }),
        { token: undefined },
    );
    assertEquals(
        new SessionFromRequestServiceImpl().create({ headers: { Authorization: "Bearer 123" } }),
        { token: "123" },
    );
});
