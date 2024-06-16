import { assertEquals } from "@std/assert/assert-equals";
import { sessionStub } from "../../../session/model.stub.ts";
import { userLoginModelStub } from "./model.stub.ts";
import { ok } from "../../../lang/result.ts";
import { userLogin } from "./service.ts";

Deno.test("userLogin", async () => {
    assertEquals(
        await userLogin(
            new SessionCreateServiceStub(sessionStub),
            userLoginModelStub,
        ),
        ok(sessionStub),
    );
});
