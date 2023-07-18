import { assertEquals } from "std/testing/asserts.ts";
import { createAppointmentEvent } from "../../../domain/schedule/event/event.appointment.create.endpoint.ts";
import { updateAppointmentEvent } from "../../../domain/schedule/event/event.appointment.update.endpoint.ts";
import { initState } from "../../../app/initState.ts";

await initState();

Deno.test("Appointment", async (t) => {
    let id: string;

    await t.step("Create", async () => {
        const res = await createAppointmentEvent(
            {
                name: "name",
                day: "2023-06-24",
                begin: "08:00",
                end: "18:00",
                frequency: "NEVER",
                weekendRepeat: false,
            },
        );
        assertEquals(res.status, 201);
        assertEquals(res.body, undefined);
        assertEquals(typeof res.headers.contentLocation, "string");
        id = res.headers.contentLocation as string;
    });

    await t.step("Update", async () => {
        assertEquals(
            await updateAppointmentEvent(
                id,
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
                headers: { contentLocation: undefined },
            },
        );
    });
});

Deno.test("Appointment validation", async () => {
    assertEquals(
        await createAppointmentEvent({} as any),
        {
            status: 400,
            body: {
                validation: {
                    name: [
                        "must be a string",
                        "at least 1 character",
                    ],
                    day: [
                        "must be a date in the format YYYY-MM-DD",
                        "must be greater than 1970-01-01",
                    ],
                    begin: [
                        "must be a time in the format HH:mm",
                    ],
                    end: [
                        "must be a time in the format HH:mm",
                        "must be bigger than 'begin'",
                    ],
                    frequency: [
                        'must be one of: ("1_D", "2_D", "1_W", "1_M", "3_M", "6_M", "1_Y", "2_Y", "NEVER")',
                    ],
                    weekendRepeat: [
                        "must be a boolean",
                    ],
                },
            },
            headers: { contentLocation: undefined },
        },
    );
});
