import { assertEquals } from "@std/assert/assert-equals";
import { sessionStub } from "../../session/model.stub.ts";
import { sessionCreateStubBuild } from "../../session/create.stub.ts";
import { ok } from "../../lang/result.ts";
import { userLoginStub } from "./model.stub.ts";
import { userRepoUserStubBuild } from "./repo.stub.ts";
import { userLogin } from "./login.ts";

Deno.test("userLogin", async () => {
    assertEquals(
        await userLogin(
            userRepoUserStubBuild(),
            sessionCreateStubBuild(sessionStub),
            userLoginStub,
        ),
        ok(sessionStub),
    );
});
