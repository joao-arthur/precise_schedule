import { assertEquals } from "@std/assert/assert-equals";
import { sessionStub } from "../../session/model.stub.ts";
import { sessionCreateStubBuild } from "../../session/create/service.stub.ts";
import { ok } from "../../lang/result.ts";
import { userLoginStub, userStub } from "./model.stub.ts";
import { userRepoStubBuild } from "./repo.stub.ts";
import { userLogin } from "./login.ts";

Deno.test("userLogin", async () => {
    assertEquals(
        await userLogin(
            userRepoStubBuild(userStub, 0, 0),
            sessionCreateStubBuild(sessionStub),
            userLoginStub,
        ),
        ok(sessionStub),
    );
});
