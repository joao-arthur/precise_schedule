import { assertEquals } from "std/testing/asserts.ts";
import { sessionMock } from "../../../session/SessionMock.ts";
import { LoginServiceMock } from "./LoginServiceMock.ts";

Deno.test("LoginServiceMock", async () => {
    assertEquals(
        await new LoginServiceMock(sessionMock).login(),
        sessionMock,
    );
});
