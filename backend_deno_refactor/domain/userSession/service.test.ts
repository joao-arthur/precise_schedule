import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../lang/result.ts";
import { decodeSessionStubBuild } from "../session/decode.stub.ts";
import { sessionStub } from "../session/model.stub.ts";
import { validateSession } from "./service.ts";
import { userRepoUserStubBuild } from "../schedule/user/repo.stub.ts";

Deno.test("validateSession", async () => {
    assertEquals(
        await validateSession(
            userRepoUserStubBuild(),
            decodeSessionStubBuild("user-id"),
            sessionStub,
        ),
        ok(undefined),
    );
});
