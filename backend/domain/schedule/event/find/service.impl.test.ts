import { assertEquals, assertRejects } from "std/testing/asserts.ts";
import { eventStub } from "../model._stub.ts";
import { EventFindRepositoryStub } from "./repository._stub.ts";
import { EventNotFound } from "./error.eventNotFound.ts";
import { eventFindModelStub } from "./model._stub.ts";
import { EventFindServiceImpl } from "./service.impl.ts";
import { EventFindFactoryStub } from "./factory._stub.ts";

Deno.test("EventFindServiceImpl.findByUser", async () => {
    assertEquals(
        await new EventFindServiceImpl(
            new EventFindFactoryStub(eventFindModelStub),
            new EventFindRepositoryStub(undefined),
        ).findByUser(eventStub.user),
        [],
    );
    assertEquals(
        await new EventFindServiceImpl(
            new EventFindFactoryStub(eventFindModelStub),
            new EventFindRepositoryStub(eventStub),
        ).findByUser(eventStub.user),
        [eventStub],
    );
});

Deno.test("EventFindServiceImpl.findByUserMapped", async () => {
    assertEquals(
        await new EventFindServiceImpl(
            new EventFindFactoryStub(eventFindModelStub),
            new EventFindRepositoryStub(undefined),
        ).findByUserMapped(eventStub.user),
        [],
    );
    assertEquals(
        await new EventFindServiceImpl(
            new EventFindFactoryStub(eventFindModelStub),
            new EventFindRepositoryStub(eventStub),
        ).findByUserMapped(eventStub.user),
        [eventFindModelStub],
    );
});

Deno.test("EventFindServiceImpl.findByUserAndId", async () => {
    await assertRejects(
        () =>
            new EventFindServiceImpl(
                new EventFindFactoryStub(eventFindModelStub),
                new EventFindRepositoryStub(undefined),
            ).findByUserAndId(eventStub.user, eventStub.id),
        EventNotFound,
    );
    assertEquals(
        await new EventFindServiceImpl(
            new EventFindFactoryStub(eventFindModelStub),
            new EventFindRepositoryStub(eventStub),
        ).findByUserAndId(eventStub.user, eventStub.id),
        eventStub,
    );
});

Deno.test("EventFindServiceImpl.findByUserAndIdMapped", async () => {
    await assertRejects(
        () =>
            new EventFindServiceImpl(
                new EventFindFactoryStub(eventFindModelStub),
                new EventFindRepositoryStub(undefined),
            ).findByUserAndIdMapped(eventStub.user, eventStub.id),
        EventNotFound,
    );
    assertEquals(
        await new EventFindServiceImpl(
            new EventFindFactoryStub(eventFindModelStub),
            new EventFindRepositoryStub(eventStub),
        ).findByUserAndIdMapped(eventStub.user, eventStub.id),
        eventFindModelStub,
    );
});
