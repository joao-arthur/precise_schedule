import { assertEquals } from "std/testing/asserts.ts";
import { createEventModelMock } from "../create/CreateEventModelMock.ts";
import { CreateAppointmentEventFactoryMock } from "./CreateAppointmentEventFactoryMock.ts";

Deno.test("CreateAppointmentEventFactoryMock", () => {
    assertEquals(
        new CreateAppointmentEventFactoryMock(
            createEventModelMock,
        ).build(),
        createEventModelMock,
    );
});
