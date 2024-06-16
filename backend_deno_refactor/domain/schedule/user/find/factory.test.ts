import { assertEquals } from "@std/assert/assert-equals";
import { buildUserFind } from "./factory.ts";
import { userStub } from "../model.stub.ts";

Deno.test("buildUserFind", () => {
    assertEquals(
        buildUserFind(userStub),
        {
            firstName: userStub.firstName,
            birthdate: userStub.birthdate,
            email: userStub.email,
            username: userStub.username,
        },
    );
});
