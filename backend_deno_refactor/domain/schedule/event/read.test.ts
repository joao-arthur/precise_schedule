import { EventFindModel } from "./read.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { err, ok } from "../../../lang/result.ts";
import { eventStub } from "../model.stub.ts";
import { EventFindRepositoryStub } from "./repo.stub.ts";
import { EventNotFound } from "./error.eventNotFound.ts";
import {
    eventReadByUser,
    eventReadByUserAndId,
    eventReadByUserAndIdMapped,
    eventReadByUserMapped,
    eventToEventFind,
} from "./read.ts";

const eventFindModelStub: EventFindModel = {
    id: "event-id",
    name: "name",
    day: "2023-06-24",
    begin: "08:00",
    end: "18:00",
    category: "APPOINTMENT",
    frequency: undefined,
    weekendRepeat: false,
};

Deno.test("eventToEventFind", () => {
    assertEquals(
        eventToEventFind(eventStub),
        {
            id: eventStub.id,
            name: eventStub.name,
            day: eventStub.day,
            begin: eventStub.begin,
            end: eventStub.end,
            category: eventStub.category,
            frequency: eventStub.frequency,
            weekendRepeat: eventStub.weekendRepeat,
        },
    );
});

Deno.test("eventReadByUser", async () => {
    assertEquals(
        await eventReadByUser(
            new EventRepo(undefined),
            eventStub.user,
        ),
        ok([]),
    );
    assertEquals(
        await eventReadByUser(
            new EventRepo(eventStub),
            eventStub.user,
        ),
        ok([eventStub]),
    );
});

Deno.test("eventReadByUserMapped", async () => {
    assertEquals(
        await eventReadByUserMapped(
            new EventRepo(undefined),
            eventStub.user,
        ),
        ok([]),
    );
    assertEquals(
        await eventReadByUserMapped(
            new EventRepo(eventStub),
            eventStub.user,
        ),
        ok([eventFindModelStub]),
    );
});

Deno.test("eventReadByUserAndId", async () => {
    assertEquals(
        await eventReadByUserAndId(
            new EventRepo(undefined),
            eventStub.user,
            eventStub.id,
        ),
        err(new EventNotFound()),
    );
    assertEquals(
        await eventReadByUserAndId(
            new EventRepo(eventStub),
            eventStub.user,
            eventStub.id,
        ),
        ok(eventStub),
    );
});

Deno.test("eventReadByUserAndIdMapped", async () => {
    assertEquals(
        await eventReadByUserAndIdMapped(
            new EventRepo(undefined),
            eventStub.user,
            eventStub.id,
        ),
        err(new EventNotFound()),
    );
    assertEquals(
        await eventReadByUserAndIdMapped(
            new EventRepo(eventStub),
            eventStub.user,
            eventStub.id,
        ),
        ok(eventFindModelStub),
    );
});
