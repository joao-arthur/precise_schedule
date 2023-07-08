import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { UpdateEventServiceMock } from "@ps/domain_mock/schedule/event/update/UpdateEventServiceMock.ts";
import { updateMeetingEventMock } from "@ps/domain_mock/schedule/event/updateMeeting/UpdateMeetingEventMock.ts";
import { UpdateMeetingEventFactoryMock } from "@ps/domain_mock/schedule/event/updateMeeting/UpdateMeetingEventFactoryMock.ts";
import { UpdateMeetingEventServiceImpl } from "./UpdateMeetingEventServiceImpl.ts";

Deno.test("UpdateMeetingEventServiceImpl", async () => {
    assertEquals(
        await new UpdateMeetingEventServiceImpl(
            new UpdateMeetingEventFactoryMock(eventMock),
            new UpdateEventServiceMock(eventMock),
        ).update(eventMock.id, updateMeetingEventMock),
        eventMock,
    );
});
