import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../lang/result.ts";
import { sessionStubBuild } from "../session/service.stub.ts";
import { session } from "../session/service.stub.ts";
import { validateSession } from "./service.ts";
import { userRepoUserStubBuild } from "../schedule/user/repo.stub.ts";

Deno.test("validateSession", async () => {
    assertEquals(
        await validateSession(
            userRepoUserStubBuild(),
            sessionStubBuild(session, "user-id"),
            session,
        ),
        ok(undefined),
    );
});
