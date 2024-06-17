import { assertEquals } from "@std/assert/assert-equals";
import { InvalidSessionError } from "../../domain/session/decode.ts";
import { err, ok } from "../../domain/lang/result.ts";
import { sessionMiddleware } from "./middleware.session.ts";
import {
    userRepoEmptyStubBuild,
    userRepoUserStubBuild,
} from "../../domain/schedule/user/repo.stub.ts";
import { decodeSessionStubBuild } from "../../domain/session/decode.stub.ts";
import { requestEmpty, requestHeaders } from "./request.stub.ts";

Deno.test("sessionMiddleware", async () => {
    assertEquals(
        await sessionMiddleware(
            userRepoUserStubBuild(),
            decodeSessionStubBuild("user-id"),
            requestEmpty,
        ),
        err(new InvalidSessionError()),
    );
    assertEquals(
        await sessionMiddleware(
            userRepoUserStubBuild(),
            decodeSessionStubBuild("user-id"),
            requestHeaders,
        ),
        ok(undefined),
    );
    assertEquals(
        await sessionMiddleware(
            userRepoEmptyStubBuild(),
            decodeSessionStubBuild("user-id"),
            requestHeaders,
        ),
        err(new InvalidSessionError()),
    );
});
