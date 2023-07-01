import { assertEquals } from "std/testing/asserts.ts";
import { userMock } from "../UserMock.ts";
import { CreateUserServiceMock } from "./CreateUserServiceMock.ts";

Deno.test("CreateUserServiceMock", () => {
    assertEquals(
        new CreateUserServiceMock(userMock).create(),
        userMock,
    );
});
