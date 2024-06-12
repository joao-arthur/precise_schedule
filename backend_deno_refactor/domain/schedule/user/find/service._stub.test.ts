import { assertEquals } from "@std/assert/assert-equals";
import { userStub } from "../model._stub.ts";
import { userFindModelStub } from "./model._stub.ts";
import { UserFindServiceStub } from "./service._stub.ts";
import { ok } from "../../../lang/result.ts";

Deno.test("UserFindServiceStub", async () => {
    assertEquals(
        await new UserFindServiceStub(userStub, userFindModelStub).findById(),
        ok(userStub),
    );
    assertEquals(
        await new UserFindServiceStub(userStub, userFindModelStub).findByCredentials(),
        ok(userStub),
    );
});
