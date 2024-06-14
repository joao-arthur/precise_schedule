import { assertEquals } from "@std/assert/assert-equals";
import { ValidatorStub } from "../../../validation/validator/service._stub.ts";
import { sessionStub } from "../../../session/model._stub.ts";
import { userLoginModelStub } from "./model._stub.ts";
import { ok } from "../../../lang/result.ts";
import { userLogin } from "./service.ts";

Deno.test("userLogin", async () => {
    assertEquals(
        await userLogin(
            new ValidatorStub(),
            new SessionCreateServiceStub(sessionStub),
            userLoginModelStub,
        ),
        ok(sessionStub),
    );
});
