import type { EventUpdateModel } from "./update.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { eventStub } from "../model.stub.ts";
import { EventUpdateRepositoryStub } from "./repo.stub.ts";
import { eventUpdate, eventUpdateToEvent } from "./update.ts";

export const eventUpdateModelStub: EventUpdateModel = {
    name: "name",
    day: "2023-06-24",
    begin: "08:00",
    end: "18:00",
    category: "APPOINTMENT",
    frequency: undefined,
    weekendRepeat: false,
};

Deno.test("eventUpdateToEvent", () => {
    assertEquals(
        eventUpdateToEvent(
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

Deno.test("eventUpdate", async () => {
    assertEquals(
        await eventUpdate(
            new EventRepo(),
            eventStub.user,
            eventStub.id,
            eventUpdateModelStub,
        ),
        ok(eventStub),
    );
});
