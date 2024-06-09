import { assertEquals } from "std/testing/asserts.ts";
import { userStub } from "../model._stub.ts";
import { UserUpdateFactoryStub } from "./factory._stub.ts";

Deno.test("UserUpdateFactoryStub", () => {
    assertEquals(
        new UserUpdateFactoryStub(userStub).build(),
        userStub,
    );
});
