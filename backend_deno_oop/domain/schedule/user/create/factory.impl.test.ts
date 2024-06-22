import { assertEquals } from "@std/assert/assert-equals";
import { IdGeneratorStub } from "../../../generator/id/service._stub.ts";
import { userCreateModelStub } from "./model._stub.ts";
import { UserCreateFactoryImpl } from "./factory.impl.ts";

Deno.test("UserCreateFactoryImpl", () => {
    assertEquals(
        new UserCreateFactoryImpl(new IdGeneratorStub("id")).build(userCreateModelStub),
        {
            id: "id",
            createdAt: new Date(),
            updatedAt: new Date(),
            ...userCreateModelStub,
        },
    );
});
