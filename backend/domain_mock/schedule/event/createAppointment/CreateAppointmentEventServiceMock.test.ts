import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "../EventMock.ts";
import { CreateAppointmentEventServiceMock } from "./CreateAppointmentEventServiceMock.ts";

Deno.test("CreateAppointmentEventServiceMock", async () => {
    assertEquals(
        await new CreateAppointmentEventServiceMock(
            eventMock,
        ).create(),
        eventMock,
    );
});
