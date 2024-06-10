import { assertEquals } from "@std/assert/assert-equals";
import { sessionStub } from "../../../session/model._stub.ts";
import { UserLoginServiceStub } from "./service._stub.ts";
import { buildOk } from "../../../lang/result.ts";

Deno.test("UserLoginServiceStub", async () => {
    assertEquals(
        await new UserLoginServiceStub(sessionStub).userLogin(),
        buildOk(sessionStub),
    );
});
