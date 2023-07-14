import { assertEquals } from "std/testing/asserts.ts";
import { createBirthdayEvent } from "../../../domain/schedule/event/event.birthday.create.endpoint.ts";
import { updateBirthdayEvent } from "../../../domain/schedule/event/event.birthday.update.endpoint.ts";
import { initState } from "../../../app/initState.ts";

await initState();

Deno.test("Create birthday event", async () => {
    assertEquals(
        await createBirthdayEvent(
            {
                name: "name",
                day: "2023-06-24",
            },
        ),
        {
            status: 201,
            body: undefined,
        },
    );
});

Deno.test("Update birthday event", async () => {
    assertEquals(
        await updateBirthdayEvent(
            {
                name: "name",
                day: "2023-06-24",
            },
        ),
        {
            status: 204,
            body: undefined,
        },
    );
});
