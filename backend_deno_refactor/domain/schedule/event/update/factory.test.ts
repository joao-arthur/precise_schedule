import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../model._stub.ts";
import { eventUpdateModelStub } from "./model._stub.ts";
import { buildEvent } from "./factory.ts";

Deno.test("buildEvent", () => {
    assertEquals(
        buildEvent(
            eventUpdateModelStub,
            eventStub,
        ),
        {
            id: eventStub.id,
            user: eventStub.user,
            createdAt: eventStub.createdAt,
            updatedAt: new Date(),
            ...eventUpdateModelStub,
        },
    );
});
