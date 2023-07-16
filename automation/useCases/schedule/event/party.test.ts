import { assertEquals } from "std/testing/asserts.ts";
import { createPartyEvent } from "../../../domain/schedule/event/event.party.create.endpoint.ts";
import { updatePartyEvent } from "../../../domain/schedule/event/event.party.update.endpoint.ts";
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
});
