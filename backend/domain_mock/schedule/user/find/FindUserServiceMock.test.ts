import { assertEquals } from "std/testing/asserts.ts";
import { userMock } from "../UserMock.ts";
import { FindUserServiceMock } from "./FindUserServiceMock.ts";

Deno.test("FindUserServiceMock", () => {
    assertEquals(
        new FindUserServiceMock(userMock).findById(),
        userMock,
    );
    assertEquals(
        new FindUserServiceMock(userMock).findByCredentials(),
        userMock,
    );
});
