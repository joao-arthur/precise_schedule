import { assertEquals, assertRejects } from "std/testing/asserts.ts";
import { InvalidSessionError } from "@ps/domain/session/InvalidSessionError.ts";
import { ValidateUserSessionServiceMock } from "@ps/domain_mock/userSession/ValidateUserSessionServiceMock.ts";
import { maybeSessionMock, sessionMock } from "@ps/domain_mock/session/SessionMock.ts";
import { SessionFromRequestServiceMock } from "@ps/application_mock/http/session/SessionFromRequestServiceMock.ts";
import { httpRequestHeadersMock } from "@ps/application_mock/http/HTTPRequestMock.ts";
import { SessionMiddlewareImpl } from "./SessionMiddlewareImpl.ts";

Deno.test("SessionMiddlewareImpl", async () => {
    assertEquals(
        await new SessionMiddlewareImpl(
            new SessionFromRequestServiceMock(sessionMock),
            new ValidateUserSessionServiceMock(),
        ).handle(httpRequestHeadersMock),
        undefined,
    );
    await assertRejects(() =>
        new SessionMiddlewareImpl(
            new SessionFromRequestServiceMock(maybeSessionMock),
            new ValidateUserSessionServiceMock(),
        ).handle(httpRequestHeadersMock), InvalidSessionError);
});
