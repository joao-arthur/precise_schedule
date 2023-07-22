import { assertEquals } from "std/testing/asserts.ts";
import { ValidatorStub } from "../../../validation/service._stub.ts";
import { userStub } from "../model._stub.ts";
import { sessionStub } from "../../../session/model._stub.ts";
import { SessionCreateServiceStub } from "../../../session/create/service._stub.ts";
import { UserFindServiceStub } from "../find/service._stub.ts";
import { userLoginModelStub } from "./model._stub.ts";
import { UserLoginServiceImpl } from "./service.impl.ts";

Deno.test("validateUniqueUsername", async () => {
    assertEquals(
        await new UserLoginServiceImpl(
            new ValidatorStub(),
            new UserFindServiceStub(userStub),
            new SessionCreateServiceStub(sessionStub),
        ).userLogin(userLoginModelStub),
        sessionStub,
    );
});
