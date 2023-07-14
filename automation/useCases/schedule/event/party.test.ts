import { assertEquals } from "std/testing/asserts.ts";
import { createPartyEvent } from "../../../domain/schedule/event/event.party.create.endpoint.ts";
import { updatePartyEvent } from "../../../domain/schedule/event/event.party.update.endpoint.ts";
import { initState } from "../../../app/initState.ts";

await initState();

Deno.test("Create party event", async () => {
    assertEquals(
        await createPartyEvent(
            {
                name: "name",
                day: "2023-06-24",
                begin: "08:00",
                end: "18:00",
            },
        ),
        {
            status: 201,
            body: undefined,
        },
    );
});

Deno.test("Update party event", async () => {
    assertEquals(
        await updatePartyEvent(
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
        },
    );
});
