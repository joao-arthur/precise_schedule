import { assertEquals } from "std/testing/asserts.ts";
import { createMeetingEventMock } from "@ps/domain_mock/schedule/event/createMeeting/CreateMeetingEventMock.ts";
import { CreateMeetingEventFactoryImpl } from "./CreateMeetingEventFactoryImpl.ts";

Deno.test("CreateMeetingEventFactoryImpl", () => {
    assertEquals(
        new CreateMeetingEventFactoryImpl().build(
            createMeetingEventMock,
        ),
        {
            category: "MEETING",
            ...createMeetingEventMock,
        },
    );
});
