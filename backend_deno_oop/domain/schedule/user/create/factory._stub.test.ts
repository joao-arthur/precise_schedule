import { assertEquals } from "@std/assert/assert-equals";
import { userStub } from "../model._stub.ts";
import { UserCreateFactoryStub } from "./factory._stub.ts";

Deno.test("UserCreateFactoryStub", () => {
    assertEquals(
        new UserCreateFactoryStub(userStub).build(),
        userStub,
    );
});
