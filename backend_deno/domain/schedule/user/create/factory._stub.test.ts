import { assertEquals } from "std/testing/asserts.ts";
import { userStub } from "../model._stub.ts";
import { UserCreateFactoryStub } from "./factory._stub.ts";

Deno.test("UserCreateFactoryStub", () => {
    assertEquals(
        new UserCreateFactoryStub(userStub).build(),
        userStub,
    );
});
