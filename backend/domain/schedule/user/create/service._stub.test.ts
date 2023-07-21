import { assertEquals } from "std/testing/asserts.ts";
import { sessionMock } from "../../../session/SessionMock.ts";
import { CreateUserServiceMock } from "./CreateUserServiceMock.ts";

Deno.test("CreateUserServiceMock", async () => {
    assertEquals(
        await new CreateUserServiceMock(sessionMock).create(),
        sessionMock,
    );
});
