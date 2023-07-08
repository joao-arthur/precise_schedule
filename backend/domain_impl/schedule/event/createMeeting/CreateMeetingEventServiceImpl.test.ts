import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { CreateEventServiceMock } from "@ps/domain_mock/schedule/event/create/CreateEventServiceMock.ts";
import { createMeetingEventMock } from "@ps/domain_mock/schedule/event/createMeeting/CreateMeetingEventMock.ts";
import { CreateMeetingEventFactoryMock } from "@ps/domain_mock/schedule/event/createMeeting/CreateMeetingEventFactoryMock.ts";
import { CreateMeetingEventServiceImpl } from "./CreateMeetingEventServiceImpl.ts";

Deno.test("CreateMeetingEventServiceImpl", async () => {
    assertEquals(
        await new CreateMeetingEventServiceImpl(
            new CreateMeetingEventFactoryMock(eventMock),
            new CreateEventServiceMock(eventMock),
        ).create(createMeetingEventMock),
        eventMock,
    );
});
