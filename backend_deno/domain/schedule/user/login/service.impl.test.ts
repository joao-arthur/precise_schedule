import { assertEquals } from "@std/assert/assert-equals";
import { ValidatorStub } from "../../../validation/validator/service._stub.ts";
import { userStub } from "../model._stub.ts";
import { sessionStub } from "../../../session/model._stub.ts";
import { SessionCreateServiceStub } from "../../../session/create/service._stub.ts";
import { userFindModelStub } from "../find/model._stub.ts";
import { UserFindServiceStub } from "../find/service._stub.ts";
import { userLoginModelStub } from "./model._stub.ts";
import { UserLoginServiceImpl } from "./service.impl.ts";

Deno.test("validateUniqueUsername", async () => {
    assertEquals(
        await new UserLoginServiceImpl(
            new ValidatorStub(),
            new UserFindServiceStub(userStub, userFindModelStub),
            new SessionCreateServiceStub(sessionStub),
        ).userLogin(userLoginModelStub),
        sessionStub,
    );
});
