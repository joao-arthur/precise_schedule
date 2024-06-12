import { assertEquals } from "@std/assert/assert-equals";
import { sessionStub } from "../../../session/model._stub.ts";
import { UserLoginServiceStub } from "./service._stub.ts";
import { ok } from "../../../lang/result.ts";

Deno.test("UserLoginServiceStub", async () => {
    assertEquals(
        await new UserLoginServiceStub(sessionStub).userLogin(),
        ok(sessionStub),
    );
});
