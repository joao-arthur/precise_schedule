import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../lang/result.ts";
import { userStub } from "../schedule/user/model.stub.ts";
import { decodeSessionStubBuild } from "../session/decode.stub.ts";
import { sessionStub } from "../session/model.stub.ts";
import { validateSession } from "./service.ts";
import { userRepoStubBuild } from "../schedule/user/repo.stub.ts";

Deno.test("validateSession", async () => {
    assertEquals(
        await validateSession(
            userRepoStubBuild(userStub, 0, 0),
            decodeSessionStubBuild(userStub.id),
            sessionStub,
        ),
        ok(undefined),
    );
});
