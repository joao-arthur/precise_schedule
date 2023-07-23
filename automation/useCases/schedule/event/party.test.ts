import { assertEquals } from "std/testing/asserts.ts";
import { createPartyEvent } from "../../../domain/schedule/event/event.party.create.endpoint.ts";
import { updatePartyEvent } from "../../../domain/schedule/event/event.party.update.endpoint.ts";
import { deleteEvent } from "../../../domain/schedule/event/event.delete.endpoint.ts";
import { initState } from "../../../app/initState.ts";

await initState();

Deno.test("Party", async (t) => {
    let id: string;

    await t.step("Create", async () => {
        const res = await createPartyEvent(
            {
                name: "name",
                day: "2023-06-24",
                begin: "08:00",
                end: "18:00",
            },
        );
        assertEquals(res.status, 201);
        assertEquals(res.body, undefined);
        assertEquals(typeof res.headers.contentLocation, "string");
        id = res.headers.contentLocation as string;
    });

    await t.step("Update", async () => {
        assertEquals(
            await updatePartyEvent(
                id,
                {
                    name: "name",
                    day: "2023-06-24",
                    begin: "08:00",
                    end: "18:00",
                },
            ),
            {
                status: 204,
                body: undefined,
                headers: { contentLocation: undefined },
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

Deno.test("Party validation", async () => {
    assertEquals(
        await createPartyEvent(null),
        {
            status: 400,
            body: {
                validation: {
                    name: [
                        "must be a string",
                        "at least 1 character",
                        "at maximum 32 characters",
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
                },
            },
            headers: { contentLocation: undefined },
        },
    );
});
