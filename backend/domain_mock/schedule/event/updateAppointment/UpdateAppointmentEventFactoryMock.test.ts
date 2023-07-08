import { assertEquals } from "std/testing/asserts.ts";
import { updateEventModelMock } from "../update/UpdateEventModelMock.ts";
import { UpdateAppointmentEventFactoryMock } from "./UpdateAppointmentEventFactoryMock.ts";

Deno.test("UpdateAppointmentEventFactoryMock", () => {
    assertEquals(
        new UpdateAppointmentEventFactoryMock(
            updateEventModelMock,
        ).build(),
        updateEventModelMock,
    );
});
