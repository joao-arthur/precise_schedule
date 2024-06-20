import { assertEquals } from "@std/assert/assert-equals";
import { SessionDecodeError } from "../../domain/session/service.ts";
import { err, ok } from "../../domain/lang/result.ts";
import { sessionMiddleware } from "./sessionMiddleware.ts";
import {
    userRepoEmptyStubBuild,
    userRepoUserStubBuild,
} from "../../domain/schedule/user/repo.stub.ts";
import { session, sessionStubBuild } from "../../domain/session/service.stub.ts";
import { requestEmpty, requestHeaders } from "./request.stub.ts";

Deno.test("sessionMiddleware", async () => {
    assertEquals(
        await sessionMiddleware(
            userRepoUserStubBuild(),
            sessionStubBuild(session, "user-id"),
            requestEmpty,
        ),
        err(new SessionDecodeError()),
    );
    assertEquals(
        await sessionMiddleware(
            userRepoUserStubBuild(),
            sessionStubBuild(session, "user-id"),
            requestHeaders,
        ),
        ok(undefined),
    );
    assertEquals(
        await sessionMiddleware(
            userRepoEmptyStubBuild(),
            sessionStubBuild(session, "user-id"),
            requestHeaders,
        ),
        err(new SessionDecodeError()),
    );
});
