import { assertEquals } from "@std/assert/assert-equals";
import { eventStub } from "../model._stub.ts";
import { eventUpdateModelStub } from "./model._stub.ts";
import { EventUpdateFactoryImpl } from "./factory.impl.ts";

Deno.test("EventUpdateFactoryImpl", () => {
    assertEquals(
        new EventUpdateFactoryImpl().build(
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
