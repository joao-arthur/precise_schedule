import { assertEquals } from "std/testing/asserts.ts";
import { updateAppointmentEventMock } from "@ps/domain_mock/schedule/event/updateAppointment/UpdateAppointmentEventMock.ts";
import { UpdateAppointmentEventFactoryImpl } from "./UpdateAppointmentEventFactoryImpl.ts";

Deno.test("UpdateAppointmentEventFactoryImpl", () => {
    assertEquals(
        new UpdateAppointmentEventFactoryImpl().build(
            updateAppointmentEventMock,
        ),
        {
            category: "APPOINTMENT",
            ...updateAppointmentEventMock,
        },
    );
});
