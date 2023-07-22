import { assertEquals, assertRejects } from "std/testing/asserts.ts";
import { eventStub } from "../model._stub.ts";
import { EventFindRepositoryStub } from "./repository._stub.ts";
import { EventNotFound } from "./EventNotFound.ts";
import { EventFindServiceImpl } from "./service.impl.ts";

Deno.test("EventFindServiceImpl.findByUser", async () => {
    assertEquals(
        await new EventFindServiceImpl(
            new EventFindRepositoryStub(undefined),
        ).findByUser(eventStub.user),
        [],
    );
    assertEquals(
        await new EventFindServiceImpl(
            new EventFindRepositoryStub(eventStub),
        ).findByUser(eventStub.user),
        [eventStub],
    );
});

Deno.test("EventFindServiceImpl.findByUserAndId", async () => {
    await assertRejects(
        () =>
            new EventFindServiceImpl(
                new EventFindRepositoryStub(undefined),
            ).findByUserAndId(eventStub.user, eventStub.id),
        EventNotFound,
    );
    assertEquals(
        await new EventFindServiceImpl(
            new EventFindRepositoryStub(eventStub),
        ).findByUserAndId(eventStub.user, eventStub.id),
        eventStub,
    );
});
