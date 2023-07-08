import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "../EventMock.ts";
import { CreateMeetingEventServiceMock } from "./CreateMeetingEventServiceMock.ts";

Deno.test("CreateMeetingEventServiceMock", async () => {
    assertEquals(
        await new CreateMeetingEventServiceMock(
            eventMock,
        ).create(),
        eventMock,
    );
});
