import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { UpdateAppointmentEventServiceMock } from "@ps/domain_mock/schedule/event/updateAppointment/UpdateAppointmentEventServiceMock.ts";
import { noContent } from "@ps/application_impl/http/builder/200/noContent.ts";
import { httpRequestFullMock } from "@ps/application_mock/http/HTTPRequestMock.ts";
import { UpdateAppointmentEventControllerImpl } from "./UpdateAppointmentEventControllerImpl.ts";

Deno.test("UpdateAppointmentEventControllerImpl", async () => {
    assertEquals(
        await new UpdateAppointmentEventControllerImpl(
            new UpdateAppointmentEventServiceMock(eventMock),
        ).handle(httpRequestFullMock),
        noContent(),
    );
});
