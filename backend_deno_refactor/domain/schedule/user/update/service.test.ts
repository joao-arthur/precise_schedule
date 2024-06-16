import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { ValidatorStub } from "../../../validation/validator/service._stub.ts";
import { userStub } from "../model._stub.ts";
import { userUpdateModelStub } from "./model._stub.ts";
import { UserUpdateRepositoryStub } from "./repo._stub.ts";
import { userUpdate } from "./service.ts";

Deno.test("userUpdate", async () => {
    assertEquals(
        await new userUpdate(
            new UserUpdateRepositoryStub(),
            new ValidatorStub(),
            userStub.id,
            userUpdateModelStub,
        ),
        ok(userStub),
    );
});
