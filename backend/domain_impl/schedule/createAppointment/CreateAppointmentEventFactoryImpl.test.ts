import { assertEquals } from "std/testing/asserts.ts";
import { createAppointmentEventMock } from "@ps/domain_mock/schedule/event/createAppointment/CreateAppointmentEventMock.ts";
import { CreateAppointmentEventFactoryImpl } from "./CreateAppointmentEventFactoryImpl.ts";

Deno.test("CreateAppointmentEventFactoryImpl", () => {
    assertEquals(
        new CreateAppointmentEventFactoryImpl().build(
            createAppointmentEventMock,
        ),
        {
            category: "APPOINTMENT",
            ...createAppointmentEventMock,
        },
    );
});
