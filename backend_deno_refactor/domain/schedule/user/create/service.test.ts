import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { IdGeneratorStub } from "../../../generator/id/service._stub.ts";
import { sessionStub } from "../../../session/model._stub.ts";
import { ValidatorStub } from "../../../validation/validator/service._stub.ts";
import { userCreateModelStub } from "./model._stub.ts";
import { UserCreateRepositoryStub } from "./repo._stub.ts";
import { userCreate } from "./service.ts";

Deno.test("userCreate", async () => {
    assertEquals(
        await userCreate(
            new UserCreateRepositoryStub(),
            new IdGeneratorStub("id"),
            new ValidatorStub(),
            userCreateModelStub,
        ),
        ok(sessionStub),
    );
});
