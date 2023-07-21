import { assertEquals } from "std/testing/asserts.ts";
import { eventMock } from "../EventMock.ts";
import { UpdateAppointmentEventServiceMock } from "./UpdateAppointmentEventServiceMock.ts";

Deno.test("UpdateAppointmentEventServiceMock", async () => {
    assertEquals(
        await new UpdateAppointmentEventServiceMock(
            eventMock,
        ).update(),
        eventMock,
    );
});
