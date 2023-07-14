import { assertEquals } from "std/testing/asserts.ts";
import { createMeetingEvent } from "../../../domain/schedule/event/event.meeting.create.endpoint.ts";
import { updateMeetingEvent } from "../../../domain/schedule/event/event.meeting.update.endpoint.ts";
import { initState } from "../../../app/initState.ts";

await initState();

Deno.test("Create meeting event", async () => {
    assertEquals(
        await createMeetingEvent(
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

Deno.test("Update meeting event", async () => {
    assertEquals(
        await updateMeetingEvent(
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
