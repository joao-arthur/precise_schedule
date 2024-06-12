import { assertEquals } from "@std/assert/assert-equals";
import { userStub } from "../model._stub.ts";
import { ValidatorStub } from "../../../validation/validator/service._stub.ts";
import { UserUniqueInfoServiceStub } from "../uniqueInfo/service._stub.ts";
import { userFindModelStub } from "../find/model._stub.ts";
import { UserFindServiceStub } from "../find/service._stub.ts";
import { userUpdateModelStub } from "./model._stub.ts";
import { UserUpdateFactoryStub } from "./factory._stub.ts";
import { UserUpdateRepositoryStub } from "./repository._stub.ts";
import { UserUpdateServiceImpl } from "./service.impl.ts";
import { ok } from "../../../lang/result.ts";

Deno.test("UserUpdateServiceImpl", async () => {
    assertEquals(
        await new UserUpdateServiceImpl(
            new UserUpdateRepositoryStub(),
            new UserUniqueInfoServiceStub(),
            new UserUpdateFactoryStub(userStub),
            new ValidatorStub(),
            new UserFindServiceStub(userStub, userFindModelStub),
        ).update(userStub.id, userUpdateModelStub),
        ok(userStub),
    );
});
