import { assertEquals } from "std/testing/asserts.ts";
import { updateMeetingEventMock } from "@ps/domain_mock/schedule/event/updateMeeting/UpdateMeetingEventMock.ts";
import { UpdateMeetingEventFactoryImpl } from "./UpdateMeetingEventFactoryImpl.ts";

Deno.test("UpdateMeetingEventFactoryImpl", () => {
    assertEquals(
        new UpdateMeetingEventFactoryImpl().build(
            updateMeetingEventMock,
        ),
        {
            category: "MEETING",
            ...updateMeetingEventMock,
        },
    );
});
