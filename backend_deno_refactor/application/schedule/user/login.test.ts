import { assertEquals } from "@std/assert/assert-equals";
import { sessionStub } from "../../../domain/session/model.stub.ts";
import { requestBuild } from "../../http/request.stub.ts";
import { ok } from "../../http/response.ts";
import { sessionCreateStubBuild } from "../../../domain/session/create.stub.ts";
import { userRepoUserStubBuild } from "../../../domain/schedule/user/repo.stub.ts";
import { userLoginStub } from "../../../domain/schedule/user/model.stub.ts";
import { userLoginController } from "./login.ts";

Deno.test("UserLoginControllerImpl", async () => {
    assertEquals(
        await userLoginController(
            userRepoUserStubBuild(),
            sessionCreateStubBuild(sessionStub),
            requestBuild(userLoginStub, {}),
        ),
        ok(sessionStub),
    );
});
