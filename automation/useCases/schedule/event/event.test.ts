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

        assertEquals(res.status, 200);
        assertEquals(res.headers, { contentLocation: undefined });
        assertEquals(res.body.name, "name");
        assertEquals(res.body.day, "2023-06-24");
        assertEquals(res.body.begin, "08:00");
        assertEquals(res.body.frequency, "NEVER");
        assertEquals(res.body.weekendRepeat, false);
        assertEquals(res.body.category, "APPOINTMENT");
        assertEquals(typeof res.body.id, "string");
        assertEquals(typeof res.body.user, "string");
        assertEquals(new Date(res.body.createdAt).toString() !== "Invalid Date", true);
        assertEquals(new Date(res.body.updatedAt).toString() !== "Invalid Date", true);
    });

    await t.step("Get all", async () => {
        const res = await findAllEvent();

        assertEquals(res.status, 200);
        assertEquals(res.headers, { contentLocation: undefined });
        assertEquals(res.body[0].name, "name");
        assertEquals(res.body[0].day, "2023-06-24");
        assertEquals(res.body[0].begin, "08:00");
        assertEquals(res.body[0].frequency, "NEVER");
        assertEquals(res.body[0].weekendRepeat, false);
        assertEquals(res.body[0].category, "APPOINTMENT");
        assertEquals(typeof res.body[0].id, "string");
        assertEquals(typeof res.body[0].user, "string");
        assertEquals(new Date(res.body[0].createdAt).toString() !== "Invalid Date", true);
        assertEquals(new Date(res.body[0].updatedAt).toString() !== "Invalid Date", true);
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
