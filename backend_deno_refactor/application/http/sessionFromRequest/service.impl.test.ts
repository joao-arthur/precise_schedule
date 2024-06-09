import { assertEquals } from "std/testing/asserts.ts";
import { SessionFromRequestServiceImpl } from "./service.impl.ts";

Deno.test("SessionFromRequestServiceImpl", () => {
    assertEquals(
        new SessionFromRequestServiceImpl().create({ headers: { authorization: undefined } }),
        { token: undefined },
    );
    assertEquals(
        new SessionFromRequestServiceImpl().create({ headers: { authorization: "Bearer 123" } }),
        { token: "123" },
    );
});
