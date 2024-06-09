import { assertEquals } from "std/testing/asserts.ts";
import { UserFindFactoryStub } from "./factory._stub.ts";
import { userFindModelStub } from "./model._stub.ts";

Deno.test("UserFindFactoryStub", () => {
    assertEquals(
        new UserFindFactoryStub(userFindModelStub).build(),
        userFindModelStub,
    );
});
