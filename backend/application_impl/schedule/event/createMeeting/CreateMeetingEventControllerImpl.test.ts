import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { CreateMeetingEventServiceMock } from "@ps/domain_mock/schedule/event/createMeeting/CreateMeetingEventServiceMock.ts";
import { created } from "@ps/application_impl/http/builder/200/created.ts";
import { httpRequestBodyMock } from "@ps/application_mock/http/HTTPRequestMock.ts";
import { CreateMeetingEventControllerImpl } from "./CreateMeetingEventControllerImpl.ts";

Deno.test("CreateMeetingEventControllerImpl", async () => {
    assertEquals(
        await new CreateMeetingEventControllerImpl(
            new CreateMeetingEventServiceMock(eventMock),
        ).handle(httpRequestBodyMock),
        created(),
    );
});
