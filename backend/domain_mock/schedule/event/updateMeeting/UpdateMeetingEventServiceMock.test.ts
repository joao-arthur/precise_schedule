import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "../EventMock.ts";
import { UpdateMeetingEventServiceMock } from "./UpdateMeetingEventServiceMock.ts";

Deno.test("UpdateMeetingEventServiceMock", async () => {
    assertEquals(
        await new UpdateMeetingEventServiceMock(
            eventMock,
        ).update(),
        eventMock,
    );
});
