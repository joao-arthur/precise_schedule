import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "../EventMock.ts";
import { UpdateEventServiceMock } from "./UpdateEventServiceMock.ts";

Deno.test("UpdateEventServiceMock", () => {
    assertEquals(
        new UpdateEventServiceMock(eventMock).update(),
        eventMock,
    );
});
