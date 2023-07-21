import { assertEquals } from "std/testing/asserts.ts";
import { createEventModelMock } from "../create/CreateEventModelMock.ts";
import { CreateMeetingEventFactoryMock } from "./CreateMeetingEventFactoryMock.ts";

Deno.test("CreateMeetingEventFactoryMock", () => {
    assertEquals(
        new CreateMeetingEventFactoryMock(
            createEventModelMock,
        ).build(),
        createEventModelMock,
    );
});
