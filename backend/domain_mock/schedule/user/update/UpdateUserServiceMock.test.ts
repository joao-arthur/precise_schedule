import { assertEquals } from "std/testing/asserts.ts";
import { userMock } from "../UserMock.ts";
import { UpdateUserServiceMock } from "./UpdateUserServiceMock.ts";

Deno.test("UpdateUserServiceMock", async () => {
    assertEquals(
        await new UpdateUserServiceMock(userMock).update(),
        userMock,
    );
});
