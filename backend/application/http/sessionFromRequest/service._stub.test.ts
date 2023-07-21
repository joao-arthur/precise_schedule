import { assertEquals } from "std/testing/asserts.ts";
import { maybeSessionMock, sessionMock } from "@ps/domain_mock/session/SessionMock.ts";
import { SessionFromRequestServiceMock } from "./SessionFromRequestServiceMock.ts";

Deno.test("SessionFromRequestServiceMock", () => {
    assertEquals(
        new SessionFromRequestServiceMock(sessionMock).create(),
        sessionMock,
    );
    assertEquals(
        new SessionFromRequestServiceMock(maybeSessionMock).create(),
        maybeSessionMock,
    );
});
