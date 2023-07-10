import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { CreateAppointmentEventServiceMock } from "@ps/domain_mock/schedule/event/createAppointment/CreateAppointmentEventServiceMock.ts";
import { created } from "@ps/application_impl/http/builder/200/created.ts";
import { httpRequestBodyMock } from "@ps/application_mock/http/HTTPRequestMock.ts";
import { CreateAppointmentEventControllerImpl } from "./CreateAppointmentEventControllerImpl.ts";

Deno.test("CreateAppointmentEventControllerImpl", async () => {
    assertEquals(
        await new CreateAppointmentEventControllerImpl(
            new CreateAppointmentEventServiceMock(eventMock),
        ).handle(httpRequestBodyMock),
        created(),
    );
});
