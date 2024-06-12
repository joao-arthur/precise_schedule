import { assertEquals } from "@std/assert/assert-equals";
import { userCreateModelStub } from "./model._stub.ts";
import { buildUser } from "./factory.ts";

Deno.test("UserCreateFactoryImpl", () => {
    assertEquals(
        buildUser(userCreateModelStub, "id"),
        {
            id: "id",
            createdAt: new Date(),
            updatedAt: new Date(),
            ...userCreateModelStub,
        },
    );
});
