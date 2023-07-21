import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "../EventMock.ts";
import { CreateDateEventServiceMock } from "./CreateDateEventServiceMock.ts";

Deno.test("CreateDateEventServiceMock", async () => {
    assertEquals(
        await new CreateDateEventServiceMock(
            eventMock,
        ).create(),
        eventMock,
    );
});
