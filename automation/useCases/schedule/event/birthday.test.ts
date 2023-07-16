import { assertEquals } from "std/testing/asserts.ts";
import { createBirthdayEvent } from "../../../domain/schedule/event/event.birthday.create.endpoint.ts";
import { updateBirthdayEvent } from "../../../domain/schedule/event/event.birthday.update.endpoint.ts";
import { initState } from "../../../app/initState.ts";

await initState();

Deno.test("Birthday", async (t) => {
    let id: string;

    await t.step("Create", async () => {
        const res = await createBirthdayEvent(
            {
                name: "name",
                day: "2023-06-24",
            },
        );
        assertEquals(res.status, 201);
        assertEquals(res.body, undefined);
        assertEquals(typeof res.headers.contentLocation, "string");
        id = res.headers.contentLocation as string;
    });

    await t.step("Update", async () => {
        assertEquals(
            await updateBirthdayEvent(
                id,
                {
                    name: "name",
                    day: "2023-06-24",
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
