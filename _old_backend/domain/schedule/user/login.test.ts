import { assertEquals } from "@std/assert/assert-equals";
import { session } from "../../session/service.stub.ts";
import { sessionStubBuild } from "../../session/service.stub.ts";
import { ok } from "../../lang/result.ts";
import { userLoginStub } from "./model.stub.ts";
import { userRepoUserStubBuild } from "./repo.stub.ts";
import { userLoginService } from "./login.ts";

Deno.test("userLoginService", async () => {
    assertEquals(
        await userLoginService(
            userRepoUserStubBuild(),
            sessionStubBuild(session, "user-id"),
            userLoginStub,
        ),
        ok(session),
    );
});
