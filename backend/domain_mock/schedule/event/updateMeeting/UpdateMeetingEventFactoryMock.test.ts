import { assertEquals } from "std/testing/asserts.ts";
import { updateEventModelMock } from "../update/UpdateEventModelMock.ts";
import { UpdateMeetingEventFactoryMock } from "./UpdateMeetingEventFactoryMock.ts";

Deno.test("UpdateMeetingEventFactoryMock", () => {
    assertEquals(
        new UpdateMeetingEventFactoryMock(
            updateEventModelMock,
        ).build(),
        updateEventModelMock,
    );
});
