import { assertEquals } from "std/testing/asserts.ts";
import { IdGeneratorStub } from "../../../generation/idGenerator/service._stub.ts";
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
