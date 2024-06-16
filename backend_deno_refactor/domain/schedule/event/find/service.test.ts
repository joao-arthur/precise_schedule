import { assertEquals } from "@std/assert/assert-equals";
import { err, ok } from "../../../lang/result.ts";
import { eventStub } from "../model._stub.ts";
import { EventFindRepositoryStub } from "./repo._stub.ts";
import { EventNotFound } from "./error.eventNotFound.ts";
import { eventFindModelStub } from "./model._stub.ts";
import {
    eventFindByUser,
    eventFindByUserAndId,
    eventFindByUserAndIdMapped,
    eventFindByUserMapped,
} from "./service.ts";

Deno.test("eventFindByUser", async () => {
    assertEquals(
        await eventFindByUser(
            new EventFindRepositoryStub(undefined),
            eventStub.user,
        ),
        ok([]),
    );
    assertEquals(
        await eventFindByUser(
            new EventFindRepositoryStub(eventStub),
            eventStub.user,
        ),
        ok([eventStub]),
    );
});

Deno.test("eventFindByUserMapped", async () => {
    assertEquals(
        await eventFindByUserMapped(
            new EventFindRepositoryStub(undefined),
            eventStub.user,
        ),
        ok([]),
    );
    assertEquals(
        await eventFindByUserMapped(
            new EventFindRepositoryStub(eventStub),
            eventStub.user,
        ),
        ok([eventFindModelStub]),
    );
});

Deno.test("eventFindByUserAndId", async () => {
    assertEquals(
        await eventFindByUserAndId(
            new EventFindRepositoryStub(undefined),
            eventStub.user,
            eventStub.id,
        ),
        err(new EventNotFound()),
    );
    assertEquals(
        await eventFindByUserAndId(
            new EventFindRepositoryStub(eventStub),
            eventStub.user,
            eventStub.id,
        ),
        ok(eventStub),
    );
});

Deno.test("eventFindByUserAndIdMapped", async () => {
    assertEquals(
        await eventFindByUserAndIdMapped(
            new EventFindRepositoryStub(undefined),
            eventStub.user,
            eventStub.id,
        ),
        err(new EventNotFound()),
    );
    assertEquals(
        await eventFindByUserAndIdMapped(
            new EventFindRepositoryStub(eventStub),
            eventStub.user,
            eventStub.id,
        ),
        ok(eventFindModelStub),
    );
});
