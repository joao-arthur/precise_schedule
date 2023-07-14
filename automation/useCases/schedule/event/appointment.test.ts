import { assertEquals } from "std/testing/asserts.ts";
import { createAppointmentEvent } from "../../../domain/schedule/event/event.appointment.create.endpoint.ts";
import { updateAppointmentEvent } from "../../../domain/schedule/event/event.appointment.update.endpoint.ts";
import { initState } from "../../../app/initState.ts";

await initState();

Deno.test("Create appointment event", async () => {
    assertEquals(
        await createAppointmentEvent(
            {
                name: "name",
                day: "2023-06-24",
                begin: "08:00",
                end: "18:00",
                frequency: "NEVER",
                weekendRepeat: false,
            },
        ),
        {
            status: 201,
            body: undefined,
        },
    );
});

Deno.test("Update appointment event", async () => {
    assertEquals(
        await updateAppointmentEvent(
            {
                name: "name",
                day: "2023-06-24",
                begin: "08:00",
                end: "18:00",
                frequency: "NEVER",
                weekendRepeat: false,
            },
        ),
        {
            status: 204,
            body: undefined,
        },
    );
});
