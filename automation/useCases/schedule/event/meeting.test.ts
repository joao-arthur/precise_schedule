import { assertEquals } from "std/testing/asserts.ts";
import { createMeetingEvent } from "../../../domain/schedule/event/event.meeting.create.endpoint.ts";
import { updateMeetingEvent } from "../../../domain/schedule/event/event.meeting.update.endpoint.ts";
import { initState } from "../../../app/initState.ts";

await initState();

Deno.test("Meeting", async (t) => {
    let id: string;

    await t.step("Create", async () => {
        const res = await createMeetingEvent(
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
            await updateMeetingEvent(
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
