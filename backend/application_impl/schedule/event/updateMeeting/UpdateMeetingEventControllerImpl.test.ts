import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { UpdateMeetingEventServiceMock } from "@ps/domain_mock/schedule/event/updateMeeting/UpdateMeetingEventServiceMock.ts";
import { noContent } from "@ps/application/http/builder/noContent.ts";
import { httpRequestFullMock } from "@ps/application_mock/http/httpRequestMock.ts";
import { UpdateMeetingEventControllerImpl } from "./UpdateMeetingEventControllerImpl.ts";

Deno.test("UpdateMeetingEventControllerImpl", async () => {
    assertEquals(
        await new UpdateMeetingEventControllerImpl(
            new UpdateMeetingEventServiceMock(eventMock),
        ).handle(httpRequestFullMock),
        noContent(),
    );
});
