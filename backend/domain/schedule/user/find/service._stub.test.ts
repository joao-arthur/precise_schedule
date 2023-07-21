import { assertEquals } from "std/testing/asserts.ts";
import { userMock } from "../UserMock.ts";
import { FindUserServiceMock } from "./FindUserServiceMock.ts";

Deno.test("FindUserServiceMock", async () => {
    assertEquals(
        await new FindUserServiceMock(userMock).findById(),
        userMock,
    );
    assertEquals(
        await new FindUserServiceMock(userMock).findByCredentials(),
        userMock,
    );
});
