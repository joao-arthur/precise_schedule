import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { CreateEventServiceMock } from "@ps/domain_mock/schedule/event/create/CreateEventServiceMock.ts";
import { createAppointmentEventMock } from "@ps/domain_mock/schedule/event/createAppointment/CreateAppointmentEventMock.ts";
import { CreateAppointmentEventFactoryMock } from "@ps/domain_mock/schedule/event/createAppointment/CreateAppointmentEventFactoryMock.ts";
import { CreateAppointmentEventServiceImpl } from "./CreateAppointmentEventServiceImpl.ts";

Deno.test("CreateAppointmentEventServiceImpl", async () => {
    assertEquals(
        await new CreateAppointmentEventServiceImpl(
            new CreateAppointmentEventFactoryMock(eventMock),
            new CreateEventServiceMock(eventMock),
        ).create(createAppointmentEventMock),
        eventMock,
    );
});
