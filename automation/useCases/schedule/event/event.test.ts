import { assertEquals } from "std/testing/asserts.ts";
import { createAppointmentEvent } from "../../../domain/schedule/event/event.appointment.create.endpoint.ts";
import { findEvent } from "../../../domain/schedule/event/event.find.endpoint.ts";
import { findAllEvent } from "../../../domain/schedule/event/event.findAll.endpoint.ts";
import { deleteEvent } from "../../../domain/schedule/event/event.delete.endpoint.ts";
import { initState } from "../../../app/initState.ts";

await initState();

Deno.test("Event", async (t) => {
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

    await t.step("Get by id", async () => {
        const res = await findEvent(id);

        assertEquals(
            res,
            {
                status: 200,
                headers: { contentLocation: undefined },
                body: {
                    id,
                    name: "name",
                    day: "2023-06-24",
                    begin: "08:00",
                    end: "18:00",
                    frequency: "NEVER",
                    weekendRepeat: false,
                    category: "APPOINTMENT",
                },
            },
        );
    });

    await t.step("Get all", async () => {
        const res = await findAllEvent();

        assertEquals(
            res,
            {
                status: 200,
                headers: { contentLocation: undefined },
                body: [{
                    id,
                    name: "name",
                    day: "2023-06-24",
                    begin: "08:00",
                    end: "18:00",
                    frequency: "NEVER",
                    weekendRepeat: false,
                    category: "APPOINTMENT",
                }],
            },
        );
    });

    await t.step("Delete", async () => {
        assertEquals(
            await deleteEvent(id),
            {
                status: 204,
                body: undefined,
                headers: { contentLocation: undefined },
            },
        );
    });
});
