import { assertEquals } from "@std/assert/assert-equals";
import { userStub } from "../model._stub.ts";
import { userUpdateModelStub } from "./model._stub.ts";
import { buildUser } from "./factory.ts";

Deno.test("buildUser", () => {
    assertEquals(
        buildUser(userUpdateModelStub, userStub),
        {
            id: userStub.id,
            createdAt: userStub.createdAt,
            updatedAt: new Date(),
            ...userUpdateModelStub,
        },
    );
});
