import { assertEquals, assertRejects } from "std/testing/asserts.ts";
import { InvalidSessionError } from "@ps/domain/session/InvalidSessionError.ts";
import { ValidateUserSessionServiceStub } from "@ps/domain/userSession/service._stub.ts";
import { maybeSessionStub, sessionStub } from "@ps/domain/session/model._stub.ts";
import { SessionFromRequestServiceStub } from "../../sessionFromRequest/service._stub.ts";
import { httpRequestHeadersStub } from "../../request/model._stub.ts";
import { SessionMiddlewareImpl } from "./middleware.impl.ts";

Deno.test("SessionMiddlewareImpl", async () => {
    assertEquals(
        await new SessionMiddlewareImpl(
            new SessionFromRequestServiceStub(sessionStub),
            new ValidateUserSessionServiceStub(),
        ).handle(httpRequestHeadersStub),
        undefined,
    );
    await assertRejects(() =>
        new SessionMiddlewareImpl(
            new SessionFromRequestServiceStub(maybeSessionStub),
            new ValidateUserSessionServiceStub(),
        ).handle(httpRequestHeadersStub), InvalidSessionError);
});
