import { assertEquals } from "std/testing/asserts.ts";
import { CreateSessionServiceMock } from "./CreateSessionServiceMock.ts";
import { sessionMock } from "../SessionMock.ts";

Deno.test("CreateSessionServiceMock", async () => {
    const createSessionServiceMock = new CreateSessionServiceMock(
        sessionMock,
    );
    assertEquals(
        await createSessionServiceMock.create(),
        sessionMock,
    );
});
