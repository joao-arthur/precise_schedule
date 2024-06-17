import { assertEquals } from "@std/assert/assert-equals";
import { sessionStub } from "../../session/model.stub.ts";
import { sessionCreateStubBuild } from "../../session/create.stub.ts";
import { ok } from "../../lang/result.ts";
import { userLoginStub } from "./model.stub.ts";
import { userRepoUserStubBuild } from "./repo.stub.ts";
import { userLoginService } from "./login.ts";

Deno.test("userLoginService", async () => {
    assertEquals(
        await userLoginService(
            userRepoUserStubBuild(),
            sessionCreateStubBuild(sessionStub),
            userLoginStub,
        ),
        ok(sessionStub),
    );
});
