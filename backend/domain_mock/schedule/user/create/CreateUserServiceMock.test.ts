import { assertEquals } from "std/testing/asserts.ts";
import { userMock } from "../UserMock.ts";
import { CreateUserServiceMock } from "./CreateUserServiceMock.ts";

Deno.test("CreateUserServiceMock", async () => {
    assertEquals(
        await new CreateUserServiceMock(userMock).create(),
        userMock,
    );
});
