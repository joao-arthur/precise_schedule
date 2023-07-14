import { assertEquals } from "std/testing/asserts.ts";
import { createDateEvent } from "../../../domain/schedule/event/event.date.create.endpoint.ts";
import { updateDateEvent } from "../../../domain/schedule/event/event.date.update.endpoint.ts";
import { initState } from "../../../app/initState.ts";

await initState();

Deno.test("Create date event", async () => {
    assertEquals(
        await createDateEvent(
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

Deno.test("Update date event", async () => {
    assertEquals(
        await updateDateEvent(
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
