import { assertEquals } from "@std/assert/assert-equals";
import { InvalidSessionError } from "@ps/domain/session/invalid/error.ts";
import { ValidateUserSessionServiceStub } from "@ps/domain/userSession/service._stub.ts";
import { maybeSessionStub, sessionStub } from "@ps/domain/session/model._stub.ts";
import { SessionFromRequestServiceStub } from "../../sessionFromRequest/service._stub.ts";
import { buildErr, buildOk } from "../../../../domain/lang/result.ts";
import { httpRequestHeadersStub } from "../../request/model._stub.ts";
import { SessionMiddlewareImpl } from "./middleware.impl.ts";

Deno.test("SessionMiddlewareImpl", async () => {
    assertEquals(
        await new SessionMiddlewareImpl(
            new SessionFromRequestServiceStub(sessionStub),
            new ValidateUserSessionServiceStub(),
        ).handle(httpRequestHeadersStub),
        buildOk(undefined),
    );
    assertEquals(
        await new SessionMiddlewareImpl(
            new SessionFromRequestServiceStub(maybeSessionStub),
            new ValidateUserSessionServiceStub(),
        ).handle(httpRequestHeadersStub),
        buildErr(new InvalidSessionError()),
    );
});
