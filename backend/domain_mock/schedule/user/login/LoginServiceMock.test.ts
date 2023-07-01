import { assertEquals } from "std/testing/asserts.ts";
import { userMock } from "../UserMock.ts";
import { LoginServiceMock } from "./LoginServiceMock.ts";

Deno.test("LoginServiceMock", () => {
    assertEquals(
        new LoginServiceMock(userMock).login(),
        userMock,
    );
});
