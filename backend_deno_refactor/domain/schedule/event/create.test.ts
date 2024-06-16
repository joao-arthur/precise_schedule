import type { EventCreateModel } from "./create.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../lang/result.ts";
import { IdGeneratorStub } from "../../generator/id.stub.ts";
import { eventStub } from "./model.stub.ts";
import { eventCreate, eventCreateToEvent } from "./create.ts";

const createEventModelStub: EventCreateModel = {
    name: "name",
    day: "2023-06-24",
    begin: "08:00",
    end: "18:00",
    category: "APPOINTMENT",
    frequency: undefined,
    weekendRepeat: false,
};

Deno.test("eventCreateToEvent", () => {
    assertEquals(
        eventCreateToEvent(
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

Deno.test("eventCreate", async () => {
    assertEquals(
        await eventCreate(
            new EventRepo(),
            new IdGeneratorStub("event-id"),
            createEventModelStub,
            "user-id",
        ),
        ok(eventStub),
    );
});
