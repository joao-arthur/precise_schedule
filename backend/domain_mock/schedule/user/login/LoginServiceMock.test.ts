import { assertEquals } from "std/testing/asserts.ts";
import { userMock } from "../UserMock.ts";
import { LoginServiceMock } from "./LoginServiceMock.ts";

Deno.test("LoginServiceMock", async () => {
    assertEquals(
        await new LoginServiceMock(userMock).login(),
        userMock,
    );
});
