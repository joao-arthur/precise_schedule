import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "@ps/domain_mock/schedule/event/EventMock.ts";
import { UpdateEventServiceMock } from "@ps/domain_mock/schedule/event/update/UpdateEventServiceMock.ts";
import { updateAppointmentEventMock } from "@ps/domain_mock/schedule/event/updateAppointment/UpdateAppointmentEventMock.ts";
import { UpdateAppointmentEventFactoryMock } from "@ps/domain_mock/schedule/event/updateAppointment/UpdateAppointmentEventFactoryMock.ts";
import { UpdateAppointmentEventServiceImpl } from "./UpdateAppointmentEventServiceImpl.ts";

Deno.test("UpdateAppointmentEventServiceImpl", async () => {
    assertEquals(
        await new UpdateAppointmentEventServiceImpl(
            new UpdateAppointmentEventFactoryMock(eventMock),
            new UpdateEventServiceMock(eventMock),
        ).update(eventMock.id, updateAppointmentEventMock),
        eventMock,
    );
});
