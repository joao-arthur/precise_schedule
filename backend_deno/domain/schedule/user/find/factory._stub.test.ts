import { assertEquals } from "@std/assert/assert-equals";
import { UserFindFactoryStub } from "./factory._stub.ts";
import { userFindModelStub } from "./model._stub.ts";

Deno.test("UserFindFactoryStub", () => {
    assertEquals(
        new UserFindFactoryStub(userFindModelStub).build(),
        userFindModelStub,
    );
});
