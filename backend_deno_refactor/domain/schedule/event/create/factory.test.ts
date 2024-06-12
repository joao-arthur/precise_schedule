import { assertEquals } from "@std/assert/assert-equals";
import { createEventModelStub } from "./model._stub.ts";
import { buildEvent } from "./factory.ts";

Deno.test("buildEvent", () => {
    assertEquals(
        buildEvent(
            createEventModelStub,
            "id",
            "user",
        ),
        {
            id: "id",
            user: "user",
            createdAt: new Date(),
            updatedAt: new Date(),
            ...createEventModelStub,
        },
    );
});
