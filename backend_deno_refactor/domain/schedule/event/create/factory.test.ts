import { assertEquals } from "@std/assert/assert-equals";
import { createEventModelStub } from "./model._stub.ts";
import { buildEvent } from "./factory.ts";

Deno.test("buildEvent", () => {
    assertEquals(
        buildEvent(
            createEventModelStub,
            "event-id",
            "user-id",
        ),
        {
            id: "event-id",
            user: "user-id",
            createdAt: new Date(),
            updatedAt: new Date(),
            ...createEventModelStub,
        },
    );
});
