import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "../EventMock.ts";
import { UpdateEventServiceMock } from "./UpdateEventServiceMock.ts";

Deno.test("UpdateEventServiceMock", async () => {
    assertEquals(
        await new UpdateEventServiceMock(eventMock).update(),
        eventMock,
    );
});
