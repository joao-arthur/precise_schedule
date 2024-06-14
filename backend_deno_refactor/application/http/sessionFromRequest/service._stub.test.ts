import { assertEquals } from "@std/assert/assert-equals";
import { maybeSessionStub, sessionStub } from "@ps/domain/session/model._stub.ts";

Deno.test("SessionFromRequestServiceStub", () => {
    assertEquals(
        new SessionFromRequestServiceStub(sessionStub).create(),
        sessionStub,
    );
    assertEquals(
        new SessionFromRequestServiceStub(maybeSessionStub).create(),
        maybeSessionStub,
    );
});
