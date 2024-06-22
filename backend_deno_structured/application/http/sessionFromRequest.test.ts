import { assertEquals } from "@std/assert/assert-equals";
import { sessionFromRequest } from "./sessionFromRequest.ts";
import { requestEmpty, requestHeaders } from "./request.stub.ts";

Deno.test("sessionFromRequest", () => {
    assertEquals(sessionFromRequest(requestEmpty), { token: undefined });
    assertEquals(sessionFromRequest(requestHeaders), { token: "123" });
});
