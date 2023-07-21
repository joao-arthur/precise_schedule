import { assertEquals } from "std/testing/asserts.ts";
import { userMock } from "../UserMock.ts";
import { CreateUserFactoryMock } from "./CreateUserFactoryMock.ts";

Deno.test("CreateUserFactoryMock", () => {
    assertEquals(
        new CreateUserFactoryMock(userMock).build(),
        userMock,
    );
});
