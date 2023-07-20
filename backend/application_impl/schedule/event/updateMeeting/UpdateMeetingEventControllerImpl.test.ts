import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { UpdateMeetingEventServiceMock } from "@ps/domain_mock/schedule/event/updateMeeting/UpdateMeetingEventServiceMock.ts";
import { noContent } from "@ps/application_impl/http/builder/200/noContent.ts";
import { httpRequestFullMock } from "@ps/application_mock/http/HTTPRequestMock.ts";
import { UpdateMeetingEventControllerImpl } from "./UpdateMeetingEventControllerImpl.ts";

Deno.test("UpdateMeetingEventControllerImpl", async () => {
    assertEquals(
        await new UpdateMeetingEventControllerImpl(
            new UpdateMeetingEventServiceMock(eventMock),
        ).handle(eventMock.user, httpRequestFullMock),
        noContent(),
    );
});
