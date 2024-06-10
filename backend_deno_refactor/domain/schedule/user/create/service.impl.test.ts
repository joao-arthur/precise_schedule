import { assertEquals } from "@std/assert/assert-equals";
import { sessionStub } from "../../../session/model._stub.ts";
import { ValidatorStub } from "../../../validation/validator/service._stub.ts";
import { SessionCreateServiceStub } from "../../../session/create/service._stub.ts";
import { userStub } from "../model._stub.ts";
import { UserUniqueInfoServiceStub } from "../uniqueInfo/service._stub.ts";
import { userCreateModelStub } from "./model._stub.ts";
import { UserCreateServiceImpl } from "./service.impl.ts";
import { UserCreateFactoryStub } from "./factory._stub.ts";
import { UserCreateRepositoryStub } from "./repository._stub.ts";
import { buildOk } from "../../../lang/result.ts";

Deno.test("UserCreateServiceImpl", async () => {
    assertEquals(
        await new UserCreateServiceImpl(
            new UserCreateRepositoryStub(),
            new UserUniqueInfoServiceStub(),
            new UserCreateFactoryStub(userStub),
            new SessionCreateServiceStub(sessionStub),
            new ValidatorStub(),
        ).create(userCreateModelStub),
        buildOk(sessionStub),
    );
});
