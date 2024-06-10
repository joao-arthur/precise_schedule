import { assertEquals } from "@std/assert/assert-equals";
import { userStub } from "../model._stub.ts";
import { UserUpdateServiceStub } from "./service._stub.ts";
import { buildOk } from "../../../lang/result.ts";

Deno.test("UserUpdateServiceStub", async () => {
    assertEquals(
        await new UserUpdateServiceStub(userStub).update(),
        buildOk(userStub),
    );
});
