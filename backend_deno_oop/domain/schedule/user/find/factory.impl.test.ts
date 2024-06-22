import { assertEquals } from "@std/assert/assert-equals";
import { UserFindFactoryImpl } from "./factory.impl.ts";
import { userStub } from "../model._stub.ts";

Deno.test("UserFindFactoryImpl", () => {
    assertEquals(
        new UserFindFactoryImpl().build(userStub),
        {
            firstName: userStub.firstName,
            birthdate: userStub.birthdate,
            email: userStub.email,
            username: userStub.username,
        },
    );
});
